import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { Patient, getCurrentVitals, vitalThresholds } from '../mock';

interface VitalStatProps {
  label: string;
  value: number | string;
  unit: string;
  icon?: React.ReactNode;
  isAlert?: boolean;
  color?: string;
}

const VitalStat = ({ label, value, unit, icon, isAlert = false, color }: VitalStatProps) => {
  const theme = useTheme();
  return (
    <Box sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: isAlert ? `${theme.palette.error.light}20` : theme.palette.background.default,
      borderRadius: 1,
      border: isAlert ? `1px solid ${theme.palette.error.light}` : `1px solid ${theme.palette.divider}`,
      height: '100%',
      boxShadow: isAlert ? 3 : 1,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}
      <Typography variant="h3" color={color || (isAlert ? 'error' : 'primary')} sx={{
        fontWeight: 'bold',
        animation: isAlert ? 'pulse 1.5s infinite' : 'none',
        '@keyframes pulse': {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.7,
          },
          '100%': {
            opacity: 1,
          }
        }
      }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {unit}
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ mt: 1, fontWeight: 'medium' }}>
        {label}
      </Typography>
    </Box>
  );
};

interface PatientVitalsCardProps {
  patient: Patient;
}

export const PatientVitalsCard = ({ patient }: PatientVitalsCardProps) => {
  const theme = useTheme();
  const [vitals, setVitals] = useState(getCurrentVitals(patient.id));

  // Refresh vital signs every 2-3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(getCurrentVitals(patient.id));
    }, 2000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [patient.id]);

  // Determine if values are outside normal range
  const isHeartRateAlert = vitals.heartRate < vitalThresholds.heartRate.low || vitals.heartRate > vitalThresholds.heartRate.high;
  const isBPAlert = vitals.bloodPressureSystolic < vitalThresholds.bloodPressureSystolic.low ||
    vitals.bloodPressureSystolic > vitalThresholds.bloodPressureSystolic.high ||
    vitals.bloodPressureDiastolic < vitalThresholds.bloodPressureDiastolic.low ||
    vitals.bloodPressureDiastolic > vitalThresholds.bloodPressureDiastolic.high;
  const isTempAlert = vitals.temperature < vitalThresholds.temperature.low || vitals.temperature > vitalThresholds.temperature.high;
  const isRespiratoryAlert = vitals.respiratoryRate < vitalThresholds.respiratoryRate.low || vitals.respiratoryRate > vitalThresholds.respiratoryRate.high;
  const isOxygenAlert = vitals.oxygenSaturation < vitalThresholds.oxygenSaturation.low;

  // Status indicator
  const getConditionColor = (condition: Patient['condition']) => {
    switch (condition) {
      case 'Critical': return theme.palette.error.main;
      case 'Serious': return theme.palette.warning.main;
      case 'Fair': return theme.palette.info.main;
      case 'Stable': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <MainCard sx={{
      height: '100%',
      borderLeft: `4px solid ${getConditionColor(patient.condition)}`,
      transition: 'all 0.3s ease-in-out'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: getConditionColor(patient.condition),
              boxShadow: `0 0 8px ${getConditionColor(patient.condition)}`,
              animation: patient.condition === 'Critical' ? 'pulse 1.5s infinite' : 'none',
              '@keyframes pulse': {
                '0%': { boxShadow: `0 0 0 0 ${getConditionColor(patient.condition)}80` },
                '70%': { boxShadow: `0 0 0 6px ${getConditionColor(patient.condition)}00` },
                '100%': { boxShadow: `0 0 0 0 ${getConditionColor(patient.condition)}00` }
              }
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {patient.name}
          </Typography>
        </Box>
        <Chip
          label={patient.condition}
          size="small"
          sx={{
            fontWeight: 'bold',
            bgcolor: getConditionColor(patient.condition),
            color: '#fff'
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Room: <Box component="span" fontWeight="bold" display="inline">{patient.room}</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: <Box component="span" fontWeight="bold" display="inline">{patient.age}</Box>
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Blood Type: <Box component="span" fontWeight="bold" display="inline">{patient.bloodType}</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Doctor: <Box component="span" fontWeight="bold" display="inline">{patient.doctorAssigned}</Box>
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{
        mb: 1.5,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -4,
          left: 0,
          width: '40px',
          height: '3px',
          backgroundColor: getConditionColor(patient.condition),
          borderRadius: '2px'
        }
      }}>
        Real-time Vital Signs
      </Typography>

      <Box sx={{ animation: 'fadeIn 0.5s', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          mb: '8px'
        }}>
          <Box>
            <VitalStat
              label="Heart Rate"
              value={vitals.heartRate}
              unit="bpm"
              isAlert={isHeartRateAlert}
            />
          </Box>
          <Box>
            <VitalStat
              label="Blood Pressure"
              value={`${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`}
              unit="mmHg"
              isAlert={isBPAlert}
            />
          </Box>
          <Box>
            <VitalStat
              label="Temperature"
              value={vitals.temperature}
              unit="°C"
              isAlert={isTempAlert}
            />
          </Box>
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          <Box>
            <VitalStat
              label="Respiratory Rate"
              value={vitals.respiratoryRate}
              unit="bpm"
              isAlert={isRespiratoryAlert}
            />
          </Box>
          <Box>
            <VitalStat
              label="Oxygen Saturation"
              value={vitals.oxygenSaturation}
              unit="%"
              isAlert={isOxygenAlert}
              color={vitals.oxygenSaturation < 90 ? theme.palette.error.main :
                vitals.oxygenSaturation < 95 ? theme.palette.warning.main : theme.palette.success.main}
            />
          </Box>
        </Box>
      </Box>
    </MainCard>
  );
};
