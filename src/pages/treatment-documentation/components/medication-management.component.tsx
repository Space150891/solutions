import { 
  Box, 
  Typography, 
  Button, 
  Divider, 
  IconButton, 
  Chip, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MedicationIcon from '@mui/icons-material/Medication';
import InfoIcon from '@mui/icons-material/Info';
import { medicationInventoryItemsMock } from '../../medication/medication-inventory/medication-inventory.mock';

// Define the medication in treatment type
export interface TreatmentMedication {
  id: number;
  medicationId: number;
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
  form: string;
}

const MedicationManagement: React.FC = () => {
  const theme = useTheme();
  
  // State for treatment medications
  const [medications, setMedications] = useState<TreatmentMedication[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<typeof medicationInventoryItemsMock[0] | null>(null);
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [form, setForm] = useState<string>('tablet');
  const [searchTerm, setSearchTerm] = useState('');

  const forms = ['tablet', 'capsule', 'pill', 'liquid', 'injection', 'topical', 'inhaler', 'drops'];

  const filteredInventory = medicationInventoryItemsMock.filter(
    med => med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMedication(null);
    setDosage('');
    setFrequency('');
    setNotes('');
    setForm('tablet');
  };

  const handleSelectInventoryItem = (item: typeof medicationInventoryItemsMock[0]) => {
    setSelectedMedication(item);
  };

  const handleAddMedication = () => {
    if (!selectedMedication) return;
    
    const newMedication: TreatmentMedication = {
      id: Date.now(),
      medicationId: selectedMedication.id,
      name: selectedMedication.name,
      dosage: dosage,
      frequency: frequency,
      notes: notes,
      form: form
    };
    
    setMedications([...medications, newMedication]);
    handleCloseDialog();
  };

  const handleRemoveMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <Box>
      {/* Medication Selection Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#fff',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === 'dark' ? '#111' : '#f8f8f8' 
        }}>
          Add Medication from Inventory
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Search medications"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputLabel sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  <MedicationIcon fontSize="small" />
                </InputLabel>
              )
            }}
          />
          
          <TableContainer 
            component={Paper} 
            sx={{ 
              mb: 3,
              bgcolor: theme.palette.mode === 'dark' ? '#111' : '#fff',
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Prescription</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No medications found</TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => (
                    <TableRow 
                      key={item.id}
                      selected={selectedMedication?.id === item.id}
                      onClick={() => handleSelectInventoryItem(item)}
                      hover
                      sx={{ 
                        cursor: 'pointer',
                        bgcolor: selectedMedication?.id === item.id ? 
                          (theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.16)' : 'rgba(33, 150, 243, 0.08)') : 
                          'inherit'
                      }}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.prescription}</TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant={selectedMedication?.id === item.id ? "contained" : "outlined"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectInventoryItem(item);
                          }}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedMedication && (
            <Box sx={{ 
              p: 2, 
              border: `1px solid ${theme.palette.divider}`, 
              borderRadius: 1,
              bgcolor: theme.palette.mode === 'dark' ? '#111' : '#f8f8f8'
            }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="500">
                Configure {selectedMedication.name}
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Dosage"
                  variant="outlined"
                  fullWidth
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 200mg"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'
                    }
                  }}
                />
                
                <TextField
                  label="Frequency"
                  variant="outlined"
                  fullWidth
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g., 3 times daily"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'
                    }
                  }}
                />
                
                <FormControl fullWidth>
                  <InputLabel>Form</InputLabel>
                  <Select
                    value={form}
                    label="Form"
                    onChange={(e) => setForm(e.target.value)}
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'
                    }}
                  >
                    {forms.map((formOption) => (
                      <MenuItem key={formOption} value={formOption}>
                        {formOption.charAt(0).toUpperCase() + formOption.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Take with food"
                  multiline
                  rows={2}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'
                    }
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
          <Button 
            onClick={handleAddMedication}
            variant="contained"
            disabled={!selectedMedication || !dosage || !frequency}
          >
            Add to Treatment
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Current Medications List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="500">
            Current Medications
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            onClick={handleOpenDialog}
            sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? '#4caf50' : theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? '#45a049' : theme.palette.primary.dark,
              }
            }}
          >
            ADD MEDICATION
          </Button>
        </Box>
        
        <Divider />
        
        {medications.length === 0 ? (
          <Box sx={{ 
            py: 8, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary'
          }}>
            <MedicationIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="body1" fontWeight="500" sx={{ mb: 1 }}>
              No medications added
            </Typography>
            <Typography variant="body2">
              Click "ADD MEDICATION" to select from inventory
            </Typography>
          </Box>
        ) : (
          <Box>
            {medications.map((med) => (
              <Box 
                key={med.id}
                sx={{ 
                  p: 2, 
                  mb: 1.5, 
                  borderRadius: 1,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f9f9f9',
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle1" fontWeight="500">
                      {med.name}
                    </Typography>
                    <Chip 
                      label={med.form} 
                      size="small" 
                      sx={{ 
                        ml: 1, 
                        height: 20, 
                        fontSize: '0.7rem', 
                        bgcolor: theme.palette.mode === 'dark' ? '#4caf5070' : theme.palette.primary.light,
                        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.contrastText
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {med.dosage} · {med.frequency}
                  </Typography>
                  {med.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
                      Note: {med.notes}
                    </Typography>
                  )}
                </Box>
                <Tooltip title="Remove medication">
                  <IconButton color="error" size="small" onClick={() => handleRemoveMedication(med.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Box>
        )}
        
        <Box sx={{
          p: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.15)' : 'rgba(33, 150, 243, 0.08)',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          <InfoIcon sx={{ color: theme.palette.info.main, mr: 1 }} />
          <Typography variant="body2">
            Medications added to the treatment plan will be tracked in the patient's medication history.
          </Typography>
        </Box>
        
        <Typography variant="caption" color="text.secondary">
          Note: All medications added here must be properly documented in the patient's medical record.
        </Typography>
      </Box>
    </Box>
  );
};

export default MedicationManagement;
