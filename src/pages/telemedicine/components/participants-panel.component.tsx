import React, { useState } from 'react';
import {
   Box,
   Typography,
   Avatar,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   ListItemSecondaryAction,
   IconButton,
   Chip,
   Tooltip,
   Menu,
   MenuItem,
   useTheme,
   alpha,
   Divider,
} from '@mui/material';
import {
   Mic as MicIcon,
   MicOff as MicOffIcon,
   Videocam as VideocamIcon,
   VideocamOff as VideocamOffIcon,
   MoreVert as MoreVertIcon,
   PersonRemove as RemoveIcon,
   VolumeUp as VolumeUpIcon,
   VolumeOff as VolumeOffIcon,
   PinDrop as PinIcon,
   SignalCellular4Bar as SignalIcon,
   SignalCellular3Bar as Signal3Icon,
   SignalCellular2Bar as Signal2Icon,
   SignalCellular1Bar as Signal1Icon,
} from '@mui/icons-material';
import { Participant } from '../types';
import { getRoleColor, getConnectionQualityColor } from '../mock-data';

interface ParticipantsPanelProps {
   participants: Participant[];
   currentUserId: string;
   isOpen: boolean;
   onMuteParticipant?: (participantId: string) => void;
   onRemoveParticipant?: (participantId: string) => void;
   onPinParticipant?: (participantId: string) => void;
}

