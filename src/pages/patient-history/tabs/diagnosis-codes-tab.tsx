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
   IconButton,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Chip,
   InputAdornment,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   TableContainer,
   Paper,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addDiagnosisCode, removeDiagnosisCode } from '../../../store/slices/patientHistorySlice';
import { DiagnosisCode } from '../../../store/slices/types/patientHistoryTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function DiagnosisCodesTab() {
   const [code, setCode] = useState('');
   const [description, setDescription] = useState('');
   const [category, setCategory] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('');
   const [dialogOpen, setDialogOpen] = useState(false);
   
   const dispatch = useAppDispatch();
   const diagnosisCodes = useAppSelector((state) => state.patientHistory.diagnosisCodes);
   
   // Extract unique categories
   const categories = useMemo(() => {
      return Array.from(
         new Set(diagnosisCodes.map(code => code.category))
      ).sort();
   }, [diagnosisCodes]);
   
   // Filter codes based on search and category
   const filteredCodes = useMemo(() => {
      let result = [...diagnosisCodes];
      
      if (searchTerm) {
         const lowerSearchTerm = searchTerm.toLowerCase();
         result = result.filter(code => 
            code.code.toLowerCase().includes(lowerSearchTerm) || 
            code.description.toLowerCase().includes(lowerSearchTerm)
         );
      }
      
      if (categoryFilter) {
         result = result.filter(code => code.category === categoryFilter);
      }
      
      return result;
   }, [diagnosisCodes, searchTerm, categoryFilter]);
   
   const handleAddCode = () => {
      if (code.trim() && description.trim() && category.trim()) {
         const newCode: DiagnosisCode = {
            code: code.trim(),
            description: description.trim(),
            category: category.trim()
         };
         
         dispatch(addDiagnosisCode(newCode));
         
         // Reset form
         setCode('');
         setDescription('');
         setCategory('');
         setDialogOpen(false);
      }
   };
   
   const handleDeleteCode = (codeToDelete: string) => {
      dispatch(removeDiagnosisCode(codeToDelete));
   };
   
   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Diagnosis Codes Management
         </Typography>
         
         <Stack direction="row" spacing={2} mb={2} alignItems="center">
            <TextField
               placeholder="Search codes..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon />
                     </InputAdornment>
                  ),
               }}
               sx={{ flexGrow: 1 }}
            />
            
            <FormControl sx={{ minWidth: 200 }}>
               <InputLabel>Filter by Category</InputLabel>
               <Select
                  value={categoryFilter}
                  label="Filter by Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  startAdornment={
                     <InputAdornment position="start">
                        <FilterListIcon />
                     </InputAdornment>
                  }
               >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map(cat => (
                     <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
               </Select>
            </FormControl>
            
            <Button
               variant="contained"
               startIcon={<AddIcon />}
               onClick={() => setDialogOpen(true)}
            >
               Add Code
            </Button>
         </Stack>
         
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Code</TableCell>
                     <TableCell>Description</TableCell>
                     <TableCell>Category</TableCell>
                     <TableCell align="right">Actions</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {filteredCodes.map((diagCode) => (
                     <TableRow key={diagCode.code}>
                        <TableCell>
                           <Typography variant="body2" fontWeight="medium">
                              {diagCode.code}
                           </Typography>
                        </TableCell>
                        <TableCell>{diagCode.description}</TableCell>
                        <TableCell>
                           <Chip 
                              label={diagCode.category} 
                              size="small"
                              color="primary"
                              variant="outlined"
                           />
                        </TableCell>
                        <TableCell align="right">
                           <IconButton 
                              size="small" 
                              onClick={() => handleDeleteCode(diagCode.code)}
                              color="error"
                           >
                              <DeleteIcon fontSize="small" />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}
                  
                  {filteredCodes.length === 0 && (
                     <TableRow>
                        <TableCell colSpan={4} align="center">
                           <Typography variant="body2" color="text.secondary" py={2}>
                              No diagnosis codes found matching your criteria.
                           </Typography>
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>
         
         <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Add New Diagnosis Code</DialogTitle>
            <DialogContent>
               <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
                  <TextField
                     label="Code"
                     value={code}
                     onChange={(e) => setCode(e.target.value)}
                     fullWidth
                     required
                  />
                  
                  <TextField
                     label="Description"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     fullWidth
                     required
                     multiline
                     rows={2}
                  />
                  
                  <TextField
                     label="Category"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     fullWidth
                     required
                  />
               </Stack>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
               <Button 
                  variant="contained" 
                  onClick={handleAddCode}
                  disabled={!code.trim() || !description.trim() || !category.trim()}
               >
                  Add
               </Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
} 