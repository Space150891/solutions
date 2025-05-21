import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  useTheme
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGeneralInfo } from '../../../store/slices/treatmentDocumentationSlice';

// Import icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import GroupIcon from '@mui/icons-material/Group';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

export default function BehavioralObservation() {
  const {
    attendingSkills,
    responseRate,
    coop,
    levelOfActivity,
    socialInteractions,
    communicativeIntent,
    awarenessOfOthers,
    reliabilityOfScores,
    awarenessOfEnvironmentalEvents,
    prognosisForICF
  } = useAppSelector((state) => state.treatmentDocumentation);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Define a proper type for behavioral observation fields
  type BehavioralField =
    | 'attendingSkills' | 'responseRate' | 'coop' | 'levelOfActivity'
    | 'socialInteractions' | 'communicativeIntent' | 'awarenessOfOthers'
    | 'reliabilityOfScores' | 'awarenessOfEnvironmentalEvents' | 'prognosisForICF';

  const handleChangeString = (field: BehavioralField, value: string) => {
    dispatch(setGeneralInfo({ field, value }));
  };

  // Function to get chip color based on value
  const getChipColor = (value: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    const valueMap: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
      // Positive values
      'adequate': 'success',
      'excellent': 'success',
      'good': 'success',
      'active': 'success',
      'appropriate': 'success',
      'above average': 'success',
      'favorable': 'success',
      'corresponding': 'success',
      'present': 'success',
      'allowed': 'success',

      // Neutral values
      'moderate': 'info',
      'with some pro': 'info',
      'average': 'info',
      'moderately': 'info',

      // Negative values
      'poor': 'error',
      'slow': 'warning',
      'passive': 'warning',
      'below average': 'error',
      'negative': 'error',
      'unfavorable': 'error',
      'questionable': 'warning',
      'withdrawn': 'warning',
      'absent': 'error'
    };

    return valueMap[value] || 'default';
  };

  return (
    <Box sx={{ pb: 2 }}>
      <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 500 }}>
        Behavioral Observations
      </Typography>

      <Grid container spacing={2}>
        {/* Attending Skills */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<VisibilityIcon color="primary" />}
              title="Attending Skills"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                attendingSkills &&
                <Chip
                  label={attendingSkills}
                  size="small"
                  color={getChipColor(attendingSkills)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="attendingSkills-label">Select Assessment</InputLabel>
                <Select
                  labelId="attendingSkills-label"
                  id="attendingSkills"
                  value={attendingSkills || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('attendingSkills', e.target.value)}
                >
                  <MenuItem value="adequate">Adequate</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Response Rate */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<SpeedIcon color="primary" />}
              title="Response Rate"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                responseRate &&
                <Chip
                  label={responseRate}
                  size="small"
                  color={getChipColor(responseRate)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="responseRate-label">Select Assessment</InputLabel>
                <Select
                  labelId="responseRate-label"
                  id="responseRate"
                  value={responseRate || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('responseRate', e.target.value)}
                >
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="appropriate">Appropriate</MenuItem>
                  <MenuItem value="slow">Slow</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Cooperation */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<HandshakeIcon color="primary" />}
              title="Cooperation"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                coop &&
                <Chip
                  label={coop}
                  size="small"
                  color={getChipColor(coop)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="coop-label">Select Assessment</InputLabel>
                <Select
                  labelId="coop-label"
                  id="coop"
                  value={coop || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('coop', e.target.value)}
                >
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="with some pro">With some prompting</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Level of Activity */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<BatteryChargingFullIcon color="primary" />}
              title="Level of Activity"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                levelOfActivity &&
                <Chip
                  label={levelOfActivity}
                  size="small"
                  color={getChipColor(levelOfActivity)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="levelOfActivity-label">Select Assessment</InputLabel>
                <Select
                  labelId="levelOfActivity-label"
                  id="levelOfActivity"
                  value={levelOfActivity || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('levelOfActivity', e.target.value)}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="passive">Passive</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Interactions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<GroupIcon color="primary" />}
              title="Social Interactions"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                socialInteractions &&
                <Chip
                  label={socialInteractions}
                  size="small"
                  color={getChipColor(socialInteractions)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="socialInteractions-label">Select Assessment</InputLabel>
                <Select
                  labelId="socialInteractions-label"
                  id="socialInteractions"
                  value={socialInteractions || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('socialInteractions', e.target.value)}
                >
                  <MenuItem value="allowed">Allowed</MenuItem>
                  <MenuItem value="withdrawn">Withdrawn</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Communicative Intent */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<RecordVoiceOverIcon color="primary" />}
              title="Communicative Intent"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                communicativeIntent &&
                <Chip
                  label={communicativeIntent}
                  size="small"
                  color={getChipColor(communicativeIntent)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="communicativeIntent-label">Select Assessment</InputLabel>
                <Select
                  labelId="communicativeIntent-label"
                  id="communicativeIntent"
                  value={communicativeIntent || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('communicativeIntent', e.target.value)}
                >
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Awareness of Others */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<PsychologyIcon color="primary" />}
              title="Awareness of Others"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                awarenessOfOthers &&
                <Chip
                  label={awarenessOfOthers}
                  size="small"
                  color={getChipColor(awarenessOfOthers)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="awarenessOfOthers-label">Select Assessment</InputLabel>
                <Select
                  labelId="awarenessOfOthers-label"
                  id="awarenessOfOthers"
                  value={awarenessOfOthers || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('awarenessOfOthers', e.target.value)}
                >
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Reliability of Scores */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<VerifiedUserIcon color="primary" />}
              title="Reliability of Scores"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                reliabilityOfScores &&
                <Chip
                  label={reliabilityOfScores}
                  size="small"
                  color={getChipColor(reliabilityOfScores)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="reliabilityOfScores-label">Select Assessment</InputLabel>
                <Select
                  labelId="reliabilityOfScores-label"
                  id="reliabilityOfScores"
                  value={reliabilityOfScores || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('reliabilityOfScores', e.target.value)}
                >
                  <MenuItem value="corresponding">Corresponding</MenuItem>
                  <MenuItem value="questionable">Questionable</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Environmental Awareness */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<AccessibilityNewIcon color="primary" />}
              title="Environmental Awareness"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                awarenessOfEnvironmentalEvents &&
                <Chip
                  label={awarenessOfEnvironmentalEvents}
                  size="small"
                  color={getChipColor(awarenessOfEnvironmentalEvents)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="awarenessOfEnvironmentalEvents-label">Select Assessment</InputLabel>
                <Select
                  labelId="awarenessOfEnvironmentalEvents-label"
                  id="awarenessOfEnvironmentalEvents"
                  value={awarenessOfEnvironmentalEvents || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('awarenessOfEnvironmentalEvents', e.target.value)}
                >
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="moderately">Moderately</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Prognosis */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                boxShadow: `0 4px 8px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardHeader
              avatar={<MedicalInformationIcon color="primary" />}
              title="Prognosis for ICF"
              titleTypographyProps={{ variant: 'subtitle2' }}
              sx={{ pb: 0 }}
              action={
                prognosisForICF &&
                <Chip
                  label={prognosisForICF}
                  size="small"
                  color={getChipColor(prognosisForICF)}
                />
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="prognosisForICF-label">Select Assessment</InputLabel>
                <Select
                  labelId="prognosisForICF-label"
                  id="prognosisForICF"
                  value={prognosisForICF || ''}
                  label="Select Assessment"
                  onChange={(e) => handleChangeString('prognosisForICF', e.target.value)}
                >
                  <MenuItem value="favorable">Favorable</MenuItem>
                  <MenuItem value="unfavorable">Unfavorable</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
