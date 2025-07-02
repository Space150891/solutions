import React, { useState, useEffect } from 'react';
import { Box, Grid, useTheme, alpha, Typography, Snackbar, Alert } from '@mui/material';
import { PageLayout } from '../../components/page-layout/page-layout.component';
import VideoFeed from './components/video-feed.component';
import ConsultationChat from './components/consultation-chat.component';
import SessionControls from './components/session-controls.component';
import ParticipantsPanel from './components/participants-panel.component';
import {
   mockParticipants,
   mockChatMessages,
   mockConsultationSession,
   generateMockMessage,
} from './mock-data';
import {
   Participant,
   ChatMessage,
   ConsultationControls,
   VideoCallState,
   TelemedicineProps,
} from './types';

const TelemedicinePage: React.FC<TelemedicineProps> = ({
   sessionId,
   patientId,
   onSessionEnd,
   onEmergency,
}) => {
   const theme = useTheme();
   
   // State management
   const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
   const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
   const [sessionDuration, setSessionDuration] = useState(0);
   const [pinnedParticipant, setPinnedParticipant] = useState<string | null>(null);
   const [unreadMessages, setUnreadMessages] = useState(0);
   const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);

   // Controls state
   const [controls, setControls] = useState<ConsultationControls>({
      isMuted: false,
      isVideoEnabled: true,
      isScreenSharing: false,
      isRecording: false,
      isChatOpen: false,
      isParticipantsOpen: false,
      isSettingsOpen: false,
   });

   // Call state
   const [callState, setCallState] = useState<VideoCallState>({
      isCallActive: true,
      isRecording: false,
      recordingDuration: 0,
      participants: mockParticipants,
      localParticipant: mockParticipants[0], // Assuming first participant is local user
      isScreenSharing: false,
      callQuality: 'excellent',
      connectionStatus: 'connected',
   });

   // Session timer
   useEffect(() => {
      const timer = setInterval(() => {
         setSessionDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   // Simulate periodic connection quality changes
   useEffect(() => {
      const qualityTimer = setInterval(() => {
         const qualities: VideoCallState['callQuality'][] = ['excellent', 'good', 'fair'];
         const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
         
         setCallState(prev => ({
            ...prev,
            callQuality: randomQuality,
         }));
      }, 10000);

      return () => clearInterval(qualityTimer);
   }, []);

   // Control handlers
   const handleToggleMute = () => {
      setControls(prev => ({ ...prev, isMuted: !prev.isMuted }));
             setCallState(prev => ({
          ...prev,
          localParticipant: { ...prev.localParticipant, isMuted: !controls.isMuted }
       }));
      
      // Update participant in list
      setParticipants(prev => prev.map(p => 
         p.id === callState.localParticipant.id 
            ? { ...p, isMuted: !controls.isMuted }
            : p
      ));

      showNotification(
         controls.isMuted ? 'Microphone unmuted' : 'Microphone muted',
         'info'
      );
   };

   const handleToggleVideo = () => {
      setControls(prev => ({ ...prev, isVideoEnabled: !prev.isVideoEnabled }));
             setCallState(prev => ({
          ...prev,
          localParticipant: { ...prev.localParticipant, isVideoEnabled: !controls.isVideoEnabled }
       }));

      // Update participant in list
      setParticipants(prev => prev.map(p => 
         p.id === callState.localParticipant.id 
            ? { ...p, isVideoEnabled: !controls.isVideoEnabled }
            : p
      ));

      showNotification(
         controls.isVideoEnabled ? 'Camera turned off' : 'Camera turned on',
         'info'
      );
   };

   const handleToggleScreenShare = () => {
      setControls(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
      setCallState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
      
      showNotification(
         controls.isScreenSharing ? 'Screen sharing stopped' : 'Screen sharing started',
         'success'
      );
   };

   const handleToggleRecording = () => {
      setControls(prev => ({ ...prev, isRecording: !prev.isRecording }));
      setCallState(prev => ({ ...prev, isRecording: !prev.isRecording }));
      
      showNotification(
         controls.isRecording ? 'Recording stopped' : 'Recording started',
         controls.isRecording ? 'info' : 'warning'
      );
   };

   const handleToggleChat = () => {
      setControls(prev => ({ ...prev, isChatOpen: !prev.isChatOpen }));
      if (!controls.isChatOpen) {
         setUnreadMessages(0);
      }
   };

   const handleToggleParticipants = () => {
      setControls(prev => ({ ...prev, isParticipantsOpen: !prev.isParticipantsOpen }));
   };

   const handleEndCall = () => {
      setCallState(prev => ({ ...prev, isCallActive: false, connectionStatus: 'disconnected' }));
      showNotification('Consultation ended', 'info');
      
      // Simulate redirect after 2 seconds
      setTimeout(() => {
         if (onSessionEnd) {
            onSessionEnd();
         } else {
            window.history.back();
         }
      }, 2000);
   };

   const handleEmergency = () => {
      showNotification('🚨 Emergency protocol activated! Medical staff have been notified.', 'error');
      setCallState(prev => ({ ...prev, isRecording: true }));
      setControls(prev => ({ ...prev, isRecording: true }));
      
      if (onEmergency) {
         onEmergency();
      }
   };

   const handleSendMessage = (message: string) => {
      const newMessage = generateMockMessage(
         callState.localParticipant.id,
         callState.localParticipant.name,
         callState.localParticipant.role,
         message
      );
      
      setMessages(prev => [...prev, newMessage]);

      // Simulate response from doctor after 2-5 seconds
      if (callState.localParticipant.role === 'patient') {
         setTimeout(() => {
            const doctorParticipant = participants.find(p => p.role === 'doctor');
            if (doctorParticipant) {
               const responses = [
                  "Thank you for sharing that information.",
                  "I understand. Let me review your symptoms.",
                  "That's helpful context. Can you tell me more?",
                  "I see. Let's discuss the next steps.",
                  "Based on what you've described, I recommend..."
               ];
               const randomResponse = responses[Math.floor(Math.random() * responses.length)];
               
               const doctorMessage = generateMockMessage(
                  doctorParticipant.id,
                  doctorParticipant.name,
                  doctorParticipant.role,
                  randomResponse
               );
               
               setMessages(prev => [...prev, doctorMessage]);
               
               if (!controls.isChatOpen) {
                  setUnreadMessages(prev => prev + 1);
               }
            }
         }, Math.random() * 3000 + 2000);
      }
   };

   const handleSendFile = (file: File) => {
      const fileMessage = generateMockMessage(
         callState.localParticipant.id,
         callState.localParticipant.name,
         callState.localParticipant.role,
         `Uploaded file: ${file.name}`
      );
      fileMessage.type = 'file';
      fileMessage.fileName = file.name;
      
      setMessages(prev => [...prev, fileMessage]);
      showNotification(`File "${file.name}" uploaded successfully`, 'success');
   };

   const handlePinParticipant = (participantId: string) => {
      setPinnedParticipant(prev => prev === participantId ? null : participantId);
      const participant = participants.find(p => p.id === participantId);
      showNotification(
         pinnedParticipant === participantId 
            ? `${participant?.name} unpinned` 
            : `${participant?.name} pinned to main view`,
         'info'
      );
   };

   const handleMuteParticipant = (participantId: string) => {
      const participant = participants.find(p => p.id === participantId);
      showNotification(`${participant?.name} has been muted`, 'warning');
   };

   const handleRemoveParticipant = (participantId: string) => {
      const participant = participants.find(p => p.id === participantId);
      setParticipants(prev => prev.filter(p => p.id !== participantId));
      showNotification(`${participant?.name} has been removed from the call`, 'warning');
   };

   const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
      setNotification({ message, severity });
   };

   const handleCloseNotification = () => {
      setNotification(null);
   };

   const getMainParticipant = () => {
      if (pinnedParticipant) {
         return participants.find(p => p.id === pinnedParticipant) || participants[1];
      }
      return participants.find(p => p.id !== callState.localParticipant.id) || participants[1];
   };

   const getSideParticipants = () => {
      const mainParticipant = getMainParticipant();
      return participants.filter(p => 
         p.id !== callState.localParticipant.id && 
         p.id !== mainParticipant?.id &&
         p.isOnline
      );
   };

   return (
      <PageLayout title="Telemedicine Consultation" subtitle="Live Video Consultation">
         <Box
            sx={{
               height: 'calc(100vh - 140px)',
               display: 'flex',
               backgroundColor: alpha(theme.palette.grey[900], 0.05),
               position: 'relative',
               overflow: 'hidden',
            }}
         >
            {/* Main Video Area */}
            <Box
               sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  pb: 10, // Space for controls
               }}
            >
               {/* Session Header */}
               <Box
                  sx={{
                     mb: 2,
                     p: 2,
                     backgroundColor: theme.palette.background.paper,
                     borderRadius: 2,
                     boxShadow: theme.shadows[1],
                  }}
               >
                  <Typography variant="h6" fontWeight={600}>
                     {mockConsultationSession.consultationType.charAt(0).toUpperCase() + 
                      mockConsultationSession.consultationType.slice(1)} Consultation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     {mockConsultationSession.specialty} • Dr. {mockConsultationSession.doctorName} with {mockConsultationSession.patientName}
                  </Typography>
               </Box>

               {/* Video Grid */}
               <Box sx={{ flex: 1, display: 'flex', gap: 2 }}>
                  {/* Main Video */}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                     <VideoFeed
                        participant={getMainParticipant()!}
                        isMainView={true}
                        onPin={handlePinParticipant}
                        isPinned={pinnedParticipant === getMainParticipant()?.id}
                     />
                     
                     {/* Local Video (Picture-in-Picture) */}
                     <Box
                        sx={{
                           position: 'absolute',
                           bottom: 100,
                           right: controls.isChatOpen ? 370 : 20,
                           zIndex: 1000,
                           transition: 'right 0.3s ease',
                        }}
                     >
                        <VideoFeed
                           participant={callState.localParticipant}
                           isLocal={true}
                           onToggleMute={handleToggleMute}
                           onToggleVideo={handleToggleVideo}
                        />
                     </Box>
                  </Box>

                  {/* Side Video Participants */}
                  {getSideParticipants().length > 0 && (
                     <Box
                        sx={{
                           width: 300,
                           display: 'flex',
                           flexDirection: 'column',
                           gap: 2,
                           maxHeight: '100%',
                           overflow: 'auto',
                        }}
                     >
                        {getSideParticipants().map((participant) => (
                           <VideoFeed
                              key={participant.id}
                              participant={participant}
                              onPin={handlePinParticipant}
                              isPinned={pinnedParticipant === participant.id}
                           />
                        ))}
                     </Box>
                  )}
               </Box>
            </Box>

            {/* Chat Panel */}
            <ConsultationChat
               messages={messages}
               participants={participants}
               currentUserId={callState.localParticipant.id}
               onSendMessage={handleSendMessage}
               onSendFile={handleSendFile}
               isOpen={controls.isChatOpen}
            />

            {/* Participants Panel */}
            <ParticipantsPanel
               participants={participants}
               currentUserId={callState.localParticipant.id}
               isOpen={controls.isParticipantsOpen}
               onMuteParticipant={handleMuteParticipant}
               onRemoveParticipant={handleRemoveParticipant}
               onPinParticipant={handlePinParticipant}
            />

            {/* Session Controls */}
            <SessionControls
               controls={controls}
               callState={callState}
               onToggleMute={handleToggleMute}
               onToggleVideo={handleToggleVideo}
               onToggleScreenShare={handleToggleScreenShare}
               onToggleRecording={handleToggleRecording}
               onToggleChat={handleToggleChat}
               onToggleParticipants={handleToggleParticipants}
               onEndCall={handleEndCall}
               onEmergency={handleEmergency}
               unreadMessages={unreadMessages}
               sessionDuration={sessionDuration}
            />

            {/* Notifications */}
            <Snackbar
               open={!!notification}
               autoHideDuration={4000}
               onClose={handleCloseNotification}
               anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                         >
                <Alert 
                   onClose={handleCloseNotification} 
                   severity={notification?.severity || 'info'}
                   sx={{ width: '100%' }}
                >
                   {notification?.message || ''}
                </Alert>
             </Snackbar>
         </Box>
      </PageLayout>
   );
};

export default TelemedicinePage; 