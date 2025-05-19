import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  InputAdornment,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGeneralInfo } from '../../../store/slices/treatmentDocumentationSlice';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Removed unused mock data

export default function GeneralInformation() {
  const {
    documentName,
    duration,
    treatmentType,
    treatmentStatus,
    referralSource,
    categories,
    patient,
    evaluationDate,
    dob,
    primaryDiagnosis,
    age,
    secondaryDiagnosis,
    nativeLanguage,
    doctor,
  } = useAppSelector((state) => state.treatmentDocumentation);

  const dispatch = useAppDispatch();

  // Type for the redux state - must match exactly what's defined in the redux slice
  type TreatmentDocField =
    | 'documentName' | 'patient' | 'dob' | 'age' | 'nativeLanguage'
    | 'evaluationDate' | 'duration' | 'primaryDiagnosis' | 'secondaryDiagnosis'
    | 'doctor' | 'treatmentType' | 'treatmentStatus' | 'referralSource'
    | 'categories';

  const handleChangeString = (field: TreatmentDocField, value: string) => {
    dispatch(setGeneralInfo({ field, value }));
  };

  const handleChangeNumber = (field: TreatmentDocField, value: number) => {
    dispatch(setGeneralInfo({ field, value }));
  };

  return (
    <Box>
      {/* Document Header Section */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <TextField
              variant='outlined'
              label='Document Title'
              placeholder="Enter document title..."
              fullWidth
              value={documentName || ''}
              onChange={(e) => handleChangeString('documentName', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6} md={2} sx={{ pl: 2 }}>
            <TextField
              id='outlined-number'
              label='Duration (min)'
              type='number'
              value={duration}
              fullWidth
              onChange={(e) => handleChangeNumber('duration', +e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{
                p: 1,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                height: '100%'
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                Evaluation Type:
              </Typography>
              <RadioGroup
                row
                value="eval"
                onChange={(e) => console.log('Evaluation type changed:', e.target.value)}
                sx={{ my: 0.5 }}
              >
                <FormControlLabel value='eval' control={<Radio size="small" />} label='Initial Eval' />
                <FormControlLabel value='re-eval' control={<Radio size="small" />} label='Re-Eval' />
              </RadioGroup>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box display='flex' gap={2} mb={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id='treatment-type-label'>Treatment Type</InputLabel>
            <Select
              labelId='treatment-type-label'
              id='treatment-type'
              value={treatmentType}
              label='Treatment Type'
              onChange={(e) => handleChangeString('treatmentType', e.target.value)}
            >
              <MenuItem value='accident'>Accident</MenuItem>
              <MenuItem value='illness'>Illness</MenuItem>
              <MenuItem value='chronic'>Chronic</MenuItem>
              <MenuItem value='preventive'>Preventive</MenuItem>
              <MenuItem value='rehabilitation'>Rehabilitation</MenuItem>
              <MenuItem value='surgical'>Surgical</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id='treatment-status-label'>Treatment Status</InputLabel>
            <Select
              labelId='treatment-status-label'
              id='treatment-status'
              value={treatmentStatus}
              label='Treatment Status'
              onChange={(e) => handleChangeString('treatmentStatus', e.target.value)}
            >
              <MenuItem value='completed'>Completed</MenuItem>
              <MenuItem value='ongoing'>Ongoing</MenuItem>
              <MenuItem value='discontinued'>Discontinued</MenuItem>
              <MenuItem value='follow-up required'>Follow-up required</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id='referral-source-label'>Referral Source</InputLabel>
            <Select
              labelId='referral-source-label'
              id='referral-source'
              value={referralSource}
              label='Referral Source'
              onChange={(e) => handleChangeString('referralSource', e.target.value)}
            >
              <MenuItem value='self'>Self</MenuItem>
              <MenuItem value='physician'>Physician</MenuItem>
              <MenuItem value='school'>School</MenuItem>
              <MenuItem value='emergency'>Emergency</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id='categories-label'>Categories</InputLabel>
            <Select
              labelId='categories-source-label'
              id='categories-source'
              value={categories}
              label='Categories'
              onChange={(e) => handleChangeString('categories', e.target.value)}
            >
              <MenuItem value='articles'>Articles</MenuItem>
              <MenuItem value='purchases'>Purchases</MenuItem>
              <MenuItem value='patientTreatment'>Patient treatment</MenuItem>
              <MenuItem value='articleAssortment'>Article assortment</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box display='flex' gap={2}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '100%' }}>
          <TextField
            variant='outlined'
            label='Patient'
            fullWidth
            value={patient || ''}
            onChange={(e) => handleChangeString('patient', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Eval. Date'
            fullWidth
            value={evaluationDate || ''}
            onChange={(e) => handleChangeString('evaluationDate', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Date of Birth'
            fullWidth
            value={dob || ''}
            onChange={(e) => handleChangeString('dob', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Primary Diagnosis'
            fullWidth
            value={primaryDiagnosis || ''}
            onChange={(e) => handleChangeString('primaryDiagnosis', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Age'
            fullWidth
            value={age || ''}
            onChange={(e) => handleChangeString('age', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Secondary Diagnosis'
            fullWidth
            value={secondaryDiagnosis || ''}
            onChange={(e) => handleChangeString('secondaryDiagnosis', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Native Language'
            fullWidth
            value={nativeLanguage || ''}
            onChange={(e) => handleChangeString('nativeLanguage', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Doctor'
            fullWidth
            value={doctor || ''}
            onChange={(e) => handleChangeString('doctor', e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
}