const ParticipantsPanel: React.FC<ParticipantsPanelProps> = ({
   participants,
   currentUserId,
   isOpen,
   onMuteParticipant,
   onRemoveParticipant,
   onPinParticipant,
}) => {
   const theme = useTheme();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, participantId: string) => {
      setAnchorEl(event.currentTarget);
      setSelectedParticipant(participantId);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      setSelectedParticipant(null);
   };

   const getSignalIcon = (quality: Participant['connectionQuality']) => {
      const color = getConnectionQualityColor(quality);
      const iconProps = { sx: { color, fontSize: 16 } };

      switch (quality) {
         case 'excellent': return <SignalIcon {...iconProps} />;
         case 'good': return <Signal3Icon {...iconProps} />;
         case 'fair': return <Signal2Icon {...iconProps} />;
         case 'poor': return <Signal1Icon {...iconProps} />;
         default: return <Signal1Icon {...iconProps} />;
      }
   };

   const handleMute = () => {
      if (selectedParticipant && onMuteParticipant) {
         onMuteParticipant(selectedParticipant);
      }
      handleMenuClose();
   };

   const handleRemove = () => {
      if (selectedParticipant && onRemoveParticipant) {
         onRemoveParticipant(selectedParticipant);
      }
      handleMenuClose();
   };

   const handlePin = () => {
      if (selectedParticipant && onPinParticipant) {
         onPinParticipant(selectedParticipant);
      }
      handleMenuClose();
   };

   if (!isOpen) return null;

   const onlineParticipants = participants.filter(p => p.isOnline);
   const offlineParticipants = participants.filter(p => !p.isOnline);

   return (
      <Box
         sx={{
            width: 300,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderLeft: `1px solid ${theme.palette.divider}`,
         }}
      >
         {/* Header */}
         <Box
            sx={{
               p: 2,
               borderBottom: `1px solid ${theme.palette.divider}`,
               backgroundColor: alpha(theme.palette.primary.main, 0.05),
            }}
         >
            <Typography variant="h6" fontWeight={600}>
               Participants ({participants.length})
            </Typography>
            <Typography variant="caption" color="text.secondary">
               {onlineParticipants.length} online • {offlineParticipants.length} offline
            </Typography>
         </Box>

         {/* Participants List */}
         <Box
            sx={{
               flex: 1,
               overflow: 'auto',
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
            {/* Online Participants */}
            {onlineParticipants.length > 0 && (
               <>
                  <Box sx={{ p: 2, pb: 1 }}>
                     <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                        ONLINE ({onlineParticipants.length})
                     </Typography>
                  </Box>
                  <List sx={{ pt: 0 }}>
                     {onlineParticipants.map((participant) => {
                        const isCurrentUser = participant.id === currentUserId;
                        
                        return (
                           <ListItem
                              key={participant.id}
                              sx={{
                                 py: 1.5,
                                 '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                 }
                              }}
                           >
                              <ListItemAvatar>
                                 <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                       src={participant.avatar}
                                       sx={{
                                          width: 40,
                                          height: 40,
                                          border: `2px solid ${getRoleColor(participant.role)}`,
                                       }}
                                    >
                                       {participant.name.charAt(0)}
                                    </Avatar>
                                    {/* Online Status */}
                                    <Box
                                       sx={{
                                          position: 'absolute',
                                          bottom: -2,
                                          right: -2,
                                          width: 12,
                                          height: 12,
                                          borderRadius: '50%',
                                          backgroundColor: theme.palette.success.main,
                                          border: `2px solid white`,
                                       }}
                                    />
                                 </Box>
                              </ListItemAvatar>

                              <ListItemText
                                 primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                       <Typography variant="body2" fontWeight={600}>
                                          {participant.name} {isCurrentUser && '(You)'}
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
                                 }
                                 secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                       {/* Audio/Video Status */}
                                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                          {participant.isMuted ? (
                                             <MicOffIcon sx={{ fontSize: 14, color: theme.palette.error.main }} />
                                          ) : (
                                             <MicIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
                                          )}
                                          {participant.isVideoEnabled ? (
                                             <VideocamIcon sx={{ fontSize: 14, color: theme.palette.success.main }} />
                                          ) : (
                                             <VideocamOffIcon sx={{ fontSize: 14, color: theme.palette.error.main }} />
                                          )}
                                       </Box>

                                       {/* Connection Quality */}
                                       <Tooltip title={`Connection: ${participant.connectionQuality}`}>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                             {getSignalIcon(participant.connectionQuality)}
                                          </Box>
                                       </Tooltip>

                                       <Typography variant="caption" color="text.secondary">
                                          {participant.connectionQuality}
                                       </Typography>
                                    </Box>
                                 }
                              />

                              {!isCurrentUser && (
                                 <ListItemSecondaryAction>
                                    <IconButton
                                       size="small"
                                       onClick={(e) => handleMenuOpen(e, participant.id)}
                                    >
                                       <MoreVertIcon fontSize="small" />
                                    </IconButton>
                                 </ListItemSecondaryAction>
                              )}
                           </ListItem>
                        );
                     })}
                  </List>
               </>
            )}

            {/* Offline Participants */}
            {offlineParticipants.length > 0 && (
               <>
                  <Divider />
                  <Box sx={{ p: 2, pb: 1 }}>
                     <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                        OFFLINE ({offlineParticipants.length})
                     </Typography>
                  </Box>
                  <List sx={{ pt: 0 }}>
                     {offlineParticipants.map((participant) => (
                        <ListItem
                           key={participant.id}
                           sx={{
                              py: 1.5,
                              opacity: 0.6,
                           }}
                        >
                           <ListItemAvatar>
                              <Box sx={{ position: 'relative' }}>
                                 <Avatar
                                    src={participant.avatar}
                                    sx={{
                                       width: 40,
                                       height: 40,
                                       border: `2px solid ${theme.palette.grey[400]}`,
                                    }}
                                 >
                                    {participant.name.charAt(0)}
                                 </Avatar>
                                 {/* Offline Status */}
                                 <Box
                                    sx={{
                                       position: 'absolute',
                                       bottom: -2,
                                       right: -2,
                                       width: 12,
                                       height: 12,
                                       borderRadius: '50%',
                                       backgroundColor: theme.palette.grey[400],
                                       border: `2px solid white`,
                                    }}
                                 />
                              </Box>
                           </ListItemAvatar>

                           <ListItemText
                              primary={
                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" fontWeight={600}>
                                       {participant.name}
                                    </Typography>
                                    <Chip
                                       label={participant.role}
                                       size="small"
                                       sx={{
                                          height: 16,
                                          fontSize: '0.6rem',
                                          backgroundColor: alpha(theme.palette.grey[400], 0.1),
                                          color: theme.palette.grey[600],
                                       }}
                                    />
                                 </Box>
                              }
                              secondary={
                                 <Typography variant="caption" color="text.secondary">
                                    Offline
                                 </Typography>
                              }
                           />
                        </ListItem>
                     ))}
                  </List>
               </>
            )}
         </Box>

         {/* Participant Actions Menu */}
         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
         >
            <MenuItem onClick={handlePin}>
               <PinIcon fontSize="small" sx={{ mr: 1 }} />
               Pin Video
            </MenuItem>
            <MenuItem onClick={handleMute}>
               <MicOffIcon fontSize="small" sx={{ mr: 1 }} />
               Mute Participant
            </MenuItem>
            <MenuItem onClick={handleRemove} sx={{ color: 'error.main' }}>
               <RemoveIcon fontSize="small" sx={{ mr: 1 }} />
               Remove from Call
            </MenuItem>
         </Menu>
      </Box>
   );
};

export default ParticipantsPanel; 