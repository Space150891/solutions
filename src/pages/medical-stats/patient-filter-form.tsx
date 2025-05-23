import { FC } from 'react';
import { 
  Paper, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Box
} from '@mui/material';
import { ScrollableFormContent } from '../../components/common';

/**
 * Example form component demonstrating how to use ScrollableFormContent
 */
export const PatientFilterForm: FC = () => {
  return (
    <Paper sx={{ width: '100%', maxWidth: '500px' }}>
      <ScrollableFormContent maxHeight="400px" padding={3}>
        <TextField
          label="Patient Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Patient ID"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="age-group-label">Age Group</InputLabel>
          <Select
            labelId="age-group-label"
            id="age-group"
            label="Age Group"
            defaultValue=""
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0-18">0-18</MenuItem>
            <MenuItem value="19-35">19-35</MenuItem>
            <MenuItem value="36-50">36-50</MenuItem>
            <MenuItem value="51-65">51-65</MenuItem>
            <MenuItem value="66+">66+</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            label="Gender"
            defaultValue=""
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="diagnosis-label">Diagnosis</InputLabel>
          <Select
            labelId="diagnosis-label"
            id="diagnosis"
            label="Diagnosis"
            defaultValue=""
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="cardiovascular">Cardiovascular</MenuItem>
            <MenuItem value="respiratory">Respiratory</MenuItem>
            <MenuItem value="gastrointestinal">Gastrointestinal</MenuItem>
            <MenuItem value="neurological">Neurological</MenuItem>
            <MenuItem value="musculoskeletal">Musculoskeletal</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        
        <FormControlLabel 
          control={<Checkbox />} 
          label="Include discharged patients"
          sx={{ mt: 2 }}
        />
        
        <FormControlLabel 
          control={<Checkbox />} 
          label="Only show critical cases"
        />
        
        <FormControlLabel 
          control={<Checkbox />} 
          label="Filter by current department only"
        />
      </ScrollableFormContent>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3, pt: 0 }}>
        <Button variant="contained" color="primary">
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default PatientFilterForm;
