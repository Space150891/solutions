import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Done as DoneIcon,
  DoneAll as DoneAllIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { Message, User } from '../types';
import { FileAttachmentComponent } from './file-attachment.component';

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  isOwn,
  showAvatar = true,
  showTimestamp = true,
}) => {
  const theme = useTheme();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary' }} />;
      case 'delivered':
        return <DoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />;
      case 'read':
        return <DoneAllIcon sx={{ fontSize: 14, color: 'primary.main' }} />;
      default:
        return null;
    }
  };

  const getBubbleColor = () => {
    if (isOwn) {
      return {
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      };
    }
    return {
      bgcolor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.background.paper, 0.8)
        : theme.palette.grey[100],
      color: theme.palette.text.primary,
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 1,
        mb: 1,
        px: 2,
      }}
    >
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <Avatar
          src={sender.avatar}
          alt={sender.name}
          sx={{ width: 32, height: 32 }}
        >
          {sender.name.charAt(0)}
        </Avatar>
      )}

      {/* Message Content */}
      <Box
        sx={{
          maxWidth: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isOwn ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Sender Info (for received messages) */}
        {!isOwn && showAvatar && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              {sender.name}
            </Typography>
            <Chip
              label={sender.role}
              size="small"
              variant="outlined"
              sx={{
                height: 16,
                fontSize: '0.6rem',
                color: sender.role === 'doctor' ? 'primary.main' : 'secondary.main',
                borderColor: sender.role === 'doctor' ? 'primary.main' : 'secondary.main',
              }}
            />
          </Box>
        )}

        {/* File Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <Box sx={{ mb: 1 }}>
            {message.attachments.map((attachment) => (
              <FileAttachmentComponent
                key={attachment.id}
                attachment={attachment}
                isOwn={isOwn}
              />
            ))}
          </Box>
        )}

        {/* Message Bubble */}
        {message.content && (
          <Box
            sx={{
              ...getBubbleColor(),
              px: 2,
              py: 1.5,
              borderRadius: 2,
              borderTopLeftRadius: !isOwn && showAvatar ? 0.5 : 2,
              borderTopRightRadius: isOwn ? 0.5 : 2,
              position: 'relative',
              wordBreak: 'break-word',
              boxShadow: theme.shadows[1],
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
              {message.content}
            </Typography>

            {/* Message Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                gap: 0.5,
                mt: 0.5,
              }}
            >
              {showTimestamp && (
                <Typography
                  variant="caption"
                  sx={{
                    color: isOwn ? alpha(theme.palette.primary.contrastText, 0.7) : 'text.secondary',
                    fontSize: '0.7rem',
                  }}
                >
                  {formatTime(message.timestamp)}
                </Typography>
              )}
              
              {isOwn && getStatusIcon()}
            </Box>
          </Box>
        )}

        {/* Only show message info for attachment-only messages */}
        {(!message.content && message.attachments && message.attachments.length > 0) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isOwn ? 'flex-end' : 'flex-start',
              gap: 0.5,
              mt: 0.5,
            }}
          >
            {showTimestamp && (
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            )}
            
            {isOwn && getStatusIcon()}
          </Box>
        )}

        {/* System Message Styling */}
        {message.type === 'system' && (
          <Box
            sx={{
              bgcolor: alpha(theme.palette.info.main, 0.1),
              color: theme.palette.info.main,
              px: 2,
              py: 1,
              borderRadius: 1,
              mt: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" fontStyle="italic">
              {message.content}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}; 