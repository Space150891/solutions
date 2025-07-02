import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Call as CallIcon,
  MoreVert as MoreVertIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { User } from '../types';

interface ChatHeaderProps {
  otherParticipant: User;
  isTyping?: boolean;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  onMoreOptions?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  otherParticipant,
  isTyping = false,
  onVideoCall,
  onVoiceCall,
  onMoreOptions,
}) => {
  const theme = useTheme();

  const getLastSeenText = () => {
    if (otherParticipant.isOnline) return 'Online';
    if (otherParticipant.lastSeen) {
      const now = new Date();
      const diff = now.getTime() - otherParticipant.lastSeen.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 1) return 'Last seen just now';
      if (minutes < 60) return `Last seen ${minutes}m ago`;
      if (hours < 24) return `Last seen ${hours}h ago`;
      return `Last seen ${days}d ago`;
    }
    return 'Offline';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        minHeight: 72,
      }}
    >
      {/* Avatar and Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={otherParticipant.avatar}
            alt={otherParticipant.name}
            sx={{ width: 48, height: 48 }}
          >
            {otherParticipant.name.charAt(0)}
          </Avatar>
          {otherParticipant.isOnline && (
            <CircleIcon
              sx={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                fontSize: 12,
                color: '#44b700',
                bgcolor: 'background.paper',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }}
            />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {otherParticipant.name}
            </Typography>
            <Chip
              label={otherParticipant.role}
              size="small"
              variant="outlined"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                color: otherParticipant.role === 'doctor' ? 'primary.main' : 'secondary.main',
                borderColor: otherParticipant.role === 'doctor' ? 'primary.main' : 'secondary.main',
              }}
            />
          </Box>
          
          <Typography
            variant="body2"
            color={isTyping ? 'primary.main' : 'text.secondary'}
            sx={{
              fontStyle: isTyping ? 'italic' : 'normal',
              animation: isTyping ? 'typing 1.5s infinite' : 'none',
              '@keyframes typing': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.5 },
                '100%': { opacity: 1 },
              },
            }}
          >
            {isTyping ? 'Typing...' : getLastSeenText()}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={onVideoCall}
          sx={{
            color: 'primary.main',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <VideoCallIcon />
        </IconButton>
        
        <IconButton
          onClick={onVoiceCall}
          sx={{
            color: 'success.main',
            bgcolor: alpha(theme.palette.success.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.success.main, 0.2),
            },
          }}
        >
          <CallIcon />
        </IconButton>
        
        <IconButton onClick={onMoreOptions}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}; 