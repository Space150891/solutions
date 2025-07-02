import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  alpha,
  Tooltip,
  Typography,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { FileAttachment } from '../types';
import { FileUploadComponent } from './file-upload.component';

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: FileAttachment[]) => void;
  onTypingStart?: () => void;
  onTypingStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTypingStart,
  onTypingStop,
  placeholder = "Type a message...",
  disabled = false,
}) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<FileAttachment[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMessage(value);

    // Handle typing indicators
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      onTypingStart?.();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTypingStop?.();
    }, 1000);
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if ((trimmedMessage || pendingAttachments.length > 0) && !disabled) {
      onSendMessage(trimmedMessage, pendingAttachments.length > 0 ? pendingAttachments : undefined);
      setMessage('');
      setPendingAttachments([]);
      
      // Stop typing indicator immediately
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(false);
      onTypingStop?.();
      
      // Focus back to input
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    setShowFileUpload(true);
  };

  const handleFilesUpload = (attachments: FileAttachment[]) => {
    setPendingAttachments(prev => [...prev, ...attachments]);
  };

  const removePendingAttachment = (id: string) => {
    setPendingAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleEmojiClick = () => {
    // TODO: Implement emoji picker
    console.log('Emoji clicked');
  };

  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      {/* Pending Attachments */}
      {pendingAttachments.length > 0 && (
        <Box sx={{ p: 2, pb: 0 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {pendingAttachments.length} file{pendingAttachments.length !== 1 ? 's' : ''} ready to send
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {pendingAttachments.map((attachment) => (
              <Chip
                key={attachment.id}
                label={attachment.name}
                size="small"
                onDelete={() => removePendingAttachment(attachment.id)}
                deleteIcon={<CloseIcon />}
                sx={{
                  maxWidth: 200,
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 1,
            bgcolor: alpha(theme.palette.background.default, 0.5),
            borderRadius: 3,
            p: 1,
          }}
        >
        {/* Attachment Button */}
        <Tooltip title="Attach file">
          <IconButton
            onClick={handleAttachFile}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <AttachFileIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Message Input */}
        <TextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Add emoji">
                  <IconButton
                    onClick={handleEmojiClick}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'warning.main',
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                      },
                    }}
                  >
                    <EmojiIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            sx: {
              px: 2,
              py: 1.5,
              fontSize: '0.9rem',
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  color: 'text.secondary',
                  opacity: 0.7,
                },
              },
            },
          }}
        />

        {/* Send Button */}
        <Tooltip title="Send message">
          <span>
            <IconButton
              onClick={handleSendMessage}
              disabled={(!message.trim() && pendingAttachments.length === 0) || disabled}
              sx={{
                bgcolor: (message.trim() || pendingAttachments.length > 0) && !disabled ? 'primary.main' : alpha(theme.palette.action.disabled, 0.12),
                color: (message.trim() || pendingAttachments.length > 0) && !disabled ? 'primary.contrastText' : 'action.disabled',
                '&:hover': {
                  bgcolor: (message.trim() || pendingAttachments.length > 0) && !disabled ? 'primary.dark' : alpha(theme.palette.action.disabled, 0.12),
                },
                '&.Mui-disabled': {
                  bgcolor: alpha(theme.palette.action.disabled, 0.12),
                  color: 'action.disabled',
                },
                transition: theme.transitions.create(['background-color', 'color'], {
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        </Box>
      </Box>

      {/* File Upload Dialog */}
      <FileUploadComponent
        open={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onFilesUpload={handleFilesUpload}
      />
    </Box>
  );
}; 