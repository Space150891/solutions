import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  Box,
  Chip,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Search,
  Person,
  PersonAdd,
  Close,
} from '@mui/icons-material';

// Mock patient data
const mockPatients = [
  {
    id: 'pat-1',
    name: 'John Smith',
    dob: '1985-03-15',
    age: '39',
    gender: 'Male',
    diagnosis: 'Hypertension',
    lastVisit: '2024-01-15',
  },
  {
    id: 'pat-2',
    name: 'Sarah Johnson',
    dob: '1992-07-22',
    age: '32',
    gender: 'Female',
    diagnosis: 'Diabetes Type 2',
    lastVisit: '2024-01-20',
  },
  {
    id: 'pat-3',
    name: 'Michael Chen',
    dob: '1978-11-08',
    age: '45',
    gender: 'Male',
    diagnosis: 'Cardiac Arrhythmia',
    lastVisit: '2024-01-18',
  },
  {
    id: 'pat-4',
    name: 'Emily Davis',
    dob: '1990-05-12',
    age: '34',
    gender: 'Female',
    diagnosis: 'Anxiety Disorder',
    lastVisit: '2024-01-22',
  },
  {
    id: 'pat-5',
    name: 'Robert Wilson',
    dob: '1965-09-30',
    age: '58',
    gender: 'Male',
    diagnosis: 'Chronic Back Pain',
    lastVisit: '2024-01-16',
  },
  {
    id: 'pat-6',
    name: 'Lisa Rodriguez',
    dob: '1988-12-05',
    age: '35',
    gender: 'Female',
    diagnosis: 'Asthma',
    lastVisit: '2024-01-21',
  },
  {
    id: 'pat-7',
    name: 'David Martinez',
    dob: '1982-04-18',
    age: '42',
    gender: 'Male',
    diagnosis: 'Sleep Apnea',
    lastVisit: '2024-01-19',
  },
  {
    id: 'pat-8',
    name: 'Jennifer Thompson',
    dob: '1995-08-14',
    age: '29',
    gender: 'Female',
    diagnosis: 'Migraine',
    lastVisit: '2024-01-23',
  },
];

interface PatientSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectPatient: (patient: { id: string; name: string; dob: string; age: string }) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({
  open,
  onClose,
  onSelectPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Filter patients based on search term
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPatient = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient.id);
  };

  const handleConfirmSelection = () => {
    const patient = mockPatients.find(p => p.id === selectedPatient);
    if (patient) {
      onSelectPatient({
        id: patient.id,
        name: patient.name,
        dob: patient.dob,
        age: patient.age,
      });
    }
    onClose();
  };

  const handleCancel = () => {
    setSelectedPatient(null);
    setSearchTerm('');
    onClose();
  };

  // Function to get avatar color based on gender
  const getAvatarColor = (gender: string) => {
    return gender === 'Male' ? '#1976d2' : '#d32f2f';
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: 700,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person color="primary" />
          <Typography variant="h6">Select Patient</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {/* Search Field */}
        <TextField
          fullWidth
          placeholder="Search patients by name or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Patient List */}
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {filteredPatients.map((patient, index) => (
              <React.Fragment key={patient.id}>
                <ListItemButton
                  selected={selectedPatient === patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  sx={{
                    py: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.main',
                      },
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: getAvatarColor(patient.gender),
                        width: 48,
                        height: 48,
                      }}
                    >
                      {patient.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {patient.name}
                        </Typography>
                        <Chip
                          label={patient.gender}
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            backgroundColor: getAvatarColor(patient.gender),
                            color: 'white',
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Age:</strong> {patient.age} • <strong>DOB:</strong> {formatDate(patient.dob)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Diagnosis:</strong> {patient.diagnosis}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Last Visit:</strong> {formatDate(patient.lastVisit)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
                {index < filteredPatients.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* No results message */}
        {filteredPatients.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <Person sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No patients found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search terms
            </Typography>
          </Box>
        )}

        {/* Selected Patient Summary */}
        {selectedPatient && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Patient
            </Typography>
            {(() => {
              const patient = mockPatients.find(p => p.id === selectedPatient);
              return patient ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: getAvatarColor(patient.gender) }}>
                    {patient.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {patient.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {patient.age} years old • {patient.diagnosis}
                    </Typography>
                  </Box>
                </Box>
              ) : null;
            })()}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} startIcon={<Close />}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirmSelection}
          variant="contained"
          disabled={!selectedPatient}
          startIcon={<PersonAdd />}
        >
          Select Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientSelector; 