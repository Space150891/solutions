import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tabs, Tab, useTheme, Paper } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { VitalSignChart } from './vital-sign-chart.component';
import { generatePatientVitals, vitalThresholds } from '../mock';

interface VitalMonitoringChartProps {
  patientId: string;
  patientName: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vital-tabpanel-${index}`}
      aria-labelledby={`vital-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export const VitalMonitoringChart = ({ patientId, patientName }: VitalMonitoringChartProps) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [vitals, setVitals] = useState(generatePatientVitals(patientId));
  
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Get fresh data but preserve some points to create realistic trends
      const newVitals = generatePatientVitals(patientId);
      
      // Update only the last few points to simulate real-time updates
      setVitals(prev => {
        const updateLastPoints = (data: typeof prev.heartRate, newData: typeof prev.heartRate) => {
          const updatedData = [...data];
          // Replace only the last 2-3 points to create a smooth transition
          for (let i = 1; i <= 3; i++) {
            if (updatedData.length - i >= 0 && newData.length - i >= 0) {
              updatedData[updatedData.length - i] = newData[newData.length - i];
            }
          }
          // Add a new point
          if (newData.length > 0) {
            updatedData.push(newData[newData.length - 1]);
            // Keep only the last 24 hours of data
            if (updatedData.length > 25) {
              updatedData.shift();
            }
          }
          return updatedData;
        };
        
        return {
          heartRate: updateLastPoints(prev.heartRate, newVitals.heartRate),
          bloodPressureSystolic: updateLastPoints(prev.bloodPressureSystolic, newVitals.bloodPressureSystolic),
          bloodPressureDiastolic: updateLastPoints(prev.bloodPressureDiastolic, newVitals.bloodPressureDiastolic),
          temperature: updateLastPoints(prev.temperature, newVitals.temperature),
          respiratoryRate: updateLastPoints(prev.respiratoryRate, newVitals.respiratoryRate),
          oxygenSaturation: updateLastPoints(prev.oxygenSaturation, newVitals.oxygenSaturation),
        };
      });
    }, 10000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [patientId]);

  return (
    <MainCard sx={{ height: '100%' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Vital Signs Trends - {patientName}
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="vital signs monitoring tabs"
        >
          <Tab label="Heart Rate" />
          <Tab label="Blood Pressure" />
          <Tab label="Temperature" />
          <Tab label="Respiratory Rate" />
          <Tab label="Oxygen Saturation" />
          <Tab label="All Vitals" />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <VitalSignChart 
          title="Heart Rate" 
          data={vitals.heartRate} 
          color={theme.palette.primary.main}
          unit="bpm"
          height={320}
          yaxisMin={vitalThresholds.heartRate.low - 10}
          yaxisMax={vitalThresholds.heartRate.high + 20}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Normal range: {vitalThresholds.heartRate.low}-{vitalThresholds.heartRate.high} bpm
        </Typography>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <VitalSignChart 
              title="Systolic BP" 
              data={vitals.bloodPressureSystolic} 
              color={theme.palette.error.main}
              unit="mmHg"
              height={150}
              yaxisMin={vitalThresholds.bloodPressureSystolic.low - 10}
              yaxisMax={vitalThresholds.bloodPressureSystolic.high + 30}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Normal range: {vitalThresholds.bloodPressureSystolic.low}-{vitalThresholds.bloodPressureSystolic.high} mmHg
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <VitalSignChart 
              title="Diastolic BP" 
              data={vitals.bloodPressureDiastolic} 
              color={theme.palette.secondary.main}
              unit="mmHg"
              height={150}
              yaxisMin={vitalThresholds.bloodPressureDiastolic.low - 10}
              yaxisMax={vitalThresholds.bloodPressureDiastolic.high + 20}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Normal range: {vitalThresholds.bloodPressureDiastolic.low}-{vitalThresholds.bloodPressureDiastolic.high} mmHg
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <VitalSignChart 
          title="Temperature" 
          data={vitals.temperature} 
          color={theme.palette.warning.main}
          unit="°C"
          height={320}
          yaxisMin={vitalThresholds.temperature.low - 1}
          yaxisMax={vitalThresholds.temperature.high + 2}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Normal range: {vitalThresholds.temperature.low}-{vitalThresholds.temperature.high}°C
        </Typography>
      </TabPanel>
      
      <TabPanel value={value} index={3}>
        <VitalSignChart 
          title="Respiratory Rate" 
          data={vitals.respiratoryRate} 
          color={theme.palette.info.main}
          unit="bpm"
          height={320}
          yaxisMin={vitalThresholds.respiratoryRate.low - 4}
          yaxisMax={vitalThresholds.respiratoryRate.high + 8}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Normal range: {vitalThresholds.respiratoryRate.low}-{vitalThresholds.respiratoryRate.high} bpm
        </Typography>
      </TabPanel>
      
      <TabPanel value={value} index={4}>
        <VitalSignChart 
          title="Oxygen Saturation" 
          data={vitals.oxygenSaturation} 
          color={theme.palette.success.main}
          unit="%"
          height={320}
          yaxisMin={85}
          yaxisMax={100}
        />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Normal range: {vitalThresholds.oxygenSaturation.low}-{vitalThresholds.oxygenSaturation.high}%
        </Typography>
      </TabPanel>
      
      <TabPanel value={value} index={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <VitalSignChart 
                title="Heart Rate" 
                data={vitals.heartRate} 
                color={theme.palette.primary.main}
                unit="bpm"
                height={160}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <VitalSignChart 
                title="Systolic BP" 
                data={vitals.bloodPressureSystolic} 
                color={theme.palette.error.main}
                unit="mmHg"
                height={160}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <VitalSignChart 
                title="Temperature" 
                data={vitals.temperature} 
                color={theme.palette.warning.main}
                unit="°C"
                height={160}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 1 }}>
              <VitalSignChart 
                title="Oxygen Saturation" 
                data={vitals.oxygenSaturation} 
                color={theme.palette.success.main}
                unit="%"
                height={160}
              />
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </MainCard>
  );
};
