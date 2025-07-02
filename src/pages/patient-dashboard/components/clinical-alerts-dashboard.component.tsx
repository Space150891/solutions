import React, { useState } from 'react';
import { Box, Typography, Button, useTheme, alpha } from '@mui/material';
import { Notifications as NotificationsIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { MainCard } from '../../../components/cards/main-card.component';
import { AlertsSummary, AlertCard } from '../../../components/clinical-alerts';
import { mockClinicalAlerts, getAlertsByPatient, getActiveAlerts, getCriticalAlerts } from '../../../components/clinical-alerts/mock-alerts';
import { useNavigate } from 'react-router-dom';
import { ClinicalAlert } from '../../../components/clinical-alerts/types';

const ClinicalAlertsDashboard: React.FC = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const [alerts, setAlerts] = useState<ClinicalAlert[]>(mockClinicalAlerts);

   // Get alerts for current patient (using mock patient ID)
   const patientAlerts = getAlertsByPatient('patient-001').filter(alert => 
      !alerts.find(a => a.id === alert.id)?.isDismissed
   );
   const activeAlerts = getActiveAlerts(patientAlerts);
   const criticalAlerts = getCriticalAlerts(activeAlerts);
   
   // Show only the most critical/recent alerts (max 3)
   const displayAlerts = activeAlerts
      .sort((a, b) => {
         const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
         const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
         if (severityDiff !== 0) return severityDiff;
         return b.timestamp.getTime() - a.timestamp.getTime();
      })
      .slice(0, 3);

   const handleViewAllAlerts = () => {
      // Navigate to the dedicated clinical alerts page
      navigate('/cubex/clinical-alerts');
   };

   const handleDeleteAlert = (alertId: string) => {
      setAlerts(prevAlerts => 
         prevAlerts.map(alert => 
            alert.id === alertId ? { ...alert, isDismissed: true } : alert
         )
      );
   };

   const handleAcknowledgeAlert = (alertId: string) => {
      setAlerts(prevAlerts => 
         prevAlerts.map(alert => 
            alert.id === alertId ? { ...alert, isRead: true } : alert
         )
      );
   };

   if (activeAlerts.length === 0) {
      return (
         <MainCard 
            sx={{ height: '100%' }}
            title="Clinical Alerts"
            secondary={
               <NotificationsIcon sx={{ color: theme.palette.success.main }} />
            }
         >
            <Box 
               display="flex" 
               alignItems="center" 
               justifyContent="center" 
               py={3}
               sx={{
                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                  borderRadius: 1,
                  border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`
               }}
            >
               <Typography variant="body2" color="text.secondary">
                  No active clinical alerts
               </Typography>
            </Box>
         </MainCard>
      );
   }

   return (
      <MainCard 
         sx={{ 
            height: '100%',
            ...(criticalAlerts.length > 0 && {
               border: `2px solid ${alpha(theme.palette.error.main, 0.3)}`,
               backgroundColor: alpha(theme.palette.error.main, 0.02),
            })
         }}
         title="Clinical Alerts"
         secondary={
            <Box display="flex" alignItems="center" gap={1}>
               <NotificationsIcon 
                  sx={{ 
                     color: criticalAlerts.length > 0 
                        ? theme.palette.error.main 
                        : theme.palette.primary.main 
                  }} 
               />
               {activeAlerts.length > displayAlerts.length && (
                  <Button
                     size="small"
                     endIcon={<ArrowForwardIcon />}
                     onClick={handleViewAllAlerts}
                     sx={{ fontSize: '0.75rem' }}
                  >
                     View All
                  </Button>
               )}
            </Box>
         }
      >
         <Box>
            {/* Alert Count Info */}
            {activeAlerts.length > displayAlerts.length && (
               <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  Showing {displayAlerts.length} of {activeAlerts.length} alerts
               </Typography>
            )}
            
            {/* Quick Summary */}
            <AlertsSummary alerts={activeAlerts} compact={true} />
            
            {/* Top Priority Alerts */}
                         <Box sx={{ mt: 2 }}>
                {displayAlerts.map((alert) => (
                   <AlertCard
                      key={alert.id}
                      alert={alert}
                      compact={true}
                      onAcknowledge={(id) => handleAcknowledgeAlert(id)}
                      onDismiss={(id) => handleDeleteAlert(id)}
                   />
                ))}
             </Box>
         </Box>
      </MainCard>
   );
};

export default ClinicalAlertsDashboard; 