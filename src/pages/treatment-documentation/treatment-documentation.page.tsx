import {
   Box,
   Button,
   Typography,
   useTheme,
   Card,
   CardContent,
   AppBar,
   Toolbar,
   IconButton,
   Tab,
   Tabs,
   useMediaQuery,
   Container,
   LinearProgress,
   Fade,
   Stepper,
   Step,
   StepLabel,
   StepButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { paths } from '../../routes/paths';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Components
import GeneralInformation from './components/general-information.component';
import HistorySection from './components/history-section.component';
import BehavioralObservation from './components/behavioral-observation.component';
import LocationInfo from './components/location-info.component';
import MedicationManagement from './components/medication-management.component.tsx';
import ClinicalAlertsBanner from './components/clinical-alerts-banner.component';

export default function TreatmentDocumentation() {
   const theme = useTheme();
   const navigate = useNavigate();
   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

   // State for tabs/stepper
   const [activeStep, setActiveStep] = useState(0);

   // Define form steps
   const steps = [
      { label: "General Information", completed: false },
      { label: "Medical History", completed: false },
      { label: "Behavioral Observation", completed: false },
      { label: "Medication Management", completed: false },
   ];

   // Progress percentage calculation
   const progress = ((activeStep + 1) / steps.length) * 100;

   const { treatmentType, treatmentStatus, referralSource, categories, patient, documentName } =
      useAppSelector(state => state.treatmentDocumentation);

   // Handle tab change
   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
      setActiveStep(newValue);
   };

   // Handle step click
   const handleStepClick = (step: number) => {
      setActiveStep(step);
   };

   // Navigation functions for clearer code
   const goToPreviousStep = () => {
      if (activeStep > 0) {
         setActiveStep(activeStep - 1);
      } else {
         navigate(-1); // Go back if on first step
      }
   };

   const goToNextStep = () => {
      if (activeStep < steps.length - 1) {
         setActiveStep(activeStep + 1);
      }
   };

   // Get the active section component
   const getStepContent = (step: number) => {
      switch (step) {
         case 0:
            return (
               <>
                  <GeneralInformation />
                  <Box display='flex' gap={2} mt={3}>
                     <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2, width: '100%' }}>
                        <Box /> {/* Placeholder for potential content */}
                        <LocationInfo />
                     </Box>
                  </Box>
               </>
            );
         case 1:
            return <HistorySection />;
         case 2:
            return <BehavioralObservation />;
         case 3:
            return <MedicationManagement />;
         default:
            return <Box>Unknown step</Box>;
      }
   };

   return (
      <Box sx={{
         display: 'flex',
         flexDirection: 'column',
         minHeight: '100%',
         bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f8fa',
      }}>
         {/* Header Bar */}
         <AppBar
            position="static"
            elevation={0}
            sx={{
               bgcolor: 'background.paper',
               borderBottom: `1px solid ${theme.palette.divider}`,
               color: 'text.primary'
            }}
         >
            <Toolbar>
               <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => navigate(-1)}
                  aria-label="back"
               >
                  <ArrowBackIcon />
               </IconButton>
               <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <MedicalServicesIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                     {documentName || 'Treatment Documentation'}
                  </Typography>
                  {patient && (
                     <Typography variant="subtitle1" sx={{ ml: 2, opacity: 0.8 }}>
                        Patient: {patient}
                     </Typography>
                  )}
               </Box>
               <Box sx={{ flexGrow: 1 }} />
               <Button
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  onClick={() => navigate(paths.treatmentPlanning)}
                  sx={{ mr: 1 }}
               >
                  Create Treatment Plan
               </Button>
            </Toolbar>

            {/* Navigation Tabs for Mobile */}
            {isMobile && (
               <Box sx={{ px: 2 }}>
                  <Tabs
                     value={activeStep}
                     onChange={handleTabChange}
                     variant="scrollable"
                     scrollButtons="auto"
                     aria-label="treatment documentation sections"
                     textColor="primary"
                     indicatorColor="primary"
                     sx={{
                        '& .MuiTab-root': {
                           fontWeight: 500,
                           textTransform: 'none',
                           minHeight: 48,
                        }
                     }}
                  >
                     {steps.map((step, index) => (
                        <Tab key={index} label={step.label} />
                     ))}
                  </Tabs>
               </Box>
            )}

            {/* Progress indicator */}
            <LinearProgress
               variant="determinate"
               value={progress}
               sx={{
                  height: 3,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
               }}
            />
         </AppBar>         {/* Main Content */}
         <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            {/* Desktop Stepper - only visible on desktop */}
            {!isMobile && (
               <Stepper
                  activeStep={activeStep}
                  sx={{ mb: 4 }}
                  alternativeLabel
               >
                  {steps.map((step, index) => (
                     <Step key={index} completed={index < activeStep}>
                        <StepButton onClick={() => handleStepClick(index)}>
                           <StepLabel>{step.label}</StepLabel>
                        </StepButton>
                     </Step>
                  ))}
               </Stepper>
            )}

            {/* Clinical Alerts Banner */}
            <ClinicalAlertsBanner />

            <Card elevation={isMobile ? 0 : 1} sx={{ borderRadius: 2 }}>
               <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Fade in={true} timeout={300}>
                     <Box>
                        {/* Section title and progress indicator */}
                        <Box sx={{
                           display: 'flex',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           mb: 3
                        }}>
                           <Typography variant="h5" component="h2" fontWeight="500">
                              {steps[activeStep]?.label || "Treatment Documentation"}
                           </Typography>
                           <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              bgcolor: theme.palette.background.default,
                              py: 0.5,
                              px: 2,
                              borderRadius: 2
                           }}>
                              <Typography variant="body2" color="text.secondary" mr={1}>
                                 Step {activeStep + 1} of {steps.length}
                              </Typography>
                              <LinearProgress
                                 variant="determinate"
                                 value={progress}
                                 sx={{
                                    width: 100,
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                                 }}
                              />
                           </Box>
                        </Box>
                        {getStepContent(activeStep)}
                     </Box>
                  </Fade>
               </CardContent>
            </Card>

            {/* Navigation Controls */}
            <Box
               sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 2 : 0
               }}
            >
               <Button
                  variant="outlined"
                  onClick={goToPreviousStep}
                  startIcon={<ChevronLeftIcon />}
                  sx={{ width: isMobile ? '100%' : 'auto' }}
               >
                  {activeStep > 0 ? 'Previous' : 'Cancel'}
               </Button>

               {/* Step indicators for mobile */}
               {isMobile && (
                  <Box sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     gap: 0.5
                  }}>
                     {steps.map((_, index) => (
                        <Box
                           key={index}
                           onClick={() => handleStepClick(index)}
                           sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: index === activeStep
                                 ? 'primary.main'
                                 : index < activeStep
                                    ? 'primary.light'
                                    : theme.palette.mode === 'dark'
                                       ? 'rgba(255,255,255,0.2)'
                                       : 'rgba(0,0,0,0.1)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                 transform: 'scale(1.2)',
                              }
                           }}
                        />
                     ))}
                  </Box>
               )}

               {activeStep < steps.length - 1 ? (
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={goToNextStep}
                     endIcon={<ChevronRightIcon />}
                     sx={{ width: isMobile ? '100%' : 'auto' }}
                  >
                     Next
                  </Button>
               ) : (
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={() => categories === 'patientTreatment' ?
                        navigate('/cubex/billing', {
                           state: { treatmentType, treatmentStatus, referralSource }
                        }) : undefined}
                     startIcon={<SaveIcon />}
                     sx={{ width: isMobile ? '100%' : 'auto' }}
                  >
                     Complete & Save
                  </Button>
               )}            </Box>
         </Container>
      </Box>
   );
}
