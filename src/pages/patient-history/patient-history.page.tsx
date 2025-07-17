import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import DocumentationTab from './tabs/documentation-tab';
import DiagnosisTab from './tabs/diagnosis-tab';
import DocumentsTab from './tabs/documents-tab';
import TasksTab from './tabs/tasks-tab';
import SocialInfoTab from './tabs/social-info-tab';
import TreatmentDetailsTab from './tabs/treatment-details-tab';
import ReportsTab from './tabs/reports-tab';
import DiagnosisCodesTab from './tabs/diagnosis-codes-tab';
import { IPages } from '../../types/common.types';

export default function PatientHistoryPage() {
   const [currentTab, setCurrentTab] = useState(0);

   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      event.preventDefault();
      setCurrentTab(newValue);
   };

   return (
      <Box padding={2}>
         <Typography variant='h5' mb={2}>
            {`${IPages.PATIENT_HISTORY.toUpperCase()}`}
         </Typography>

         <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label='Documentation' />
            <Tab label='Diagnosis' />
            <Tab label='Treatment Details' />
            <Tab label='Documents' />
            <Tab label='Tasks' />
            <Tab label='Social Info' />
            <Tab label='Diagnosis Codes' />
            <Tab label='Reports' />
         </Tabs>

         {currentTab === 0 && <DocumentationTab />}
         {currentTab === 1 && <DiagnosisTab />}
         {currentTab === 2 && <TreatmentDetailsTab />}
         {currentTab === 3 && <DocumentsTab />}
         {currentTab === 4 && <TasksTab />}
         {currentTab === 5 && <SocialInfoTab />}
         {currentTab === 6 && <DiagnosisCodesTab />}
         {currentTab === 7 && <ReportsTab />}
      </Box>
   );
}
