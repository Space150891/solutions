import React, { useState, useEffect } from 'react';
import {
   Box,
   Avatar,
   Typography,
   IconButton,
   Chip,
   useTheme,
   alpha,
   Tooltip,
} from '@mui/material';
import {
   Mic as MicIcon,
   MicOff as MicOffIcon,
   Videocam as VideocamIcon,
   VideocamOff as VideocamOffIcon,
   SignalCellular4Bar as SignalIcon,
   SignalCellular3Bar as Signal3Icon,
   SignalCellular2Bar as Signal2Icon,
   SignalCellular1Bar as Signal1Icon,
   Fullscreen as FullscreenIcon,
   PinDrop as PinIcon,
} from '@mui/icons-material';
import { Participant } from '../types';
import { getConnectionQualityColor, getRoleColor } from '../mock-data';

interface VideoFeedProps {
   participant: Participant;
   isLocal?: boolean;
   isMainView?: boolean;
   onToggleMute?: (participantId: string) => void;
   onToggleVideo?: (participantId: string) => void;
   onFullscreen?: (participantId: string) => void;
   onPin?: (participantId: string) => void;
   isPinned?: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({
   participant,
   isLocal = false,
   isMainView = false,
   onToggleMute,
   onToggleVideo,
   onFullscreen,
   onPin,
   isPinned = false,
}) => {
   const theme = useTheme();
   const [isHovered, setIsHovered] = useState(false);
   const [videoError, setVideoError] = useState(false);

   // Simulate video stream with animated placeholder
   const [animationFrame, setAnimationFrame] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setAnimationFrame(prev => (prev + 1) % 60);
      }, 100);
      return () => clearInterval(interval);
   }, []);

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

   const containerHeight = isMainView ? 400 : 200;
   const containerWidth = isMainView ? '100%' : 280;

   return (
      <Box
         sx={{
            position: 'relative',
            width: containerWidth,
            height: containerHeight,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: theme.palette.grey[900],
            border: isPinned ? `3px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
               transform: isMainView ? 'none' : 'scale(1.02)',
               boxShadow: theme.shadows[8],
            }
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {/* Video Stream Simulation */}
         {participant.isVideoEnabled && !videoError ? (
            <Box
               sx={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(
                     ${45 + animationFrame * 2}deg,
                     ${theme.palette.primary.main}20,
                     ${theme.palette.secondary.main}20,
                     ${theme.palette.primary.main}10
                  )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
               }}
            >
               {/* Simulated video content */}
               <Box
                  sx={{
                     width: '80%',
                     height: '80%',
                     borderRadius: '50%',
                     background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
                     animation: 'pulse 2s ease-in-out infinite',
                     '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', opacity: 0.7 },
                        '50%': { transform: 'scale(1.1)', opacity: 1 },
                        '100%': { transform: 'scale(1)', opacity: 0.7 },
                     }
                  }}
               />
               
               {/* Participant Avatar Overlay */}
               <Avatar
                  src={participant.avatar}
                  sx={{
                     position: 'absolute',
                     width: isMainView ? 80 : 60,
                     height: isMainView ? 80 : 60,
                     border: `3px solid ${getRoleColor(participant.role)}`,
                     opacity: 0.8,
                  }}
               >
                  {participant.name.charAt(0)}
               </Avatar>
            </Box>
         ) : (
            // Video disabled or error state
            <Box
               sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: alpha(theme.palette.grey[800], 0.9),
               }}
            >
               <Avatar
                  src={participant.avatar}
                  sx={{
                     width: isMainView ? 120 : 80,
                     height: isMainView ? 120 : 80,
                     mb: 2,
                     border: `3px solid ${getRoleColor(participant.role)}`,
                  }}
               >
                  {participant.name.charAt(0)}
               </Avatar>
               <Typography variant="body2" color="text.secondary" textAlign="center">
                  {!participant.isVideoEnabled ? 'Camera Off' : 'Camera Unavailable'}
               </Typography>
            </Box>
         )}

         {/* Top Overlay - Connection Quality & Role */}
         <Box
            sx={{
               position: 'absolute',
               top: 8,
               left: 8,
               right: 8,
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}
         >
            <Chip
               label={participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
               size="small"
               sx={{
                  backgroundColor: alpha(getRoleColor(participant.role), 0.9),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
               }}
            />
            <Tooltip title={`Connection: ${participant.connectionQuality}`}>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getSignalIcon(participant.connectionQuality)}
               </Box>
            </Tooltip>
         </Box>

         {/* Bottom Overlay - Name & Controls */}
         <Box
            sx={{
               position: 'absolute',
               bottom: 0,
               left: 0,
               right: 0,
               background: `linear-gradient(transparent, ${alpha(theme.palette.common.black, 0.8)})`,
               p: 1,
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}
         >
            <Typography
               variant={isMainView ? "subtitle1" : "body2"}
               color="white"
               fontWeight={600}
               sx={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
               }}
            >
               {participant.name} {isLocal && '(You)'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
               {/* Mute Status */}
               <Box
                  sx={{
                     p: 0.5,
                     borderRadius: 1,
                     backgroundColor: participant.isMuted 
                        ? alpha(theme.palette.error.main, 0.9)
                        : alpha(theme.palette.success.main, 0.9),
                  }}
               >
                  {participant.isMuted ? (
                     <MicOffIcon sx={{ color: 'white', fontSize: 14 }} />
                  ) : (
                     <MicIcon sx={{ color: 'white', fontSize: 14 }} />
                  )}
               </Box>

               {/* Video Status */}
               <Box
                  sx={{
                     p: 0.5,
                     borderRadius: 1,
                     backgroundColor: participant.isVideoEnabled 
                        ? alpha(theme.palette.success.main, 0.9)
                        : alpha(theme.palette.error.main, 0.9),
                  }}
               >
                  {participant.isVideoEnabled ? (
                     <VideocamIcon sx={{ color: 'white', fontSize: 14 }} />
                  ) : (
                     <VideocamOffIcon sx={{ color: 'white', fontSize: 14 }} />
                  )}
               </Box>
            </Box>
         </Box>

         {/* Hover Controls */}
         {isHovered && !isLocal && (
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 8,
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
               }}
            >
               {onPin && (
                  <Tooltip title={isPinned ? "Unpin" : "Pin"}>
                     <IconButton
                        size="small"
                        onClick={() => onPin(participant.id)}
                        sx={{
                           backgroundColor: isPinned 
                              ? alpha(theme.palette.primary.main, 0.9)
                              : alpha(theme.palette.common.black, 0.7),
                           color: 'white',
                           '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.9),
                           }
                        }}
                     >
                        <PinIcon fontSize="small" />
                     </IconButton>
                  </Tooltip>
               )}
               
               {onFullscreen && (
                  <Tooltip title="Fullscreen">
                     <IconButton
                        size="small"
                        onClick={() => onFullscreen(participant.id)}
                        sx={{
                           backgroundColor: alpha(theme.palette.common.black, 0.7),
                           color: 'white',
                           '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.9),
                           }
                        }}
                     >
                        <FullscreenIcon fontSize="small" />
                     </IconButton>
                  </Tooltip>
               )}
            </Box>
         )}

         {/* Online Status Indicator */}
         <Box
            sx={{
               position: 'absolute',
               top: 8,
               right: 8,
               width: 12,
               height: 12,
               borderRadius: '50%',
               backgroundColor: participant.isOnline ? theme.palette.success.main : theme.palette.error.main,
               border: `2px solid white`,
               boxShadow: theme.shadows[2],
            }}
         />

         {/* Pinned Indicator */}
         {isPinned && (
            <Box
               sx={{
                  position: 'absolute',
                  top: -1,
                  right: -1,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  borderRadius: '0 8px 0 8px',
                  p: 0.5,
                  minWidth: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <PinIcon sx={{ fontSize: 12 }} />
            </Box>
         )}
      </Box>
   );
};

export default VideoFeed; 