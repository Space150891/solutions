import React, { useState, useMemo } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  Chip,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { Conversation, User } from '../types';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  currentUser: User;
  onConversationSelect: (conversationId: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  currentUser,
  onConversationSelect,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(conversation => {
      const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
      return (
        otherParticipant?.name.toLowerCase().includes(query) ||
        conversation.lastMessage?.content.toLowerCase().includes(query)
      );
    });
  }, [conversations, searchQuery, currentUser.id]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const getOtherParticipant = (conversation: Conversation): User => {
    return conversation.participants.find(p => p.id !== currentUser.id) || conversation.participants[0];
  };

  const truncateMessage = (message: string, maxLength: number = 50) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  const getLastMessagePreview = (conversation: Conversation) => {
    if (!conversation.lastMessage) return 'No messages yet';
    
    const message = conversation.lastMessage;
    if (message.attachments && message.attachments.length > 0) {
      const attachmentText = `📎 ${message.attachments.length} file${message.attachments.length !== 1 ? 's' : ''}`;
      if (message.content) {
        return `${attachmentText} • ${truncateMessage(message.content, 30)}`;
      }
      return attachmentText;
    }
    
    return truncateMessage(message.content);
  };

  return (
    <Box
      sx={{
        width: 350,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Messages
        </Typography>
        
        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
              '&.Mui-focused': {
                bgcolor: 'background.paper',
              },
            },
          }}
        />
      </Box>

      {/* Conversations List */}
      <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {filteredConversations.map((conversation) => {
          const otherParticipant = getOtherParticipant(conversation);
          const isActive = conversation.id === activeConversationId;
          
          return (
            <React.Fragment key={conversation.id}>
              <ListItem
                button
                onClick={() => onConversationSelect(conversation.id)}
                sx={{
                  py: 1.5,
                  px: 2,
                  bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                  borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  },
                  cursor: 'pointer',
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: otherParticipant.isOnline ? '#44b700' : '#bdbdbd',
                        color: otherParticipant.isOnline ? '#44b700' : '#bdbdbd',
                        '&::after': {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          animation: otherParticipant.isOnline ? 'ripple 1.2s infinite ease-in-out' : 'none',
                          border: '1px solid currentColor',
                          content: '""',
                        },
                      },
                      '@keyframes ripple': {
                        '0%': {
                          transform: 'scale(.8)',
                          opacity: 1,
                        },
                        '100%': {
                          transform: 'scale(2.4)',
                          opacity: 0,
                        },
                      },
                    }}
                  >
                    <Avatar
                      src={otherParticipant.avatar}
                      alt={otherParticipant.name}
                      sx={{ width: 48, height: 48 }}
                    >
                      {otherParticipant.name.charAt(0)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" fontWeight={500} noWrap>
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
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ mt: 0.5 }}
                    >
                      {getLastMessagePreview(conversation)}
                    </Typography>
                  }
                />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {conversation.lastMessage ? formatTime(conversation.lastMessage.timestamp) : ''}
                  </Typography>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge
                      badgeContent={conversation.unreadCount}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.7rem',
                          height: 18,
                          minWidth: 18,
                        },
                      }}
                    />
                  )}
                  
                  {conversation.isActive && (
                    <CircleIcon
                      sx={{
                        fontSize: 8,
                        color: 'success.main',
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
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
      
      {filteredConversations.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 