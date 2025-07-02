import React, { useState, useEffect } from 'react';
import {
   Box,
   IconButton,
   Tooltip,
   Typography,
   Chip,
   Button,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Switch,
   FormControlLabel,
   useTheme,
   alpha,
   Divider,
   Badge,
} from '@mui/material';
import {
   Mic as MicIcon,
   MicOff as MicOffIcon,
   Videocam as VideocamIcon,
   VideocamOff as VideocamOffIcon,
   ScreenShare as ScreenShareIcon,
   StopScreenShare as StopScreenShareIcon,
   CallEnd as CallEndIcon,
   Chat as ChatIcon,
   People as PeopleIcon,
   Settings as SettingsIcon,
   FiberManualRecord as RecordIcon,
   Stop as StopIcon,
   Warning as EmergencyIcon,
   VolumeUp as VolumeUpIcon,
} from '@mui/icons-material';
import { ConsultationControls, VideoCallState } from '../types';

interface SessionControlsProps {
   controls: ConsultationControls;
   callState: VideoCallState;
   onToggleMute: () => void;
   onToggleVideo: () => void;
   onToggleScreenShare: () => void;
   onToggleRecording: () => void;
   onToggleChat: () => void;
   onToggleParticipants: () => void;
   onEndCall: () => void;
   onEmergency: () => void;
   unreadMessages?: number;
   sessionDuration: number;
}

