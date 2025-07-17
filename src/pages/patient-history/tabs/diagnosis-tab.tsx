/* eslint-disable @typescript-eslint/no-explicit-any */

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
   Autocomplete,
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
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory, updateDiagnosis, removeInfFromHistory } from '../../../store/slices/patientHistorySlice';
import { Diagnosis, DiagnosisCode } from '../../../store/slices/types/patientHistoryTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DiagnosisTab() {
   const [selectedCode, setSelectedCode] = useState<DiagnosisCode | null>(null);
   const [description, setDescription] = useState('');
   const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
   const [status, setStatus] = useState<'active' | 'resolved' | 'chronic'>('active');
   const [provider, setProvider] = useState('');
   const [editDialogOpen, setEditDialogOpen] = useState(false);
   const [currentDiagnosis, setCurrentDiagnosis] = useState<Diagnosis | null>(null);
   
   const dispatch = useAppDispatch();
   const diagnosis = useAppSelector((state) => state.patientHistory.diagnosis);
   const diagnosisCodes = useAppSelector((state) => state.patientHistory.diagnosisCodes);

   const handleAddDiagnosis = () => {
      if (selectedCode && description.trim()) {
         const newDiagnosis: Diagnosis = {
            code: parseInt(selectedCode.code) || 0,
            title: selectedCode.description,
            description: description,
            severity: severity,
            status: status,
            treatingProvider: provider,
            id: Math.random().toString(36).substring(2, 15),
            date: new Date().toISOString()
         };

         dispatch(addInfForHistory({ type: 'diagnosis', data: newDiagnosis }));

         setSelectedCode(null);
         setDescription('');
         setSeverity('medium');
         setStatus('active');
         setProvider('');
      }
   };

   const handleDeleteDiagnosis = (id: string) => {
      dispatch(removeInfFromHistory({ type: 'diagnosis', id }));
   };

   const handleEditClick = (diag: Diagnosis) => {
      setCurrentDiagnosis(diag);
      setDescription(diag.description || '');
      setSeverity(diag.severity || 'medium');
      setStatus(diag.status || 'active');
      setProvider(diag.treatingProvider || '');
      setEditDialogOpen(true);
   };

   const handleUpdateDiagnosis = () => {
      if (currentDiagnosis) {
         dispatch(updateDiagnosis({
            id: currentDiagnosis.id,
            updates: {
               description,
               severity,
               status,
               treatingProvider: provider
            }
         }));
         setEditDialogOpen(false);
      }
   };

   const getSeverityColor = (severity: string | undefined) => {
      switch (severity) {
         case 'high': return 'error';
         case 'medium': return 'warning';
         case 'low': return 'success';
         default: return 'default';
      }
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Diagnosis Management
         </Typography>
         
         <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant='subtitle1' mb={2}>Add New Diagnosis</Typography>
            <Stack spacing={2}>
               <Autocomplete
                  options={diagnosisCodes}
                  getOptionLabel={(option) => `${option.code} - ${option.description}`}
                  renderOption={(props, option) => (
                     <li {...props}>
                        <strong>{option.code}</strong> - {option.description} 
                        <Chip 
                           label={option.category} 
                           size="small" 
                           sx={{ ml: 1, fontSize: '0.7rem' }} 
                        />
                     </li>
                  )}
                  value={selectedCode}
                  onChange={(_, newValue) => setSelectedCode(newValue)}
                  renderInput={(params) => <TextField {...params} label="ICD Code" fullWidth />}
               />
               
               <TextField
                  label='Description/Notes'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
               />
               
               <Stack direction='row' spacing={2}>
                  <FormControl fullWidth>
                     <InputLabel>Severity</InputLabel>
                     <Select
                        value={severity}
                        label="Severity"
                        onChange={(e) => setSeverity(e.target.value as any)}
                     >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                     </Select>
                  </FormControl>
                  
                  <FormControl fullWidth>
                     <InputLabel>Status</InputLabel>
                     <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value as any)}
                     >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="chronic">Chronic</MenuItem>
                     </Select>
                  </FormControl>
               </Stack>
               
               <TextField
                  label='Treating Provider'
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  fullWidth
               />
               
               <Button variant='contained' onClick={handleAddDiagnosis}>
                  Add Diagnosis
               </Button>
            </Stack>
         </Box>

         <Typography variant='subtitle1' mb={1}>Diagnosis History</Typography>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ICD Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {diagnosis.map((diag: any) => (
                  <TableRow key={diag.id}>
                     <TableCell>{diag.code}</TableCell>
                     <TableCell>
                        <Typography variant="body2" fontWeight="medium">{diag.title}</Typography>
                        {diag.description && (
                           <Typography variant="caption" color="text.secondary">{diag.description}</Typography>
                        )}
                     </TableCell>
                     <TableCell>
                        <Chip 
                           label={diag.status || 'active'} 
                           size="small"
                           color={diag.status === 'resolved' ? 'success' : 'primary'}
                        />
                     </TableCell>
                     <TableCell>
                        <Chip 
                           label={diag.severity || 'medium'} 
                           size="small"
                           color={getSeverityColor(diag.severity)}
                        />
                     </TableCell>
                     <TableCell>{diag.treatingProvider || 'Not assigned'}</TableCell>
                     <TableCell>{new Date(diag.date).toLocaleDateString()}</TableCell>
                     <TableCell>
                        <IconButton size="small" onClick={() => handleEditClick(diag)}>
                           <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteDiagnosis(diag.id)}>
                           <DeleteIcon fontSize="small" />
                        </IconButton>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>

         <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Edit Diagnosis</DialogTitle>
            <DialogContent>
               <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
                  <TextField
                     label='Description/Notes'
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     fullWidth
                     multiline
                     rows={2}
                  />
                  
                  <FormControl fullWidth>
                     <InputLabel>Severity</InputLabel>
                     <Select
                        value={severity}
                        label="Severity"
                        onChange={(e) => setSeverity(e.target.value as any)}
                     >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                     </Select>
                  </FormControl>
                  
                  <FormControl fullWidth>
                     <InputLabel>Status</InputLabel>
                     <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value as any)}
                     >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="chronic">Chronic</MenuItem>
                     </Select>
                  </FormControl>
                  
                  <TextField
                     label='Treating Provider'
                     value={provider}
                     onChange={(e) => setProvider(e.target.value)}
                     fullWidth
                  />
               </Stack>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
               <Button variant="contained" onClick={handleUpdateDiagnosis}>Update</Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
}
