import React, { useState, useMemo } from 'react';
import {
   Box,
   Typography,
   Button,
   Tabs,
   Tab,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Chip,
   Stack,
   useTheme,
   alpha,
   Collapse,
   IconButton,
   Divider,
} from '@mui/material';
import {
   ExpandLess,
   ExpandMore,
   Refresh as RefreshIcon,
   FilterList as FilterIcon,
} from '@mui/icons-material';
import { MainCard } from '../cards/main-card.component';
import AlertCard from './alert-card.component';
import AlertsSummary from './alerts-summary.component';
import { ClinicalAlert, ClinicalAlertsProps } from './types';
import { mockClinicalAlerts, getAlertsByPatient, getActiveAlerts } from './mock-alerts';

const ClinicalAlerts: React.FC<ClinicalAlertsProps> = ({
   patientId,
   showOnlyActive = true,
   maxAlerts,
   alertTypes,
   onAlertAction,
}) => {
   const theme = useTheme();
   const [selectedTab, setSelectedTab] = useState(0);
   const [severityFilter, setSeverityFilter] = useState<ClinicalAlert['severity'] | 'all'>('all');
   const [typeFilter, setTypeFilter] = useState<ClinicalAlert['type'] | 'all'>('all');
   const [showFilters, setShowFilters] = useState(false);
   const [alerts, setAlerts] = useState<ClinicalAlert[]>(mockClinicalAlerts);

   // Filter alerts based on props and state
   const filteredAlerts = useMemo(() => {
      let filtered = alerts;

      // Filter by patient if specified
      if (patientId) {
         filtered = getAlertsByPatient(patientId);
      }

      // Filter by active status
      if (showOnlyActive) {
         filtered = getActiveAlerts(filtered);
      }

      // Filter by alert types if specified
      if (alertTypes && alertTypes.length > 0) {
         filtered = filtered.filter(alert => alertTypes.includes(alert.type));
      }

      // Filter by severity
      if (severityFilter !== 'all') {
         filtered = filtered.filter(alert => alert.severity === severityFilter);
      }

      // Filter by type
      if (typeFilter !== 'all') {
         filtered = filtered.filter(alert => alert.type === typeFilter);
      }

      // Sort by severity and timestamp
      filtered.sort((a, b) => {
         const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
         const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
         if (severityDiff !== 0) return severityDiff;
         return b.timestamp.getTime() - a.timestamp.getTime();
      });

      // Limit results if maxAlerts is specified
      if (maxAlerts) {
         filtered = filtered.slice(0, maxAlerts);
      }

      return filtered;
   }, [alerts, patientId, showOnlyActive, alertTypes, severityFilter, typeFilter, maxAlerts]);

   // Separate alerts by read status for tabs
   const unreadAlerts = filteredAlerts.filter(alert => !alert.isRead);
   const readAlerts = filteredAlerts.filter(alert => alert.isRead);
   const criticalAlerts = filteredAlerts.filter(alert => alert.severity === 'critical');

   const handleAlertAction = (alertId: string, action: 'dismiss' | 'acknowledge' | 'snooze') => {
      setAlerts(prevAlerts => 
         prevAlerts.map(alert => {
            if (alert.id === alertId) {
               switch (action) {
                  case 'dismiss':
                     return { ...alert, isDismissed: true };
                  case 'acknowledge':
                     return { ...alert, isRead: true };
                  case 'snooze':
                     // For now, just mark as read
                     return { ...alert, isRead: true };
                  default:
                     return alert;
               }
            }
            return alert;
         })
      );

      // Call parent callback if provided
      if (onAlertAction) {
         onAlertAction(alertId, action);
      }
   };

   const handleDeleteAlert = (alertId: string) => {
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
      
      // Call parent callback if provided
      if (onAlertAction) {
         onAlertAction(alertId, 'dismiss');
      }
   };

   const handleRefresh = () => {
      // In a real app, this would fetch fresh data
      console.log('Refreshing alerts...');
   };

   const getTabAlerts = (tabIndex: number) => {
      switch (tabIndex) {
         case 0: // All
            return filteredAlerts;
         case 1: // Unread
            return unreadAlerts;
         case 2: // Critical
            return criticalAlerts;
         default:
            return filteredAlerts;
      }
   };

   const currentAlerts = getTabAlerts(selectedTab);

   return (
      <Box>
         {/* Summary Card */}
         <AlertsSummary alerts={filteredAlerts} compact={false} />

         {/* Main Alerts Section */}
         <MainCard
            sx={{ mt: 2 }}
            title="Clinical Alerts"
            secondary={
               <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                     size="small"
                     onClick={() => setShowFilters(!showFilters)}
                     sx={{ 
                        color: showFilters ? theme.palette.primary.main : 'inherit',
                        backgroundColor: showFilters ? alpha(theme.palette.primary.main, 0.1) : 'transparent'
                     }}
                  >
                     <FilterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={handleRefresh}>
                     <RefreshIcon fontSize="small" />
                  </IconButton>
               </Box>
            }
         >
            {/* Filters */}
            <Collapse in={showFilters}>
               <Box sx={{ mb: 2, p: 2, backgroundColor: alpha(theme.palette.primary.main, 0.05), borderRadius: 1 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                     <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Severity</InputLabel>
                        <Select
                           value={severityFilter}
                           label="Severity"
                           onChange={(e) => setSeverityFilter(e.target.value as ClinicalAlert['severity'] | 'all')}
                        >
                           <MenuItem value="all">All Severities</MenuItem>
                           <MenuItem value="critical">Critical</MenuItem>
                           <MenuItem value="high">High</MenuItem>
                           <MenuItem value="medium">Medium</MenuItem>
                           <MenuItem value="low">Low</MenuItem>
                        </Select>
                     </FormControl>
                     <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                           value={typeFilter}
                           label="Type"
                           onChange={(e) => setTypeFilter(e.target.value as ClinicalAlert['type'] | 'all')}
                        >
                           <MenuItem value="all">All Types</MenuItem>
                           <MenuItem value="drug-interaction">Drug Interaction</MenuItem>
                           <MenuItem value="preventive-care">Preventive Care</MenuItem>
                           <MenuItem value="allergy">Allergy</MenuItem>
                           <MenuItem value="vital-signs">Vital Signs</MenuItem>
                           <MenuItem value="lab-result">Lab Result</MenuItem>
                           <MenuItem value="medication-reminder">Medication Reminder</MenuItem>
                        </Select>
                     </FormControl>
                  </Stack>
               </Box>
               <Divider sx={{ mb: 2 }} />
            </Collapse>

            {/* Tabs */}
            <Tabs
               value={selectedTab}
               onChange={(_, newValue) => setSelectedTab(newValue)}
               sx={{ mb: 2 }}
            >
               <Tab 
                  label={`All (${filteredAlerts.length})`}
               />
               <Tab 
                  label={`Unread (${unreadAlerts.length})`}
                  sx={{ 
                     color: unreadAlerts.length > 0 ? theme.palette.primary.main : 'inherit'
                  }}
               />
               <Tab 
                  label={`Critical (${criticalAlerts.length})`}
                  sx={{ 
                     color: criticalAlerts.length > 0 ? theme.palette.error.main : 'inherit'
                  }}
               />
            </Tabs>

            {/* Alerts List */}
            <Box>
               {currentAlerts.length === 0 ? (
                  <Box 
                     display="flex" 
                     alignItems="center" 
                     justifyContent="center" 
                     py={4}
                     sx={{ 
                        backgroundColor: alpha(theme.palette.success.main, 0.05),
                        borderRadius: 1,
                        border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`
                     }}
                  >
                     <Typography variant="body1" color="text.secondary">
                        No alerts to display
                     </Typography>
                  </Box>
               ) : (
                  currentAlerts.map((alert) => (
                     <AlertCard
                        key={alert.id}
                        alert={alert}
                        onDismiss={(id) => handleDeleteAlert(id)}
                        onAcknowledge={(id) => handleAlertAction(id, 'acknowledge')}
                        compact={false}
                     />
                  ))
               )}
            </Box>
         </MainCard>
      </Box>
   );
};

export default ClinicalAlerts; 