import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import CaseList from './components/case-list.component';
import CaseDetail from './components/case-detail.component';
import InsuranceList from './components/insurance-list.component';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentCase } from '../../store/slices/caseManagementSlice';
import { useThemeContext } from '../../providers/theme-context.provider';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`case-management-tabpanel-${index}`}
      aria-labelledby={`case-management-tab-${index}`}
      style={{ height: '100%', overflow: 'auto' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `case-management-tab-${index}`,
    'aria-controls': `case-management-tabpanel-${index}`,
  };
}

export default function CaseManagementPage() {
  const [tabValue, setTabValue] = useState(0);
  const { currentCase } = useAppSelector(state => state.caseManagement);
  const dispatch = useAppDispatch();
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Clear current case when switching to insurance tab
    if (newValue === 1) {
      dispatch(setCurrentCase(null));
    }
  };

  return (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h4" component="h1" sx={{ p: 2 }}>
          Case & Insurance Management
        </Typography>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              '&.Mui-selected': {
                color: isDarkMode ? '#90caf9' : '#1976d2',
              },
            },
          }}
        >
          <Tab label="Cases" {...a11yProps(0)} />
          <Tab label="Insurance" {...a11yProps(1)} />
        </Tabs>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', height: '100%', gap: 2 }}>
            <Box sx={{ width: '40%', height: '100%' }}>
              <CaseList />
            </Box>
            <Box sx={{ width: '60%', height: '100%' }}>
              {currentCase ? (
                <CaseDetail />
              ) : (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%',
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" color="text.secondary">
                    Select a case to view details
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <InsuranceList />
        </TabPanel>
      </Box>
    </Box>
  );
} 