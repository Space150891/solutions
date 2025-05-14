import { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { Patient, generateAlerts } from '../mock';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Alert } from './types';

interface PatientAlertsProps {
  patient: Patient;
}

export const PatientAlerts = ({ patient }: PatientAlertsProps) => {
  const theme = useTheme();
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts(patient.id));

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(generateAlerts(patient.id));
    }, 5000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [patient.id]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <MainCard title="Patient Alerts" sx={{ height: '100%' }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {alerts.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.success.main, 0.1),
              p: 2,
              borderRadius: 1,
              height: '100%',
              flexDirection: 'column'
            }}
          >
            <Box component="div" sx={{ color: 'success.main', fontWeight: 500, fontSize: '1.125rem', mb: 1 }}>
              All vitals are within normal range
            </Box>
            <Box component="div" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Patient {patient.name} is stable
            </Box>
          </Box>
        ) : (
          <List sx={{ width: '100%', overflow: 'auto', flexGrow: 1 }}>
            {alerts.map((alert) => (
              <Paper
                key={alert.type}
                elevation={2}
                sx={{
                  mb: 2,
                  bgcolor: alpha(getSeverityColor(alert.severity), 0.05),
                  border: `1px solid ${alpha(getSeverityColor(alert.severity), 0.2)}`,
                  borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
                  borderRadius: 1,
                  animation: alert.severity === 'high' ? 'pulse 2s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: `0 0 0 0 ${alpha(getSeverityColor(alert.severity), 0.7)}`
                    },
                    '70%': {
                      boxShadow: `0 0 0 6px ${alpha(getSeverityColor(alert.severity), 0)}`
                    },
                    '100%': {
                      boxShadow: `0 0 0 0 ${alpha(getSeverityColor(alert.severity), 0)}`
                    }
                  }
                }}
              >
                <ListItem>
                  <ListItemIcon sx={{ color: getSeverityColor(alert.severity) }}>
                    {alert.severity === 'high' ? <ErrorIcon /> : <WarningIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box component="span" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                          {alert.type}
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Chip
                            label={alert.severity.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: alpha(getSeverityColor(alert.severity), 0.2),
                              color: getSeverityColor(alert.severity),
                              fontWeight: 'bold'
                            }}
                          />
                          <Box component="span" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'text.secondary' }}>
                            <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            {getTime()}
                          </Box>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box component="span" sx={{ mt: 0.5, display: 'block' }}>
                        {alert.message}
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Box>
    </MainCard>
  );
};
