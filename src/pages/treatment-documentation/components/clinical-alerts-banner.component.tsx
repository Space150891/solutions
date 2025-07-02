import React, { useState } from 'react';
import {
   Box,
   Alert,
   AlertTitle,
   Collapse,
   IconButton,
   Typography,
   Chip,
   Stack,
   useTheme,
   alpha,
   Button,
} from '@mui/material';
import {
   ExpandMore as ExpandMoreIcon,
   Close as CloseIcon,
   Warning as WarningIcon,
   Error as ErrorIcon,
   MedicalServices as MedicalIcon,
} from '@mui/icons-material';
import { ClinicalAlert } from '../../../components/clinical-alerts/types';
import { mockClinicalAlerts, getAlertsByPatient, getCriticalAlerts, getActiveAlerts } from '../../../components/clinical-alerts/mock-alerts';

const ClinicalAlertsBanner: React.FC = () => {
   const theme = useTheme();
   const [expanded, setExpanded] = useState(false);
   const [dismissed, setDismissed] = useState<string[]>([]);

   // Get critical and high-priority alerts for current patient
   const patientAlerts = getAlertsByPatient('patient-001').filter(alert => !dismissed.includes(alert.id));
   const activeAlerts = getActiveAlerts(patientAlerts);
   const criticalAlerts = getCriticalAlerts(activeAlerts);
   const highPriorityAlerts = activeAlerts.filter(alert => alert.severity === 'high');
   
   // Show critical and high alerts that haven't been dismissed
   const displayAlerts = [...criticalAlerts, ...highPriorityAlerts]
      .filter(alert => !dismissed.includes(alert.id))
      .slice(0, 5); // Limit to 5 most important alerts

   const handleDismiss = (alertId: string) => {
      setDismissed(prev => [...prev, alertId]);
   };

   const handleDismissAll = () => {
      setDismissed(prev => [...prev, ...displayAlerts.map(alert => alert.id)]);
   };

   if (displayAlerts.length === 0) {
      return null;
   }

   const getSeverityColor = (severity: ClinicalAlert['severity']) => {
      switch (severity) {
         case 'critical':
            return 'error';
         case 'high':
            return 'warning';
         default:
            return 'info';
      }
   };

   const getSeverityIcon = (severity: ClinicalAlert['severity']) => {
      switch (severity) {
         case 'critical':
            return <ErrorIcon />;
         case 'high':
            return <WarningIcon />;
         default:
            return <MedicalIcon />;
      }
   };

   const primaryAlert = displayAlerts[0];
   const additionalAlerts = displayAlerts.slice(1);

   return (
      <Box sx={{ mb: 2 }}>
         <Alert
            severity={getSeverityColor(primaryAlert.severity)}
            icon={getSeverityIcon(primaryAlert.severity)}
            sx={{
               '& .MuiAlert-message': { width: '100%' },
               backgroundColor: alpha(
                  primaryAlert.severity === 'critical' 
                     ? theme.palette.error.main 
                     : theme.palette.warning.main, 
                  0.1
               ),
               border: `1px solid ${alpha(
                  primaryAlert.severity === 'critical' 
                     ? theme.palette.error.main 
                     : theme.palette.warning.main, 
                  0.3
               )}`,
            }}
            action={
               <Box display="flex" alignItems="center" gap={1}>
                  {additionalAlerts.length > 0 && (
                     <IconButton
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        sx={{
                           transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                           transition: 'transform 0.2s',
                        }}
                     >
                        <ExpandMoreIcon />
                     </IconButton>
                  )}
                  <Button
                     size="small"
                     onClick={handleDismissAll}
                     sx={{ fontSize: '0.75rem', minWidth: 'auto' }}
                  >
                     Dismiss All
                  </Button>
                  <IconButton
                     size="small"
                     onClick={() => handleDismiss(primaryAlert.id)}
                  >
                     <CloseIcon fontSize="small" />
                  </IconButton>
               </Box>
            }
         >
            <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
               {primaryAlert.title}
               <Chip
                  label={primaryAlert.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: '0.7rem' }}
               />
               {additionalAlerts.length > 0 && (
                  <Chip
                     label={`+${additionalAlerts.length} more`}
                     size="small"
                     color="primary"
                     sx={{ height: 20, fontSize: '0.7rem' }}
                  />
               )}
            </AlertTitle>
            
            <Typography variant="body2" sx={{ mb: 1 }}>
               {primaryAlert.message}
            </Typography>

            {primaryAlert.relatedMedications && primaryAlert.relatedMedications.length > 0 && (
               <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                     Related Medications:
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ display: 'inline-flex' }}>
                     {primaryAlert.relatedMedications.map((med, index) => (
                        <Chip
                           key={index}
                           label={med}
                           size="small"
                           variant="outlined"
                           sx={{ height: 18, fontSize: '0.65rem' }}
                        />
                     ))}
                  </Stack>
               </Box>
            )}

            {primaryAlert.recommendedActions && primaryAlert.recommendedActions.length > 0 && (
               <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                     Immediate Actions Required:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', mt: 0.5 }}>
                     {primaryAlert.recommendedActions[0]}
                  </Typography>
               </Box>
            )}

            {/* Additional Alerts */}
            <Collapse in={expanded}>
               <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                  {additionalAlerts.map((alert) => (
                     <Box key={alert.id} sx={{ mb: 1.5, pb: 1.5, borderBottom: `1px dashed ${alpha(theme.palette.divider, 0.5)}` }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                           <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                 {alert.title}
                              </Typography>
                              <Chip
                                 label={alert.severity.toUpperCase()}
                                 size="small"
                                 color={getSeverityColor(alert.severity)}
                                 sx={{ height: 18, fontSize: '0.65rem' }}
                              />
                           </Box>
                           <IconButton
                              size="small"
                              onClick={() => handleDismiss(alert.id)}
                           >
                              <CloseIcon fontSize="small" />
                           </IconButton>
                        </Box>
                        <Typography variant="body2" fontSize="0.8rem" color="text.secondary">
                           {alert.message}
                        </Typography>
                        {alert.relatedMedications && alert.relatedMedications.length > 0 && (
                           <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                              {alert.relatedMedications.map((med, index) => (
                                 <Chip
                                    key={index}
                                    label={med}
                                    size="small"
                                    variant="outlined"
                                    sx={{ height: 16, fontSize: '0.6rem' }}
                                 />
                              ))}
                           </Stack>
                        )}
                     </Box>
                  ))}
               </Box>
            </Collapse>
         </Alert>
      </Box>
   );
};

export default ClinicalAlertsBanner; 