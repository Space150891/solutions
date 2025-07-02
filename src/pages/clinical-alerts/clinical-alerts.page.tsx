import React from 'react';
import { Box, Typography } from '@mui/material';
import { ClinicalAlerts } from '../../components/clinical-alerts';
import { IPages } from '../../types/common.types';

export default function ClinicalAlertsPage() {
   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>CLINICAL DECISION SUPPORT ALERTS</Typography>
         </Box>
         <ClinicalAlerts 
            patientId="patient-001"
            showOnlyActive={true}
            onAlertAction={(alertId, action) => {
               console.log(`Alert ${alertId}: ${action}`);
               // In a real app, this would make an API call to update the alert status
            }}
         />
      </Box>
   );
} 