import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
// Removed unused import
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGeneralInfo, updateDevelopmentalHistory } from '../../../store/slices/treatmentDocumentationSlice';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HistoryIcon from '@mui/icons-material/History';
import MedicationIcon from '@mui/icons-material/Medication';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';

export default function HistorySection() {
  const {
    significantHistory,
    medicalHistory,
    medications,
    accident,
    disease,
    developmentalHistory,
    educationalStatus,
  } = useAppSelector((state) => state.treatmentDocumentation);

  const dispatch = useAppDispatch();

  // Define proper type for general info fields
  type GeneralInfoField =
    | 'significantHistory' | 'medicalHistory' | 'medications'
    | 'accident' | 'disease' | 'educationalStatus';

  const handleChangeString = (field: GeneralInfoField, value: string) => {
    dispatch(setGeneralInfo({ field, value }));
  };

  // Define proper type for developmental history fields
  type DevelopmentalHistoryField =
    | 'milestonesInTime' | 'satUp' | 'crawl' | 'stood' | 'walked'
    | 'fedSelf' | 'dressSelf' | 'toileted' | 'singleWords' | 'combinedWords';

  const handleDHChange = (name: DevelopmentalHistoryField, value: string | boolean) => {
    dispatch(updateDevelopmentalHistory({
      field: name as keyof typeof developmentalHistory,
      value,
    }));
  };

  return (
    <Box>
      <Typography variant="h6" color="primary" sx={{ mb: 3, fontWeight: 500 }}>
        Patient History
      </Typography>

      {/* Basic History Information - First Row */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
          Basic Information
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', mr: 2, }}>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <HistoryIcon color="primary" />
                    <Typography variant="subtitle1">Significant History</Typography>
                  </Box>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  variant='outlined'
                  placeholder='Enter significant patient history details...'
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiInputBase-root': { height: 'initial !important' },
                  }}
                  value={significantHistory || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeString('significantHistory', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <MedicalInformationIcon color="primary" />
                    <Typography variant="subtitle1">Medical History</Typography>
                  </Box>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  variant='outlined'
                  placeholder='Enter patient medical history...'
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiInputBase-root': { height: 'initial !important' },
                  }}
                  value={medicalHistory || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeString('medicalHistory', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Medical Details - Second Row */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
          Medical Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', mr: 2 }}>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <MedicationIcon color="primary" />
                    <Typography variant="subtitle1">Medications</Typography>
                  </Box>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  variant='outlined'
                  placeholder='List current medications and dosages...'
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiInputBase-root': { height: 'initial !important' },
                  }}
                  value={medications || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeString('medications', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <DirectionsCarIcon color="primary" />
                    <Typography variant="subtitle1">Accident History</Typography>
                  </Box>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  variant='outlined'
                  placeholder='Describe any relevant accidents or injuries...'
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiInputBase-root': { height: 'initial !important' },
                  }}
                  value={accident || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeString('accident', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', mt: { xs: 2, md: 2 }, mr: 2 }}>
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <CoronavirusIcon color="primary" />
                    <Typography variant="subtitle1">Disease History</Typography>
                  </Box>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  variant='outlined'
                  placeholder='Document history of diseases or chronic conditions...'
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiInputBase-root': { height: 'initial !important' },
                  }}
                  value={disease || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeString('disease', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Developmental History - Third Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
          Development & Education
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>            <Card variant="outlined" sx={{ mb: 2 }}>
            <CardHeader
              title={
                <Box display="flex" alignItems="center" gap={1}>
                  <ChildCareIcon color="primary" />
                  <Typography variant="subtitle1">Developmental History</Typography>
                </Box>
              }
              sx={{ pb: 0, borderBottom: '1px solid', borderColor: 'divider' }}
            />
            <CardContent>
              <Box sx={{ mb: 3, py: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={developmentalHistory?.milestonesInTime || false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('milestonesInTime', e.target.checked)}
                      color="primary"
                      sx={{
                        ml: 3,
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight="medium">
                      Developmental milestones were reported to be achieved within normal limits
                    </Typography>
                  }
                />
              </Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, mt: 2 }}>
                Developmental Milestones (Age in months)
              </Typography>

              <Grid container spacing={2}>
                {/* Motor Development */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mb: 1, display: 'block' }}>
                    Motor Development
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Crawl"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.crawl || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('crawl', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Sat up"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.satUp || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('satUp', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Stood"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.stood || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('stood', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Walked"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.walked || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('walked', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Self-care Development */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mb: 1, mt: 1, display: 'block' }}>
                    Self-care Development
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Fed self"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.fedSelf || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('fedSelf', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Dress self"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.dressSelf || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('dressSelf', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Toileted"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.toileted || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('toileted', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Language Development */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mb: 1, mt: 1, display: 'block' }}>
                    Language Development
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Single words"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.singleWords || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('singleWords', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    variant="outlined"
                    label="Combined words"
                    size="small"
                    fullWidth
                    value={developmentalHistory?.combinedWords || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDHChange('combinedWords', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="caption" color="text.secondary">mo</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <SchoolIcon color="primary" />
                    <Typography variant="subtitle1">Educational Status</Typography>
                  </Box>
                }
                sx={{ pb: 0 }}
              />
              <CardContent>
                <TextField
                  variant="outlined"
                  placeholder="Include details about education, school performance, and accommodations..."
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiInputBase-root': { height: 'initial !important' },
                  }}
                  value={educationalStatus || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeString('educationalStatus', e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
