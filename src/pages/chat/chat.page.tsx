import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import { ChatSidebar } from './components/chat-sidebar.component';
import { ChatHeader } from './components/chat-header.component';
import { MessagesList } from './components/messages-list.component';
import { MessageInput } from './components/message-input.component';
import { 
  mockConversations, 
  mockMessages, 
  mockUsers, 
  currentUser, 
  autoResponses 
} from './mock';
import { Message, Conversation, User, MessageStatus, MessageType, FileAttachment } from './types';
import { IPages } from '../../types/common.types';

export default function ChatPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>(mockMessages);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-3');
  const [users] = useState<User[]>(mockUsers);
  const [typingIndicators, setTypingIndicators] = useState<{ [conversationId: string]: string[] }>({});
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  // Get active conversation and other participant
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const otherParticipant = activeConversation?.participants.find(p => p.id !== currentUser.id);
  const conversationMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  // Auto-response simulation
  const simulateAutoResponse = useCallback((conversationId: string, userMessage: string) => {
    // Don't respond to our own messages
    const conversation = conversations.find(c => c.id === conversationId);
    const otherUser = conversation?.participants.find(p => p.id !== currentUser.id);
    
    if (!otherUser || !otherUser.isOnline) return;

    // Show typing indicator
    setTimeout(() => {
      setTypingIndicators(prev => ({
        ...prev,
        [conversationId]: [otherUser.id],
      }));
    }, 1000);

    // Send auto response after 2-4 seconds
    const responseDelay = 2000 + Math.random() * 2000;
    setTimeout(() => {
      // Remove typing indicator
      setTypingIndicators(prev => ({
        ...prev,
        [conversationId]: [],
      }));

      // Generate response based on message content
      let response = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      
      // Context-aware responses
      if (userMessage.toLowerCase().includes('appointment')) {
        response = "I'll check my schedule and get back to you with available appointment slots.";
      } else if (userMessage.toLowerCase().includes('medication') || userMessage.toLowerCase().includes('medicine')) {
        response = "Let me review your current medication list and provide you with the appropriate guidance.";
      } else if (userMessage.toLowerCase().includes('pain') || userMessage.toLowerCase().includes('hurt')) {
        response = "I understand your concern about the pain. Can you describe the intensity and location more specifically?";
      } else if (userMessage.toLowerCase().includes('thank')) {
        response = "You're very welcome! I'm here to help whenever you need assistance.";
      }

      const newMessage: Message = {
        id: `msg-${Date.now()}-${Math.random()}`,
        conversationId,
        senderId: otherUser.id,
        content: response,
        timestamp: new Date(),
        type: MessageType.TEXT,
        status: MessageStatus.SENT,
      };

      // Add message
      setMessages(prev => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), newMessage],
      }));

      // Update conversation
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, lastMessage: newMessage, updatedAt: new Date() }
          : conv
      ));

      // Show notification if not in active conversation
      if (conversationId !== activeConversationId) {
        setNotification({
          message: `New message from ${otherUser.name}`,
          severity: 'info',
        });
      }
    }, responseDelay);
  }, [conversations, currentUser.id, activeConversationId]);

  // Handle sending messages
  const handleSendMessage = useCallback((content: string, attachments?: FileAttachment[]) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type: attachments && attachments.length > 0 ? MessageType.FILE : MessageType.TEXT,
      status: MessageStatus.SENT,
      attachments,
    };

    // Add message to state
    setMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === activeConversationId 
        ? { ...conv, lastMessage: newMessage, updatedAt: new Date(), unreadCount: 0 }
        : conv
    ));

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeConversationId]: prev[activeConversationId]?.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: MessageStatus.DELIVERED } : msg
        ) || [],
      }));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeConversationId]: prev[activeConversationId]?.map(msg =>
          msg.id === newMessage.id ? { ...msg, status: MessageStatus.READ } : msg
        ) || [],
      }));
    }, 2000);

    // Trigger auto-response
    simulateAutoResponse(activeConversationId, content);
  }, [activeConversationId, currentUser.id, simulateAutoResponse]);

  // Handle conversation selection
  const handleConversationSelect = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
    
    // Mark messages as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  }, []);

  // Handle typing indicators
  const handleTypingStart = useCallback(() => {
    if (!activeConversationId) return;
    // In a real app, this would send typing indicator to other users
  }, [activeConversationId]);

  const handleTypingStop = useCallback(() => {
    if (!activeConversationId) return;
    // In a real app, this would stop typing indicator for other users
  }, [activeConversationId]);

  // Simulate online status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change online status of users (except current user)
      const otherUsers = users.filter(u => u.id !== currentUser.id);
      const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
      
      // Small chance to change status
      if (Math.random() < 0.1) {
        // This would typically be managed by a real-time connection (WebSocket)
        console.log(`${randomUser.name} status would change in real implementation`);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [users, currentUser.id]);

  const handleVideoCall = () => {
    setNotification({
      message: 'Video call feature would be implemented with WebRTC',
      severity: 'info',
    });
  };

  const handleVoiceCall = () => {
    setNotification({
      message: 'Voice call feature would be implemented with WebRTC',
      severity: 'info',
    });
  };

  const handleMoreOptions = () => {
    setNotification({
      message: 'Additional options menu would be implemented here',
      severity: 'info',
    });
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      {/* Page Title */}
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h5" fontWeight={600}>
          {IPages.CHAT}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Secure messaging between doctors and patients
        </Typography>
      </Box>

      {/* Chat Interface */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar - Hidden on mobile when chat is active */}
        {(!isMobile || !activeConversationId) && (
          <ChatSidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            currentUser={currentUser}
            onConversationSelect={handleConversationSelect}
          />
        )}

        {/* Chat Area */}
        {activeConversationId && otherParticipant ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ChatHeader
              otherParticipant={otherParticipant}
              isTyping={typingIndicators[activeConversationId]?.length > 0}
              onVideoCall={handleVideoCall}
              onVoiceCall={handleVoiceCall}
              onMoreOptions={handleMoreOptions}
            />
            
            <MessagesList
              messages={conversationMessages}
              users={users}
              currentUserId={currentUser.id}
              isTyping={typingIndicators[activeConversationId]?.length > 0}
              typingUser={typingIndicators[activeConversationId]?.length > 0 
                ? users.find(u => u.id === typingIndicators[activeConversationId][0])
                : undefined
              }
            />
            
            <MessageInput
              onSendMessage={handleSendMessage}
              onTypingStart={handleTypingStart}
              onTypingStop={handleTypingStop}
              placeholder={`Message ${otherParticipant.name}...`}
            />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Select a conversation to start messaging
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Choose from your existing conversations or start a new one
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Notifications */}
      <Snackbar
        open={!!notification}
        autoHideDuration={4000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.severity}
          variant="filled"
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 