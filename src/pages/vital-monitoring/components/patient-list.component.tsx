import { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  Paper
} from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { Patient, patients } from '../mock';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { alpha } from '@mui/material/styles';

interface PatientListProps {
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
}

export const PatientList = ({ selectedPatientId, onSelectPatient }: PatientListProps) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <MainCard sx={{ height: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Monitored Patients
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <List component="nav" sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'auto',
        maxHeight: 'calc(100vh - 280px)'
      }}>
        {filteredPatients.map((patient) => (
          <Paper
            key={patient.id}
            elevation={selectedPatientId === patient.id ? 3 : 1}
            sx={{
              mb: 1,
              border: selectedPatientId === patient.id ? `1px solid ${theme.palette.primary.main}` : 'none',
              borderLeft: `4px solid ${getConditionColor(patient.condition)}`,
              bgcolor: selectedPatientId === patient.id ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
            }}
          >
            <ListItemButton
              selected={selectedPatientId === patient.id}
              onClick={() => onSelectPatient(patient.id)}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: 'transparent'
                }
              }}
            >
              <Box sx={{ mr: 1.5, color: getConditionColor(patient.condition) }}>
                <PersonIcon />
              </Box>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={selectedPatientId === patient.id ? 'bold' : 'normal'} component="span">
                    {patient.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Box component="span" display="block">
                      Room: {patient.room}
                    </Box>
                    <Box component="span" display="block">
                      Age: {patient.age}, {patient.gender}
                    </Box>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={patient.condition}
                  size="small"
                  sx={{
                    bgcolor: alpha(getConditionColor(patient.condition), 0.1),
                    color: getConditionColor(patient.condition),
                    fontWeight: 'medium'
                  }}
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          </Paper>
        ))}
        {filteredPatients.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No patients found matching "{searchTerm}"
            </Typography>
          </Box>
        )}
      </List>
    </MainCard>
  );
};
