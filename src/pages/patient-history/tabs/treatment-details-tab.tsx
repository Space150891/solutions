import {
   Box,
   Typography,
   TextField,
   Button,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Stack,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   IconButton,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Chip,
   Autocomplete,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory, updateTreatmentDetail, removeInfFromHistory } from '../../../store/slices/patientHistorySlice';
import { TreatmentDetail, Diagnosis } from '../../../store/slices/types/patientHistoryTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TreatmentDetailsTab() {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [startDate, setStartDate] = useState<Date | null>(new Date());
   const [endDate, setEndDate] = useState<Date | null>(null);
   const [provider, setProvider] = useState('');
   const [status, setStatus] = useState<'planned' | 'in-progress' | 'completed' | 'discontinued'>('planned');
   const [notes, setNotes] = useState('');
   const [effectiveness, setEffectiveness] = useState<'poor' | 'fair' | 'good' | 'excellent' | ''>('');
   const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [currentTreatment, setCurrentTreatment] = useState<TreatmentDetail | null>(null);
   
   const dispatch = useAppDispatch();
   const treatmentDetails = useAppSelector((state) => state.patientHistory.treatmentDetails);
   const diagnoses = useAppSelector((state) => state.patientHistory.diagnosis);

   const handleAddTreatment = () => {
      if (name.trim() && selectedDiagnosis) {
         const newTreatment: TreatmentDetail = {
            id: Math.random().toString(36).substring(2, 15),
            diagnosisId: selectedDiagnosis.id,
            name,
            description,
            startDate: startDate ? startDate.toISOString() : new Date().toISOString(),
            endDate: endDate ? endDate.toISOString() : undefined,
            provider,
            status,
            notes,
            effectiveness: effectiveness || undefined,
         };

         dispatch(addInfForHistory({ type: 'treatmentDetails', data: newTreatment }));

         // Reset form
         setName('');
         setDescription('');
         setStartDate(new Date());
         setEndDate(null);
         setProvider('');
         setStatus('planned');
         setNotes('');
         setEffectiveness('');
         setSelectedDiagnosis(null);
      }
   };

   const handleDeleteTreatment = (id: string) => {
      dispatch(removeInfFromHistory({ type: 'treatmentDetails', id }));
   };

   const handleEditClick = (treatment: TreatmentDetail) => {
      setCurrentTreatment(treatment);
      setName(treatment.name);
      setDescription(treatment.description);
      setStartDate(treatment.startDate ? new Date(treatment.startDate) : null);
      setEndDate(treatment.endDate ? new Date(treatment.endDate) : null);
      setProvider(treatment.provider);
      setStatus(treatment.status);
      setNotes(treatment.notes || '');
      setEffectiveness(treatment.effectiveness || '');
      
      const diagnosisForTreatment = diagnoses.find(d => d.id === treatment.diagnosisId);
      setSelectedDiagnosis(diagnosisForTreatment || null);
      
      setEditDialogOpen(true);
   };

   const handleUpdateTreatment = () => {
      if (currentTreatment) {
         dispatch(updateTreatmentDetail({
            id: currentTreatment.id,
            updates: {
               name,
               description,
               startDate: startDate ? startDate.toISOString() : new Date().toISOString(),
               endDate: endDate ? endDate.toISOString() : undefined,
               provider,
               status,
               notes,
               effectiveness: effectiveness || undefined,
               diagnosisId: selectedDiagnosis?.id || currentTreatment.diagnosisId,
            }
         }));
         setEditDialogOpen(false);
      }
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'planned': return 'info';
         case 'in-progress': return 'warning';
         case 'completed': return 'success';
         case 'discontinued': return 'error';
         default: return 'default';
      }
   };

   const getEffectivenessColor = (effectiveness: string | undefined) => {
      switch (effectiveness) {
         case 'excellent': return 'success';
         case 'good': return 'info';
         case 'fair': return 'warning';
         case 'poor': return 'error';
         default: return 'default';
      }
   };

   const getDiagnosisTitle = (diagnosisId: string) => {
      const diagnosis = diagnoses.find(d => d.id === diagnosisId);
      return diagnosis ? diagnosis.title : 'Unknown';
   };

   const renderTreatmentForm = () => (
      <Stack spacing={2}>
         <Autocomplete
            options={diagnoses}
            getOptionLabel={(option) => `${option.title}`}
            renderOption={(props, option) => (
               <li {...props}>
                  <strong>{option.title}</strong>
                  {option.description && (
                     <Typography variant="caption" sx={{ ml: 1 }}>({option.description})</Typography>
                  )}
               </li>
            )}
            value={selectedDiagnosis}
            onChange={(_, newValue) => setSelectedDiagnosis(newValue)}
            renderInput={(params) => <TextField {...params} label="Related Diagnosis" fullWidth />}
         />
         
         <TextField
            label='Treatment Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
         />
         
         <TextField
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
         />
         
         <Stack direction='row' spacing={2}>
            <TextField
               label="Start Date"
               type="date"
               value={startDate ? startDate.toISOString().split('T')[0] : ''}
               onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
               fullWidth
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <TextField
               label="End Date"
               type="date"
               value={endDate ? endDate.toISOString().split('T')[0] : ''}
               onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
               fullWidth
               InputLabelProps={{
                  shrink: true,
               }}
            />
         </Stack>
         
         <TextField
            label='Provider'
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            fullWidth
         />
         
         <Stack direction='row' spacing={2}>
            <FormControl fullWidth>
               <InputLabel>Status</InputLabel>
               <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value as 'planned' | 'in-progress' | 'completed' | 'discontinued')}
               >
                  <MenuItem value="planned">Planned</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="discontinued">Discontinued</MenuItem>
               </Select>
            </FormControl>
            
            <FormControl fullWidth>
               <InputLabel>Effectiveness</InputLabel>
               <Select
                  value={effectiveness}
                  label="Effectiveness"
                  onChange={(e) => setEffectiveness(e.target.value as 'poor' | 'fair' | 'good' | 'excellent' | '')}
               >
                  <MenuItem value="">Not Evaluated</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                  <MenuItem value="fair">Fair</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="excellent">Excellent</MenuItem>
               </Select>
            </FormControl>
         </Stack>
         
         <TextField
            label='Additional Notes'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            rows={2}
         />
      </Stack>
   );

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Treatment Details
         </Typography>
         
         <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant='subtitle1' mb={2}>Add New Treatment</Typography>
            {renderTreatmentForm()}
            <Button 
               variant='contained' 
               onClick={handleAddTreatment} 
               sx={{ mt: 2 }}
               disabled={!name || !selectedDiagnosis}
            >
               Add Treatment
            </Button>
         </Box>

         <Typography variant='subtitle1' mb={1}>Treatment History</Typography>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Related Diagnosis</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Effectiveness</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date Range</TableCell>
                  <TableCell>Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {treatmentDetails.map((treatment) => (
                  <TableRow key={treatment.id}>
                     <TableCell>
                        <Typography variant="body2" fontWeight="medium">{treatment.name}</Typography>
                        {treatment.description && (
                           <Typography variant="caption" color="text.secondary">{treatment.description}</Typography>
                        )}
                     </TableCell>
                     <TableCell>{getDiagnosisTitle(treatment.diagnosisId)}</TableCell>
                     <TableCell>
                        <Chip 
                           label={treatment.status} 
                           size="small"
                           color={getStatusColor(treatment.status)}
                        />
                     </TableCell>
                     <TableCell>
                        {treatment.effectiveness ? (
                           <Chip 
                              label={treatment.effectiveness} 
                              size="small"
                              color={getEffectivenessColor(treatment.effectiveness)}
                           />
                        ) : (
                           <Typography variant="caption" color="text.secondary">Not evaluated</Typography>
                        )}
                     </TableCell>
                     <TableCell>{treatment.provider}</TableCell>
                     <TableCell>
                        {new Date(treatment.startDate).toLocaleDateString()}
                        {treatment.endDate && ` - ${new Date(treatment.endDate).toLocaleDateString()}`}
                     </TableCell>
                     <TableCell>
                        <IconButton size="small" onClick={() => handleEditClick(treatment)}>
                           <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteTreatment(treatment.id)}>
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Edit Treatment</DialogTitle>
            <DialogContent>
               <Stack spacing={2} sx={{ mt: 1, minWidth: 500 }}>
                  {renderTreatmentForm()}
               </Stack>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
               <Button variant="contained" onClick={handleUpdateTreatment}>Update</Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
} 