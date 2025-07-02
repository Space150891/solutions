import React from 'react';
import {
   Box,
   Typography,
   Chip,
   useTheme,
   alpha,
   Stack,
   Divider,
} from '@mui/material';
import {
   Warning as WarningIcon,
   Error as ErrorIcon,
   Info as InfoIcon,
   CheckCircle as CheckIcon,
   NotificationsActive as ActiveIcon,
} from '@mui/icons-material';
import { MainCard } from '../cards/main-card.component';
import { ClinicalAlert, AlertSummaryProps } from './types';

const AlertsSummary: React.FC<AlertSummaryProps> = ({ alerts, compact = false }) => {
   const theme = useTheme();

   const getSeverityCounts = () => {
      const counts = {
         critical: 0,
         high: 0,
         medium: 0,
         low: 0,
      };

      alerts.forEach(alert => {
         if (!alert.isDismissed) {
            counts[alert.severity]++;
         }
      });

      return counts;
   };

   const getTypeCounts = () => {
      const counts: Record<ClinicalAlert['type'], number> = {
         'drug-interaction': 0,
         'preventive-care': 0,
         'allergy': 0,
         'vital-signs': 0,
         'lab-result': 0,
         'medication-reminder': 0,
      };

      alerts.forEach(alert => {
         if (!alert.isDismissed) {
            counts[alert.type]++;
         }
      });

      return counts;
   };

   const severityCounts = getSeverityCounts();
   const typeCounts = getTypeCounts();
   const totalActive = Object.values(severityCounts).reduce((sum, count) => sum + count, 0);
   const unreadCount = alerts.filter(alert => !alert.isRead && !alert.isDismissed).length;

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
      const iconProps = { sx: { color, fontSize: 16 } };
      
      switch (severity) {
         case 'critical':
            return <ErrorIcon {...iconProps} />;
         case 'high':
            return <WarningIcon {...iconProps} />;
         case 'medium':
            return <InfoIcon {...iconProps} />;
         case 'low':
            return <CheckIcon {...iconProps} />;
         default:
            return <InfoIcon {...iconProps} />;
      }
   };

   const formatTypeLabel = (type: ClinicalAlert['type']) => {
      return type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
   };

   if (totalActive === 0) {
      return (
         <MainCard
            title={compact ? undefined : "Clinical Alerts"}
            sx={{
               backgroundColor: alpha(theme.palette.success.main, 0.05),
               border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            }}
            contentSX={{ p: compact ? 2 : 2.5 }}
         >
            <Box display="flex" alignItems="center" gap={1.5}>
               <CheckIcon sx={{ color: theme.palette.success.main, fontSize: 24 }} />
               <Typography variant="body1" color="text.secondary">
                  No active clinical alerts
               </Typography>
            </Box>
         </MainCard>
      );
   }

   return (
      <MainCard
         title={compact ? undefined : "Clinical Alerts Summary"}
         sx={{
            backgroundColor: severityCounts.critical > 0 
               ? alpha(theme.palette.error.main, 0.05)
               : severityCounts.high > 0
               ? alpha(theme.palette.warning.main, 0.05)
               : alpha(theme.palette.info.main, 0.05),
            border: `2px solid ${
               severityCounts.critical > 0 
                  ? alpha(theme.palette.error.main, 0.3)
                  : severityCounts.high > 0
                  ? alpha(theme.palette.warning.main, 0.3)
                  : alpha(theme.palette.info.main, 0.3)
            }`,
         }}
         contentSX={{ p: compact ? 2 : 2.5 }}
      >
         <Box>
            {/* Header Stats */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
               <Box display="flex" alignItems="center" gap={1}>
                  <ActiveIcon 
                     sx={{ 
                        color: severityCounts.critical > 0 ? theme.palette.error.main : theme.palette.primary.main,
                        fontSize: 24 
                     }} 
                  />
                  <Typography variant="h6" fontWeight={600}>
                     {totalActive} Active Alert{totalActive !== 1 ? 's' : ''}
                  </Typography>
               </Box>
               {unreadCount > 0 && (
                  <Chip
                     label={`${unreadCount} Unread`}
                     size="small"
                     color="primary"
                     sx={{ fontWeight: 600 }}
                  />
               )}
            </Box>

            {/* Severity Breakdown */}
            <Box mb={compact ? 1.5 : 2}>
               <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  By Severity
               </Typography>
               <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {Object.entries(severityCounts).map(([severity, count]) => {
                     if (count === 0) return null;
                     return (
                        <Chip
                           key={severity}
                           icon={getSeverityIcon(severity as ClinicalAlert['severity'])}
                           label={`${count} ${severity.charAt(0).toUpperCase() + severity.slice(1)}`}
                           size="small"
                           sx={{
                              backgroundColor: alpha(getSeverityColor(severity as ClinicalAlert['severity']), 0.1),
                              color: getSeverityColor(severity as ClinicalAlert['severity']),
                              fontWeight: 600,
                              '& .MuiChip-icon': {
                                 color: getSeverityColor(severity as ClinicalAlert['severity']),
                              }
                           }}
                        />
                     );
                  })}
               </Stack>
            </Box>

            {!compact && (
               <>
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Type Breakdown */}
                  <Box>
                     <Typography variant="subtitle2" color="text.secondary" mb={1}>
                        By Type
                     </Typography>
                     <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {Object.entries(typeCounts).map(([type, count]) => {
                           if (count === 0) return null;
                           return (
                              <Chip
                                 key={type}
                                 label={`${count} ${formatTypeLabel(type as ClinicalAlert['type'])}`}
                                 size="small"
                                 variant="outlined"
                                 sx={{ 
                                    fontSize: '0.75rem',
                                    height: 24,
                                 }}
                              />
                           );
                        })}
                     </Stack>
                  </Box>
               </>
            )}
         </Box>
      </MainCard>
   );
};

export default AlertsSummary; 