const SessionControls: React.FC<SessionControlsProps> = ({
   controls,
   callState,
   onToggleMute,
   onToggleVideo,
   onToggleScreenShare,
   onToggleRecording,
   onToggleChat,
   onToggleParticipants,
   onEndCall,
   onEmergency,
   unreadMessages = 0,
   sessionDuration,
}) => {
   const theme = useTheme();
   const [showEndCallDialog, setShowEndCallDialog] = useState(false);
   const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
   const [showSettingsDialog, setShowSettingsDialog] = useState(false);
   const [audioLevel, setAudioLevel] = useState(0);

   useEffect(() => {
      if (!controls.isMuted && callState.isCallActive) {
         const interval = setInterval(() => {
            setAudioLevel(Math.random() * 100);
         }, 100);
         return () => clearInterval(interval);
      } else {
         setAudioLevel(0);
      }
   }, [controls.isMuted, callState.isCallActive]);

   const formatDuration = (seconds: number) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      if (hrs > 0) {
         return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };

   const getConnectionStatusColor = (status: VideoCallState['connectionStatus']) => {
      switch (status) {
         case 'connected': return theme.palette.success.main;
         case 'connecting': return theme.palette.warning.main;
         case 'reconnecting': return theme.palette.warning.main;
         case 'disconnected': return theme.palette.error.main;
         default: return theme.palette.grey[500];
      }
   };

   const handleEndCall = () => {
      setShowEndCallDialog(false);
      onEndCall();
   };

   const handleEmergency = () => {
      setShowEmergencyDialog(false);
      onEmergency();
   };

   return (
      <>
         <Box
            sx={{
               position: 'fixed',
               bottom: 0,
               left: 0,
               right: 0,
               height: 80,
               backgroundColor: alpha(theme.palette.background.paper, 0.95),
               backdropFilter: 'blur(10px)',
               borderTop: `1px solid ${theme.palette.divider}`,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               px: 3,
               zIndex: 1300,
            }}
         >
            {/* Left Section - Session Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
               <Box>
                  <Typography variant="h6" fontWeight={600}>
                     {formatDuration(sessionDuration)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                     <Box
                        sx={{
                           width: 8,
                           height: 8,
                           borderRadius: '50%',
                           backgroundColor: getConnectionStatusColor(callState.connectionStatus),
                        }}
                     />
                     <Typography variant="caption" color="text.secondary">
                        {callState.connectionStatus.charAt(0).toUpperCase() + callState.connectionStatus.slice(1)}
                     </Typography>
                     {callState.isRecording && (
                        <Chip
                           icon={<RecordIcon sx={{ fontSize: 12, color: 'white' }} />}
                           label="REC"
                           size="small"
                           sx={{
                              backgroundColor: theme.palette.error.main,
                              color: 'white',
                              height: 20,
                              fontSize: '0.7rem',
                              animation: 'pulse 1.5s ease-in-out infinite',
                              '@keyframes pulse': {
                                 '0%': { opacity: 1 },
                                 '50%': { opacity: 0.7 },
                                 '100%': { opacity: 1 },
                              }
                           }}
                        />
                     )}
                  </Box>
               </Box>

               {/* Audio Level Indicator */}
               {!controls.isMuted && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                     <VolumeUpIcon fontSize="small" color="primary" />
                     <Box
                        sx={{
                           width: 40,
                           height: 4,
                           backgroundColor: alpha(theme.palette.primary.main, 0.2),
                           borderRadius: 2,
                           position: 'relative',
                           overflow: 'hidden',
                        }}
                     >
                        <Box
                           sx={{
                              width: `${audioLevel}%`,
                              height: '100%',
                              backgroundColor: theme.palette.primary.main,
                              borderRadius: 2,
                              transition: 'width 0.1s ease',
                           }}
                        />
                     </Box>
                  </Box>
               )}
            </Box>

            {/* Center Section - Main Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Tooltip title={controls.isMuted ? "Unmute" : "Mute"}>
                  <IconButton
                     onClick={onToggleMute}
                     sx={{
                        backgroundColor: controls.isMuted 
                           ? theme.palette.error.main 
                           : alpha(theme.palette.primary.main, 0.1),
                        color: controls.isMuted ? 'white' : theme.palette.primary.main,
                        '&:hover': {
                           backgroundColor: controls.isMuted 
                              ? theme.palette.error.dark 
                              : alpha(theme.palette.primary.main, 0.2),
                        },
                        width: 48,
                        height: 48,
                     }}
                  >
                     {controls.isMuted ? <MicOffIcon /> : <MicIcon />}
                  </IconButton>
               </Tooltip>

               <Tooltip title={controls.isVideoEnabled ? "Turn off camera" : "Turn on camera"}>
                  <IconButton
                     onClick={onToggleVideo}
                     sx={{
                        backgroundColor: controls.isVideoEnabled 
                           ? alpha(theme.palette.primary.main, 0.1)
                           : theme.palette.error.main,
                        color: controls.isVideoEnabled ? theme.palette.primary.main : 'white',
                        '&:hover': {
                           backgroundColor: controls.isVideoEnabled 
                              ? alpha(theme.palette.primary.main, 0.2)
                              : theme.palette.error.dark,
                        },
                        width: 48,
                        height: 48,
                     }}
                  >
                     {controls.isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
                  </IconButton>
               </Tooltip>

               <Tooltip title={controls.isScreenSharing ? "Stop sharing" : "Share screen"}>
                  <IconButton
                     onClick={onToggleScreenShare}
                     sx={{
                        backgroundColor: controls.isScreenSharing 
                           ? theme.palette.secondary.main
                           : alpha(theme.palette.grey[500], 0.1),
                        color: controls.isScreenSharing ? 'white' : theme.palette.grey[600],
                        '&:hover': {
                           backgroundColor: controls.isScreenSharing 
                              ? theme.palette.secondary.dark
                              : alpha(theme.palette.grey[500], 0.2),
                        },
                        width: 48,
                        height: 48,
                     }}
                  >
                     {controls.isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                  </IconButton>
               </Tooltip>

               <Tooltip title={controls.isRecording ? "Stop recording" : "Start recording"}>
                  <IconButton
                     onClick={onToggleRecording}
                     sx={{
                        backgroundColor: controls.isRecording 
                           ? theme.palette.error.main
                           : alpha(theme.palette.grey[500], 0.1),
                        color: controls.isRecording ? 'white' : theme.palette.grey[600],
                        '&:hover': {
                           backgroundColor: controls.isRecording 
                              ? theme.palette.error.dark
                              : alpha(theme.palette.grey[500], 0.2),
                        },
                        width: 48,
                        height: 48,
                     }}
                  >
                     {controls.isRecording ? <StopIcon /> : <RecordIcon />}
                  </IconButton>
               </Tooltip>

               <Tooltip title="End call">
                  <IconButton
                     onClick={() => setShowEndCallDialog(true)}
                     sx={{
                        backgroundColor: theme.palette.error.main,
                        color: 'white',
                        '&:hover': {
                           backgroundColor: theme.palette.error.dark,
                        },
                        width: 56,
                        height: 56,
                        ml: 2,
                     }}
                  >
                     <CallEndIcon />
                  </IconButton>
               </Tooltip>
            </Box>

            {/* Right Section - Secondary Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200, justifyContent: 'flex-end' }}>
               <Tooltip title="Toggle chat">
                  <IconButton
                     onClick={onToggleChat}
                     sx={{
                        backgroundColor: controls.isChatOpen 
                           ? alpha(theme.palette.primary.main, 0.1)
                           : 'transparent',
                        color: controls.isChatOpen ? theme.palette.primary.main : theme.palette.grey[600],
                     }}
                  >
                     <Badge badgeContent={unreadMessages} color="error">
                        <ChatIcon />
                     </Badge>
                  </IconButton>
               </Tooltip>

               <Tooltip title="Show participants">
                  <IconButton
                     onClick={onToggleParticipants}
                     sx={{
                        backgroundColor: controls.isParticipantsOpen 
                           ? alpha(theme.palette.primary.main, 0.1)
                           : 'transparent',
                        color: controls.isParticipantsOpen ? theme.palette.primary.main : theme.palette.grey[600],
                     }}
                  >
                     <Badge badgeContent={callState.participants.length} color="primary">
                        <PeopleIcon />
                     </Badge>
                  </IconButton>
               </Tooltip>

               <Tooltip title="Settings">
                  <IconButton
                     onClick={() => setShowSettingsDialog(true)}
                     sx={{ color: theme.palette.grey[600] }}
                  >
                     <SettingsIcon />
                  </IconButton>
               </Tooltip>

               <Tooltip title="Emergency">
                  <IconButton
                     onClick={() => setShowEmergencyDialog(true)}
                     sx={{
                        color: theme.palette.error.main,
                        '&:hover': {
                           backgroundColor: alpha(theme.palette.error.main, 0.1),
                        }
                     }}
                  >
                     <EmergencyIcon />
                  </IconButton>
               </Tooltip>
            </Box>
         </Box>

         {/* Dialogs */}
         <Dialog open={showEndCallDialog} onClose={() => setShowEndCallDialog(false)}>
            <DialogTitle>End Consultation</DialogTitle>
            <DialogContent>
               <Typography>
                  Are you sure you want to end this consultation? This action cannot be undone.
               </Typography>
               {callState.isRecording && (
                  <Typography color="warning.main" sx={{ mt: 1 }}>
                     ⚠️ Recording is still active and will be stopped.
                  </Typography>
               )}
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setShowEndCallDialog(false)}>Cancel</Button>
               <Button onClick={handleEndCall} color="error" variant="contained">
                  End Call
               </Button>
            </DialogActions>
         </Dialog>

         <Dialog open={showEmergencyDialog} onClose={() => setShowEmergencyDialog(false)}>
            <DialogTitle sx={{ color: 'error.main' }}>🚨 Emergency Protocol</DialogTitle>
            <DialogContent>
               <Typography sx={{ mb: 2 }}>
                  This will immediately alert emergency services and medical staff.
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  • Emergency services will be contacted<br/>
                  • Medical staff will be notified<br/>
                  • Call recording will be flagged as priority<br/>
                  • Patient location will be shared if available
               </Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setShowEmergencyDialog(false)}>Cancel</Button>
               <Button onClick={handleEmergency} color="error" variant="contained">
                  Activate Emergency Protocol
               </Button>
            </DialogActions>
         </Dialog>

         <Dialog open={showSettingsDialog} onClose={() => setShowSettingsDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Call Settings</DialogTitle>
            <DialogContent>
               <Box sx={{ py: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                     Audio & Video
                  </Typography>
                  <FormControlLabel
                     control={<Switch checked={true} />}
                     label="Auto-adjust volume"
                  />
                  <FormControlLabel
                     control={<Switch checked={false} />}
                     label="Noise cancellation"
                  />
                  <FormControlLabel
                     control={<Switch checked={true} />}
                     label="HD video quality"
                  />
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                     Call Quality: {callState.callQuality}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     Connection: {callState.connectionStatus} • {callState.participants.length} participants
                  </Typography>
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setShowSettingsDialog(false)}>Close</Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default SessionControls; 