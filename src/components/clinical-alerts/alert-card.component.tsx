import React from 'react';
import {
   Box,
   Typography,
   Chip,
   IconButton,
   Collapse,
   List,
   ListItem,
   ListItemText,
   useTheme,
   alpha,
} from '@mui/material';
import {
   Warning as WarningIcon,
   Error as ErrorIcon,
   Info as InfoIcon,
   LocalHospital as MedicalIcon,
   ExpandMore as ExpandMoreIcon,
   Close as CloseIcon,
   CheckCircle as CheckIcon,
   Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { MainCard } from '../cards/main-card.component';
import { ClinicalAlert } from './types';

interface AlertCardProps {
   alert: ClinicalAlert;
   onDismiss?: (alertId: string) => void;
   onAcknowledge?: (alertId: string) => void;
   compact?: boolean;
}

const AlertCard: React.FC<AlertCardProps> = ({ 
   alert, 
   onDismiss, 
   onAcknowledge, 
   compact = false 
}) => {
   const theme = useTheme();
   const [expanded, setExpanded] = React.useState(false);

   const getSeverityColor = (severity: ClinicalAlert['severity']) => {
      switch (severity) {
         case 'critical':
            return theme.palette.error.main;
         case 'high':
            return theme.palette.warning.main;
         case 'medium':
            return theme.palette.info.main;
         case 'low':
            return theme.palette.success.main;
         default:
            return theme.palette.grey[500];
      }
   };

   const getSeverityIcon = (severity: ClinicalAlert['severity']) => {
      const color = getSeverityColor(severity);
      switch (severity) {
         case 'critical':
            return <ErrorIcon sx={{ color, fontSize: 20 }} />;
         case 'high':
            return <WarningIcon sx={{ color, fontSize: 20 }} />;
         case 'medium':
            return <InfoIcon sx={{ color, fontSize: 20 }} />;
         case 'low':
            return <CheckIcon sx={{ color, fontSize: 20 }} />;
         default:
            return <InfoIcon sx={{ color, fontSize: 20 }} />;
      }
   };

   const getTypeIcon = (type: ClinicalAlert['type']) => {
      switch (type) {
         case 'drug-interaction':
         case 'allergy':
         case 'medication-reminder':
            return <MedicalIcon sx={{ fontSize: 16 }} />;
         case 'preventive-care':
            return <ScheduleIcon sx={{ fontSize: 16 }} />;
         default:
            return <MedicalIcon sx={{ fontSize: 16 }} />;
      }
   };

   const formatTimestamp = (timestamp: Date) => {
      const now = new Date();
      const diff = now.getTime() - timestamp.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60));

      if (hours > 24) {
         return timestamp.toLocaleDateString();
      } else if (hours > 0) {
         return `${hours}h ago`;
      } else {
         return `${minutes}m ago`;
      }
   };

   return (
      <MainCard
         sx={{
            mb: compact ? 1 : 2,
            border: `2px solid ${alpha(getSeverityColor(alert.severity), 0.3)}`,
            backgroundColor: alpha(getSeverityColor(alert.severity), 0.05),
            '&:hover': {
               backgroundColor: alpha(getSeverityColor(alert.severity), 0.08),
            }
         }}
         contentSX={{ p: compact ? 1.5 : 2 }}
      >
         <Box display="flex" alignItems="flex-start" gap={1.5}>
           {/* Severity Icon */}
           <Box sx={{ mt: 0.5 }}>
              {getSeverityIcon(alert.severity)}
           </Box>

           {/* Main Content */}
           <Box flex={1} minWidth={0}>
              {/* Header */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                 <Chip
                    icon={getTypeIcon(alert.type)}
                    label={alert.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    size="small"
                    variant="outlined"
                    sx={{ 
                       height: 24,
                       fontSize: '0.75rem',
                       '& .MuiChip-icon': { fontSize: 14 }
                    }}
                 />
                 <Chip
                    label={alert.severity.toUpperCase()}
                    size="small"
                    sx={{
                       backgroundColor: getSeverityColor(alert.severity),
                       color: 'white',
                       height: 24,
                       fontSize: '0.75rem',
                       fontWeight: 600
                    }}
                 />
                 <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                    {formatTimestamp(alert.timestamp)}
                 </Typography>
              </Box>

              {/* Title */}
              <Typography 
                 variant={compact ? "subtitle2" : "h6"} 
                 fontWeight={600}
                 sx={{ mb: 0.5, color: 'text.primary' }}
              >
                 {alert.title}
              </Typography>

              {/* Message */}
              <Typography 
                 variant="body2" 
                 color="text.secondary"
                 sx={{ mb: compact ? 1 : 1.5, lineHeight: 1.4 }}
              >
                 {alert.message}
              </Typography>

              {/* Related Information */}
              {!compact && (alert.relatedMedications || alert.relatedConditions) && (
                 <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                    {alert.relatedMedications?.map((med, index) => (
                       <Chip
                          key={index}
                          label={med}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                       />
                    ))}
                    {alert.relatedConditions?.map((condition, index) => (
                       <Chip
                          key={index}
                          label={condition}
                          size="small"
                          variant="filled"
                          color="secondary"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                       />
                    ))}
                 </Box>
              )}

              {/* Expandable Recommendations */}
              {!compact && alert.recommendedActions && alert.recommendedActions.length > 0 && (
                 <>
                    <Box 
                       display="flex" 
                       alignItems="center" 
                       gap={1} 
                       sx={{ 
                          cursor: 'pointer',
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: expanded ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.04),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          '&:hover': {
                             backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          },
                          transition: 'all 0.2s ease-in-out',
                       }}
                       onClick={() => setExpanded(!expanded)}
                    >
                       <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                          Recommended Actions ({alert.recommendedActions.length})
                       </Typography>
                       <IconButton
                          size="small"
                          sx={{
                             transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                             transition: 'transform 0.2s',
                             color: theme.palette.primary.main,
                             ml: 'auto'
                          }}
                       >
                          <ExpandMoreIcon fontSize="small" />
                       </IconButton>
                    </Box>
                    <Collapse in={expanded}>
                       <Box sx={{ mt: 1, p: 2, backgroundColor: alpha(theme.palette.background.paper, 0.8), borderRadius: 1, border: `1px solid ${theme.palette.divider}` }}>
                          <List dense sx={{ pt: 0 }}>
                             {alert.recommendedActions.map((action, index) => (
                                <ListItem 
                                   key={index} 
                                   sx={{ 
                                      py: 1, 
                                      pl: 0,
                                      borderBottom: index < alert.recommendedActions!.length - 1 ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none'
                                   }}
                                >
                                   <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, width: '100%' }}>
                                      <Box 
                                         sx={{ 
                                            minWidth: 24, 
                                            height: 24, 
                                            borderRadius: '50%', 
                                            backgroundColor: theme.palette.primary.main,
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            mt: 0.25
                                         }}
                                      >
                                         {index + 1}
                                      </Box>
                                      <ListItemText
                                         primary={action}
                                         primaryTypographyProps={{
                                            variant: 'body2',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.5,
                                            color: 'text.primary'
                                         }}
                                      />
                                   </Box>
                                </ListItem>
                             ))}
                          </List>
                       </Box>
                    </Collapse>
                 </>
              )}
           </Box>

           {/* Action Buttons */}
           <Box display="flex" flexDirection="column" gap={0.5}>
              {onAcknowledge && !alert.isRead && (
                 <IconButton
                    size="small"
                    onClick={() => onAcknowledge(alert.id)}
                    sx={{ 
                       color: theme.palette.success.main,
                       '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.1) }
                    }}
                    title="Acknowledge"
                 >
                    <CheckIcon fontSize="small" />
                 </IconButton>
              )}
              {onDismiss && (
                 <IconButton
                    size="small"
                    onClick={() => onDismiss(alert.id)}
                    sx={{ 
                       color: theme.palette.text.secondary,
                       '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) }
                    }}
                    title="Dismiss"
                 >
                    <CloseIcon fontSize="small" />
                 </IconButton>
              )}
           </Box>
        </Box>
      </MainCard>
   );
};

export default AlertCard; 