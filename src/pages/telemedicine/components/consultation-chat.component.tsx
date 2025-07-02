import React, { useState, useRef, useEffect } from 'react';
import {
   Box,
   Typography,
   TextField,
   IconButton,
   Avatar,
   Paper,
   Chip,
   List,
   ListItem,
   Divider,
   useTheme,
   alpha,
   Badge,
   Tooltip,
   Menu,
   MenuItem,
} from '@mui/material';
import {
   Send as SendIcon,
   AttachFile as AttachFileIcon,
   EmojiEmotions as EmojiIcon,
   MoreVert as MoreVertIcon,
   Download as DownloadIcon,
   Delete as DeleteIcon,
   Reply as ReplyIcon,
} from '@mui/icons-material';
import { ChatMessage, Participant } from '../types';
import { getRoleColor, formatFileSize } from '../mock-data';

interface ConsultationChatProps {
   messages: ChatMessage[];
   participants: Participant[];
   currentUserId: string;
   onSendMessage: (message: string) => void;
   onSendFile?: (file: File) => void;
   isOpen: boolean;
}

const ConsultationChat: React.FC<ConsultationChatProps> = ({
   messages,
   participants,
   currentUserId,
   onSendMessage,
   onSendFile,
   isOpen,
}) => {
   const theme = useTheme();
   const [newMessage, setNewMessage] = useState('');
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const handleSendMessage = () => {
      if (newMessage.trim()) {
         onSendMessage(newMessage.trim());
         setNewMessage('');
      }
   };

   const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
         event.preventDefault();
         handleSendMessage();
      }
   };

   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && onSendFile) {
         onSendFile(file);
      }
   };

   const handleMessageAction = (event: React.MouseEvent<HTMLElement>, messageId: string) => {
      setAnchorEl(event.currentTarget);
      setSelectedMessageId(messageId);
   };

   const handleCloseMenu = () => {
      setAnchorEl(null);
      setSelectedMessageId(null);
   };

   const formatTime = (timestamp: Date) => {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   };

   const getParticipantInfo = (senderId: string) => {
      return participants.find(p => p.id === senderId) || {
         id: senderId,
         name: 'Unknown',
         role: 'patient' as const,
         isOnline: false,
         isMuted: false,
         isVideoEnabled: false,
         connectionQuality: 'poor' as const
      };
   };

   if (!isOpen) return null;

   return (
      <Box
         sx={{
            width: 350,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderLeft: `1px solid ${theme.palette.divider}`,
         }}
      >
         {/* Chat Header */}
         <Box
            sx={{
               p: 2,
               borderBottom: `1px solid ${theme.palette.divider}`,
               backgroundColor: alpha(theme.palette.primary.main, 0.05),
            }}
         >
            <Typography variant="h6" fontWeight={600}>
               Consultation Chat
            </Typography>
            <Typography variant="caption" color="text.secondary">
               {participants.filter(p => p.isOnline).length} participants online
            </Typography>
         </Box>

         {/* Messages List */}
         <Box
            sx={{
               flex: 1,
               overflow: 'auto',
               p: 1,
               '&::-webkit-scrollbar': {
                  width: 6,
               },
               '&::-webkit-scrollbar-track': {
                  backgroundColor: alpha(theme.palette.grey[300], 0.3),
               },
               '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.grey[500], 0.5),
                  borderRadius: 3,
               },
            }}
         >
            <List sx={{ p: 0 }}>
               {messages.map((message, index) => {
                  const participant = getParticipantInfo(message.senderId);
                  const isCurrentUser = message.senderId === currentUserId;
                  const isSystemMessage = message.type === 'system';
                  const showAvatar = !isCurrentUser && !isSystemMessage;

                  return (
                     <React.Fragment key={message.id}>
                        <ListItem
                           sx={{
                              display: 'flex',
                              flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                              alignItems: 'flex-start',
                              gap: 1,
                              py: 1,
                              px: 0,
                           }}
                        >
                           {showAvatar && (
                              <Avatar
                                 src={participant.avatar}
                                 sx={{
                                    width: 32,
                                    height: 32,
                                    border: `2px solid ${getRoleColor(participant.role)}`,
                                 }}
                              >
                                 {participant.name.charAt(0)}
                              </Avatar>
                           )}

                           <Box
                              sx={{
                                 flex: 1,
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
                              }}
                           >
                              {!isSystemMessage && (
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       gap: 1,
                                       mb: 0.5,
                                       flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                                    }}
                                 >
                                    <Typography
                                       variant="caption"
                                       fontWeight={600}
                                       sx={{ color: getRoleColor(participant.role) }}
                                    >
                                       {isCurrentUser ? 'You' : participant.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                       {formatTime(message.timestamp)}
                                    </Typography>
                                    <Chip
                                       label={participant.role}
                                       size="small"
                                       sx={{
                                          height: 16,
                                          fontSize: '0.6rem',
                                          backgroundColor: alpha(getRoleColor(participant.role), 0.1),
                                          color: getRoleColor(participant.role),
                                       }}
                                    />
                                 </Box>
                              )}

                              <Paper
                                 elevation={1}
                                 sx={{
                                    p: 1.5,
                                    maxWidth: '80%',
                                    backgroundColor: isSystemMessage
                                       ? alpha(theme.palette.info.main, 0.1)
                                       : isCurrentUser
                                       ? theme.palette.primary.main
                                       : theme.palette.background.default,
                                    color: isCurrentUser ? 'white' : 'text.primary',
                                    borderRadius: 2,
                                    position: 'relative',
                                    border: isSystemMessage ? `1px solid ${alpha(theme.palette.info.main, 0.3)}` : 'none',
                                 }}
                              >
                                 {message.type === 'file' ? (
                                    <Box>
                                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                          <AttachFileIcon fontSize="small" />
                                          <Typography variant="body2" fontWeight={600}>
                                             {message.fileName}
                                          </Typography>
                                       </Box>
                                       <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                                          {formatFileSize(1024 * 256)} • PDF
                                       </Typography>
                                       <IconButton
                                          size="small"
                                          sx={{ color: isCurrentUser ? 'white' : 'primary.main' }}
                                       >
                                          <DownloadIcon fontSize="small" />
                                       </IconButton>
                                    </Box>
                                 ) : (
                                    <Typography
                                       variant="body2"
                                       sx={{
                                          lineHeight: 1.4,
                                          whiteSpace: 'pre-wrap',
                                          wordBreak: 'break-word',
                                       }}
                                    >
                                       {message.message}
                                    </Typography>
                                 )}

                                 {!isSystemMessage && !isCurrentUser && (
                                    <IconButton
                                       size="small"
                                       onClick={(e) => handleMessageAction(e, message.id)}
                                       sx={{
                                          position: 'absolute',
                                          top: -8,
                                          right: -8,
                                          backgroundColor: theme.palette.background.paper,
                                          boxShadow: theme.shadows[1],
                                          '&:hover': {
                                             backgroundColor: theme.palette.background.default,
                                          }
                                       }}
                                    >
                                       <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                 )}
                              </Paper>
                           </Box>
                        </ListItem>
                        {index < messages.length - 1 && <Divider variant="middle" />}
                     </React.Fragment>
                  );
               })}
            </List>
            <div ref={messagesEndRef} />
         </Box>

         {/* Message Input */}
         <Box
            sx={{
               p: 2,
               borderTop: `1px solid ${theme.palette.divider}`,
               backgroundColor: alpha(theme.palette.background.default, 0.5),
            }}
         >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
               <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                     }
                  }}
               />
               <Tooltip title="Attach file">
                  <IconButton
                     onClick={() => fileInputRef.current?.click()}
                     sx={{ color: theme.palette.primary.main }}
                  >
                     <AttachFileIcon />
                  </IconButton>
               </Tooltip>
               <Tooltip title="Send message">
                  <IconButton
                     onClick={handleSendMessage}
                     disabled={!newMessage.trim()}
                     sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                           backgroundColor: theme.palette.primary.dark,
                        },
                        '&:disabled': {
                           backgroundColor: theme.palette.grey[300],
                           color: theme.palette.grey[500],
                        }
                     }}
                  >
                     <SendIcon />
                  </IconButton>
               </Tooltip>
            </Box>
         </Box>

         {/* Hidden File Input */}
         <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
         />

         {/* Message Actions Menu */}
         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
         >
            <MenuItem onClick={handleCloseMenu}>
               <ReplyIcon fontSize="small" sx={{ mr: 1 }} />
               Reply
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
               <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
               Delete
            </MenuItem>
         </Menu>
      </Box>
   );
};

export default ConsultationChat; 