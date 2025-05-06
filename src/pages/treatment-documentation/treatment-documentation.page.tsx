import {
   Box,
   Button,
   Checkbox,
   Divider,
   FormControl,
   FormControlLabel,
   InputLabel,
   MenuItem,
   Radio,
   RadioGroup,
   Select,
   TextField,
   Typography,
   useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';

const initDevelopmentalHistory = {
   milestonesInTime: false,
   crawl: '',
   satUp: '',
   stood: '',
   walked: '',
   fedSelf: '',
   toileted: '',
   dressSelf: '',
   singleWords: '',
   combinedWords: '',
};

export default function TreatmentDocumentation() {
   //HISTORY
   const [documentName, setDocumentName] = useState('');
   const [patient, setPatient] = useState('');
   const [dob, setDob] = useState('');
   const [age, setAge] = useState('');
   const [nativeLanguage, setNativeLanguage] = useState('');
   const [evaluationDate, setEvaluationDate] = useState('');
   const [duration, setDuration] = useState(0);
   const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
   const [secondaryDiagnosis, setSecondaryDiagnosis] = useState('');
   const [doctor, setDoctor] = useState('');
   const [significantHistory, setSignificantHistory] = useState('');
   const [medicalHistory, setMedicalHistory] = useState('');
   const [medications, setMedications] = useState('');
   const [developmentalHistory, setDevelopmentalHistory] = useState(initDevelopmentalHistory);
   const [educationalStatus, setEducationalStatus] = useState('');
   const [treatmentType, setTreatmentType] = useState('');
   const [treatmentStatus, setTreatmentStatus] = useState('');
   const [referralSource, setReferralSource] = useState('');
   const [categories, setCategories] = useState('');
   const [accident, setAccident] = useState('');
   const [disease, setDisease] = useState('');

   //BEHAVIOR
   const [attendingSkills, setAttendingSkills] = useState('adequate');
   const [coop, setCoop] = useState('with some pro');
   const [awarenessOfOthers, setAwarenessOfOthers] = useState('poor');
   const [prognosisForICF, setPrognosisForICF] = useState('unfavorable');
   const [responseRate, setResponseRate] = useState('appropriate');
   const [socialInteractions, setSocialInteractions] = useState('withdrawn');
   const [reliabilityOfScores, setReliabilityOfScores] = useState('questionable');
   const [levelOfActivity, setLevelOfActivity] = useState('active');
   const [communicativeIntent, setCommunicativeIntent] = useState('present');
   const [awarenessOfEnvironmentalEvents, setAwarenessOfEnvironmentalEvents] = useState('moderately');

   const theme = useTheme();

   const handleChangeString = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
      setter(value);
   };

   const handleChangeNumber = (value: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
      setter(value);
   };

   const handleDHChange = (name: string, value: string | boolean) => {
      setDevelopmentalHistory((prev) => ({ ...prev, [name]: value }));
   };

   return (
      <Box display='flex' flexDirection='column' p={3} gap={3}>
         <Box display='flex' gap={2}>
            <TextField
               variant='outlined'
               label='Document name'
               fullWidth
               value={documentName || ''}
               onChange={(e) => handleChangeString(e.target.value, setDocumentName)}
               sx={{ flex: '0 1 auto' }}
            />
            <TextField
               id='outlined-number'
               label='Duration (m)'
               type='number'
               value={duration}
               onChange={(e) => handleChangeNumber(+e.target.value, setDuration)}
            />
            <RadioGroup row sx={{ flex: '1 0 280px' }}>
               <FormControlLabel value='eval' control={<Radio />} label='Initial Eval' />
               <FormControlLabel value='re-eval' control={<Radio />} label='Re-Eval' />
            </RadioGroup>
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
                     onChange={(e) => setTreatmentType(e.target.value)}
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
                     onChange={(e) => setTreatmentStatus(e.target.value)}
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
                     onChange={(e) => setReferralSource(e.target.value)}
                  >
                     <MenuItem value='self'>Self</MenuItem>
                     <MenuItem value='physician'>Physician</MenuItem>
                     <MenuItem value='school'>School</MenuItem>
                     <MenuItem value='emergency'>Emergency</MenuItem>
                  </Select>
               </FormControl>

               <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id='referral-source-label'>Categories</InputLabel>
                  <Select
                     labelId='categories-source-label'
                     id='categories-source'
                     value={categories}
                     label='Categories'
                     onChange={(e) => setCategories(e.target.value)}
                  >
                     <MenuItem value='articles'>Articles</MenuItem>
                     <MenuItem value='purchases'>Purchases</MenuItem>
                     <MenuItem value='patientTreatment'>Patient treatment</MenuItem>
                     <MenuItem value='articleAssortment'>Article assortment</MenuItem>
                  </Select>
               </FormControl>
            </Box>
            <Box display='flex' gap={2}>
               <Grid2 container columns={2} spacing={2}>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Patient'
                        fullWidth
                        value={patient || ''}
                        onChange={(e) => handleChangeString(e.target.value, setPatient)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Eval. Date'
                        fullWidth
                        value={evaluationDate || ''}
                        onChange={(e) => handleChangeString(e.target.value, setEvaluationDate)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Date of Birth'
                        fullWidth
                        value={dob || ''}
                        onChange={(e) => handleChangeString(e.target.value, setDob)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Primary Diagnosis'
                        fullWidth
                        value={primaryDiagnosis || ''}
                        onChange={(e) => handleChangeString(e.target.value, setPrimaryDiagnosis)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Age'
                        fullWidth
                        value={age || ''}
                        onChange={(e) => handleChangeString(e.target.value, setAge)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Secondary Diagnosis'
                        fullWidth
                        value={secondaryDiagnosis || ''}
                        onChange={(e) => handleChangeString(e.target.value, setSecondaryDiagnosis)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Native Language'
                        fullWidth
                        value={nativeLanguage || ''}
                        onChange={(e) => handleChangeString(e.target.value, setNativeLanguage)}
                     />
                  </Grid2>
                  <Grid2 xs={1}>
                     <TextField
                        variant='outlined'
                        label='Doctor'
                        fullWidth
                        value={doctor || ''}
                        onChange={(e) => handleChangeString(e.target.value, setDoctor)}
                     />
                  </Grid2>
               </Grid2>
               <Box
                  sx={{ backgroundColor: theme.palette.primary.main }}
                  color={theme.palette.primary.contrastText}
                  p={1}
                  borderRadius={1}
                  flex='1 0 250px'
               >
                  <Typography variant='body1' fontWeight='bold'>
                     DEMO
                  </Typography>
                  <Typography variant='body2'>123 main street</Typography>
                  <Typography variant='body2'>Portrock, NC 34204</Typography>
                  <Typography variant='body2'>093-435-6493</Typography>
               </Box>
            </Box>
         </Box>
         <Divider
            sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
         >
            <Typography variant='overline'>History</Typography>
         </Divider>
         <Box display='flex' gap={2}>
            <Grid2 container columns={2} spacing={2} width='100%'>
               <Grid2 xs={2}>
                  <TextField
                     variant='outlined'
                     label='Significant History'
                     fullWidth
                     multiline
                     rows={4}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initial !important' },
                     }}
                     value={significantHistory || ''}
                     onChange={(e) => handleChangeString(e.target.value, setSignificantHistory)}
                  />
               </Grid2>
               <Grid2 xs={2}>
                  <TextField
                     variant='outlined'
                     label='Medical History'
                     fullWidth
                     multiline
                     rows={4}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initial !important' },
                     }}
                     value={medicalHistory || ''}
                     onChange={(e) => handleChangeString(e.target.value, setMedicalHistory)}
                  />
               </Grid2>
               <Grid2 xs={2}>
                  <TextField
                     variant='outlined'
                     label='Medications'
                     fullWidth
                     multiline
                     rows={4}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initial !important' },
                     }}
                     value={medications || ''}
                     onChange={(e) => handleChangeString(e.target.value, setMedications)}
                  />
               </Grid2>
               <Grid2 xs={2}>
                  <TextField
                     variant='outlined'
                     label='Accident'
                     fullWidth
                     multiline
                     rows={4}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initial !important' },
                     }}
                     value={accident || ''}
                     onChange={(e) => handleChangeString(e.target.value, setAccident)}
                  />
               </Grid2>
               <Grid2 xs={2}>
                  <TextField
                     variant='outlined'
                     label='Disease'
                     fullWidth
                     multiline
                     rows={4}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initial !important' },
                     }}
                     value={disease || ''}
                     onChange={(e) => handleChangeString(e.target.value, setDisease)}
                  />
               </Grid2>
               <Grid2 xs={2}>
                  <Box>
                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={developmentalHistory.milestonesInTime || false}
                              onChange={(e) => handleDHChange('milestonesInTime', e.target.checked)}
                           />
                        }
                        label='Developmental milestones were reported to be achieved within normal limits'
                     />
                     <Typography variant='subtitle1'>At age:</Typography>
                     <Box display='flex' py={2} gap={2}>
                        <TextField
                           variant='outlined'
                           label='Crawl'
                           value={developmentalHistory.crawl || ''}
                           onChange={(e) => handleDHChange('crawl', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Sat up'
                           value={developmentalHistory.satUp || ''}
                           onChange={(e) => handleDHChange('satUp', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Stood'
                           value={developmentalHistory.stood || ''}
                           onChange={(e) => handleDHChange('stood', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Walked'
                           value={developmentalHistory.walked || ''}
                           onChange={(e) => handleDHChange('walked', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Fed self'
                           value={developmentalHistory.fedSelf || ''}
                           onChange={(e) => handleDHChange('fedSelf', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Dress self'
                           value={developmentalHistory.dressSelf || ''}
                           onChange={(e) => handleDHChange('dressSelf', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Toileted'
                           value={developmentalHistory.toileted || ''}
                           onChange={(e) => handleDHChange('toileted', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Single words'
                           value={developmentalHistory.singleWords || ''}
                           onChange={(e) => handleDHChange('singleWords', e.target.value)}
                        />
                        <TextField
                           variant='outlined'
                           label='Combined words'
                           value={developmentalHistory.combinedWords || ''}
                           onChange={(e) => handleDHChange('combinedWords', e.target.value)}
                        />
                     </Box>
                  </Box>
               </Grid2>
               <Grid2 xs={2}>
                  <TextField
                     variant='outlined'
                     label='Educational Status'
                     fullWidth
                     multiline
                     rows={4}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initial !important' },
                     }}
                     value={educationalStatus || ''}
                     onChange={(e) => handleChangeString(e.target.value, setEducationalStatus)}
                  />
               </Grid2>
            </Grid2>
         </Box>
         <Divider
            sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
         >
            <Typography variant='overline'>Behavioral Observation</Typography>
         </Divider>
         <Box display='flex' gap={2}>
            <Grid2 container columns={3} spacing={2} width='100%'>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='attendingSkills'>Attending Skills</InputLabel>
                     <Select
                        labelId='attendingSkills'
                        id='attendingSkills'
                        value={attendingSkills}
                        fullWidth
                        label='Attending Skills'
                        onChange={(e) => handleChangeString(e.target.value, setAttendingSkills)}
                     >
                        <MenuItem value='adequate'>Adequate</MenuItem>
                        <MenuItem value='moderate'>Moderate</MenuItem>
                        <MenuItem value='poor'>Poor</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='responseRate'>Response Rate</InputLabel>
                     <Select
                        labelId='responseRate'
                        id='responseRate'
                        value={responseRate}
                        fullWidth
                        label='Response Rate'
                        onChange={(e) => handleChangeString(e.target.value, setResponseRate)}
                     >
                        <MenuItem value='excellent'>Excellent</MenuItem>
                        <MenuItem value='appropriate'>Appropriate</MenuItem>
                        <MenuItem value='slow'>Slow</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='coop'>Cooperation</InputLabel>
                     <Select
                        labelId='coop'
                        id='coop'
                        value={coop}
                        fullWidth
                        label='Cooperation'
                        onChange={(e) => handleChangeString(e.target.value, setCoop)}
                     >
                        <MenuItem value='good'>Good</MenuItem>
                        <MenuItem value='with some pro'>With some pro</MenuItem>
                        <MenuItem value='poor'>Poor</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='levelOfActivity'>Level of Activity</InputLabel>
                     <Select
                        labelId='levelOfActivity'
                        id='levelOfActivity'
                        value={levelOfActivity}
                        fullWidth
                        label='Level of Activity'
                        onChange={(e) => handleChangeString(e.target.value, setLevelOfActivity)}
                     >
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='moderate'>Moderate</MenuItem>
                        <MenuItem value='passive'>Passive</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='socialInteractions'>Social Interactions</InputLabel>
                     <Select
                        labelId='socialInteractions'
                        id='socialInteractions'
                        value={socialInteractions}
                        fullWidth
                        label='Social Interactions'
                        onChange={(e) => handleChangeString(e.target.value, setSocialInteractions)}
                     >
                        <MenuItem value='allowed'>Allowed</MenuItem>
                        <MenuItem value='withdrawn'>Withdrawn</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='communicativeIntent'>Communicative Intent</InputLabel>
                     <Select
                        labelId='communicativeIntent'
                        id='communicativeIntent'
                        value={communicativeIntent}
                        fullWidth
                        label='Communicative Intent'
                        onChange={(e) => handleChangeString(e.target.value, setCommunicativeIntent)}
                     >
                        <MenuItem value='present'>Present</MenuItem>
                        <MenuItem value='absent'>Absent</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='awarenessOfOthers'>Awareness of Others</InputLabel>
                     <Select
                        labelId='awarenessOfOthers'
                        id='awarenessOfOthers'
                        value={awarenessOfOthers}
                        fullWidth
                        label='Awareness of Others'
                        onChange={(e) => handleChangeString(e.target.value, setAwarenessOfOthers)}
                     >
                        <MenuItem value='good'>Good</MenuItem>
                        <MenuItem value='poor'>Poor</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='reliabilityOfScores'>Reliability of Scores</InputLabel>
                     <Select
                        labelId='reliabilityOfScores'
                        id='reliabilityOfScores'
                        value={reliabilityOfScores}
                        fullWidth
                        label='Reliability of Scores'
                        onChange={(e) => handleChangeString(e.target.value, setReliabilityOfScores)}
                     >
                        <MenuItem value='corresponding'>Corresponding</MenuItem>
                        <MenuItem value='questionable'>Questionable</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='awarenessOfEnvironmentalEvents'>
                        Awareness of Environmental Events
                     </InputLabel>
                     <Select
                        labelId='awarenessOfEnvironmentalEvents'
                        id='awarenessOfEnvironmentalEvents'
                        value={awarenessOfEnvironmentalEvents}
                        fullWidth
                        label='Awareness of Environmental Events'
                        onChange={(e) =>
                           handleChangeString(e.target.value, setAwarenessOfEnvironmentalEvents)
                        }
                     >
                        <MenuItem value='excellent'>Excellent</MenuItem>
                        <MenuItem value='moderately'>Moderately</MenuItem>
                        <MenuItem value='poor'>Poor</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
               <Grid2 xs={1}>
                  <FormControl fullWidth>
                     <InputLabel id='prognosisForICF'>
                        Prognosis for Improved Communicative Functions
                     </InputLabel>
                     <Select
                        labelId='prognosisForICF'
                        id='prognosisForICF'
                        value={prognosisForICF}
                        fullWidth
                        label='Prognosis for Improved Communicative Functions'
                        onChange={(e) => handleChangeString(e.target.value, setPrognosisForICF)}
                     >
                        <MenuItem value='favorable'>Favorable</MenuItem>
                        <MenuItem value='unfavorable'>Unfavorable</MenuItem>
                     </Select>
                  </FormControl>
               </Grid2>
            </Grid2>
         </Box>
         <Box width='100%'>
            <Button fullWidth>Save</Button>
         </Box>
      </Box>
   );
}
