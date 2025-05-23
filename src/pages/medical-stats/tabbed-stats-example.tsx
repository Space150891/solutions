import { FC, useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { ScrollableTabPanel } from '../../components/common';
import { EnhancedStatsCard } from './enhanced-card-example';

/**
 * Example component demonstrating how to use ScrollableTabPanel for medical stats
 */
export const TabbedStatsExample: FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Example medical data
  const demographicData = [
    { category: 'Age 0-18', value: 234 },
    { category: 'Age 19-35', value: 578 },
    { category: 'Age 36-50', value: 612 },
    { category: 'Age 51-65', value: 487 },
    { category: 'Age 66+', value: 356 }
  ];
  
  const diseaseData = [
    { category: 'Cardiovascular', value: 423 },
    { category: 'Respiratory', value: 318 },
    { category: 'Gastrointestinal', value: 287 },
    { category: 'Neurological', value: 192 },
    { category: 'Musculoskeletal', value: 453 },
    { category: 'Endocrine', value: 236 },
    { category: 'Psychological', value: 184 },
    { category: 'Other', value: 158 }
  ];
  
  const procedureData = [
    { category: 'Surgeries', value: 178 },
    { category: 'Diagnostic Tests', value: 865 },
    { category: 'Consultations', value: 1432 },
    { category: 'Therapy Sessions', value: 547 },
    { category: 'Preventive Care', value: 329 }
  ];

  return (
    <Paper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="Medical statistics tabs">
          <Tab label="Demographics" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Diseases" id="tab-1" aria-controls="tabpanel-1" />
          <Tab label="Procedures" id="tab-2" aria-controls="tabpanel-2" />
        </Tabs>
      </Box>
      
      <ScrollableTabPanel value={currentTab} index={0} maxHeight="400px">
        <EnhancedStatsCard 
          title="Patient Demographics" 
          data={demographicData} 
          maxHeight="300px"
        />
      </ScrollableTabPanel>

      <ScrollableTabPanel value={currentTab} index={1} maxHeight="400px">
        <EnhancedStatsCard 
          title="Disease Distribution" 
          data={diseaseData} 
          maxHeight="300px"
        />
      </ScrollableTabPanel>

      <ScrollableTabPanel value={currentTab} index={2} maxHeight="400px">
        <EnhancedStatsCard 
          title="Procedures Performed" 
          data={procedureData} 
          maxHeight="300px"
        />
      </ScrollableTabPanel>
    </Paper>
  );
};

export default TabbedStatsExample;
