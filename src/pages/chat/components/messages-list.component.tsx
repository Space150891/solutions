import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { MessageBubble } from './message-bubble.component';
import { Message, User } from '../types';

interface MessagesListProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
  isTyping?: boolean;
  typingUser?: User;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  users,
  currentUserId,
  isTyping = false,
  typingUser,
}) => {
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const usersMap = React.useMemo(() => {
    return users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, User>);
  }, [users]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatDateSeparator = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const shouldShowDateSeparator = (currentMessage: Message, previousMessage?: Message) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp);
    const previousDate = new Date(previousMessage.timestamp);
    
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  const shouldShowAvatar = (currentMessage: Message, nextMessage?: Message) => {
    if (!nextMessage) return true;
    if (currentMessage.senderId !== nextMessage.senderId) return true;
    
    // Show avatar if there's a significant time gap (more than 5 minutes)
    const timeDiff = nextMessage.timestamp.getTime() - currentMessage.timestamp.getTime();
    return timeDiff > 5 * 60 * 1000;
  };

  const TypingIndicator = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        mb: 1,
        px: 2,
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {typingUser && (
        <>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" color="primary.main" fontWeight={600}>
              {typingUser.name.charAt(0)}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.8)
                : theme.palette.grey[100],
              px: 2,
              py: 1.5,
              borderRadius: 2,
              borderTopLeftRadius: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                '& > div': {
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'text.secondary',
                  animation: 'typing 1.4s infinite ease-in-out',
                  '&:nth-of-type(1)': { animationDelay: '0s' },
                  '&:nth-of-type(2)': { animationDelay: '0.2s' },
                  '&:nth-of-type(3)': { animationDelay: '0.4s' },
                },
                '@keyframes typing': {
                  '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.5 },
                  '30%': { transform: 'translateY(-10px)', opacity: 1 },
                },
              }}
            >
              <div />
              <div />
              <div />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No messages yet. Start the conversation!
          </Typography>
        </Box>
      ) : (
        <Box sx={{ py: 2 }}>
          {messages.map((message, index) => {
            const sender = usersMap[message.senderId];
            const isOwn = message.senderId === currentUserId;
            const previousMessage = index > 0 ? messages[index - 1] : undefined;
            const nextMessage = index < messages.length - 1 ? messages[index + 1] : undefined;
            const showDateSeparator = shouldShowDateSeparator(message, previousMessage);
            const showAvatar = shouldShowAvatar(message, nextMessage);

            return (
              <React.Fragment key={message.id}>
                {showDateSeparator && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      my: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: alpha(theme.palette.background.paper, 0.8),
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      {formatDateSeparator(message.timestamp)}
                    </Typography>
                  </Box>
                )}
                
                <MessageBubble
                  message={message}
                  sender={sender}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  showTimestamp={showAvatar}
                />
              </React.Fragment>
            );
          })}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </Box>
      )}
    </Box>
  );
}; 