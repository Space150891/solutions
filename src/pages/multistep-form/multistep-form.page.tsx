import {
   Box,
   Container,
   Paper,
   Stepper,
   Step,
   StepLabel,
   Button,
   Typography,
   LinearProgress,
   Card,
   CardContent,
   Fade,
   useTheme,
   useMediaQuery,
   Chip,
} from '@mui/material';
import {
   Person as PersonIcon,
   Home as HomeIcon,
   ContactPhone as ContactIcon,
   CheckCircle as CheckIcon,
   ArrowBack as ArrowBackIcon,
   ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

import { IPages } from '../../types/common.types';
import { FormEvent, useState } from 'react';
import { useMultistepForm } from './multistep-form.logic';
import { UserForm } from './components/use-form.component';
import { PersonalForm } from './components/personal-form.component';
import { AddressForm } from './components/account-form.component';
import { CompletionSummary } from './components/completion-summary.component.tsx';
import { type FormData } from './types';

const INITIAL_DATA: FormData = {
   firstName: '',
   lastName: '',
   age: '',
   street: '',
   city: '',
   state: '',
   zip: '',
   email: '',
   password: '',
   phone: '',
   gender: '',
   nationality: '',
   occupation: '',
};

const stepConfig = [
   {
      label: 'Personal Details',
      description: 'Tell us about yourself',
      icon: PersonIcon,
   },
   {
      label: 'Address Information',
      description: 'Where do you live?',
      icon: HomeIcon,
   },
   {
      label: 'Contact & Additional',
      description: 'How can we reach you?',
      icon: ContactIcon,
   },
];

export default function MultistepFormPage() {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
   const [data, setData] = useState(INITIAL_DATA);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isCompleted, setIsCompleted] = useState(false);
   const [errors, setErrors] = useState<Partial<FormData>>({});

   function updateFields(fields: Partial<FormData>) {
      setData((prev) => ({ ...prev, ...fields }));
      // Clear errors for updated fields
      const updatedErrors = { ...errors };
      Object.keys(fields).forEach(key => {
         delete updatedErrors[key as keyof FormData];
      });
      setErrors(updatedErrors);
   }

   function validateStep(stepIndex: number): boolean {
      const newErrors: Partial<FormData> = {};

      switch (stepIndex) {
         case 0: // Personal Details
            if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!data.age || parseInt(data.age) < 1) newErrors.age = 'Valid age is required';
            break;
         case 1: // Address
            if (!data.street.trim()) newErrors.street = 'Street address is required';
            if (!data.city.trim()) newErrors.city = 'City is required';
            if (!data.state.trim()) newErrors.state = 'State is required';
            if (!data.zip.trim()) newErrors.zip = 'ZIP code is required';
            break;
         case 2: // Personal Info
            if (!data.email.trim()) newErrors.email = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
               newErrors.email = 'Valid email is required';
            }
            if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
            if (!data.gender) newErrors.gender = 'Gender selection is required';
            break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   }

   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm([
      <UserForm {...data} updateFields={updateFields} errors={errors} />,
      <AddressForm {...data} updateFields={updateFields} errors={errors} />,
      <PersonalForm {...data} updateFields={updateFields} errors={errors} />,
   ]);

   async function onSubmit(e: FormEvent) {
      e.preventDefault();

      if (!validateStep(currentStepIndex)) return;

      if (!isLastStep) {
         next();
         return;
      }

      // Final submission
      setIsSubmitting(true);
      try {
         // Simulate API call
         await new Promise(resolve => setTimeout(resolve, 2000));
         setIsCompleted(true);
      } catch (error) {
         console.error('Submission failed:', error);
      } finally {
         setIsSubmitting(false);
      }
   }

   function handleStepClick(stepIndex: number) {
      if (stepIndex < currentStepIndex) {
         goTo(stepIndex);
      }
   }

   const progress = ((currentStepIndex + 1) / steps.length) * 100;

   if (isCompleted) {
      return (
         <Container maxWidth="md" sx={{ py: 4 }}>
            <CompletionSummary data={data} onEdit={() => setIsCompleted(false)} />
         </Container>
      );
   }

   return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
         <Fade in timeout={600}>
            <Box>
               {/* Header */}
               <Box textAlign="center" mb={4}>
                  <Typography variant="h3" fontWeight="bold" gutterBottom>
                     {IPages.MULTISTEP_FORM}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" mb={3}>
                     Complete your registration in {steps.length} simple steps
                  </Typography>

                  {/* Progress Bar */}
                  <Box mb={2}>
                     <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                           Step {currentStepIndex + 1} of {steps.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {Math.round(progress)}% complete
                        </Typography>
                     </Box>
                     <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                           height: 8,
                           borderRadius: 4,
                           bgcolor: 'rgba(0,0,0,0.1)',
                           '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                           }
                        }}
                     />
                  </Box>
               </Box>

               <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={4}>
                  {/* Stepper - Mobile: Horizontal, Desktop: Vertical */}
                  <Box width={isMobile ? '100%' : 300} mb={isMobile ? 3 : 0}>
                     <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
                        <Stepper
                           activeStep={currentStepIndex}
                           orientation={isMobile ? 'horizontal' : 'vertical'}
                           sx={{
                              '& .MuiStepLabel-root': {
                                 cursor: 'pointer'
                              }
                           }}
                        >
                           {stepConfig.map((config, index) => {
                              const StepIcon = config.icon;
                              const isCompleted = index < currentStepIndex;
                              const isActive = index === currentStepIndex;

                              return (
                                 <Step key={config.label} onClick={() => handleStepClick(index)}>
                                    <StepLabel
                                       StepIconComponent={() => (
                                          <Box
                                             sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: isCompleted
                                                   ? 'success.main'
                                                   : isActive
                                                      ? 'primary.main'
                                                      : 'grey.300',
                                                color: isCompleted || isActive ? 'white' : 'grey.600',
                                                transition: 'all 0.3s ease',
                                                cursor: index < currentStepIndex ? 'pointer' : 'default',
                                             }}
                                          >
                                             {isCompleted ? <CheckIcon /> : <StepIcon />}
                                          </Box>
                                       )}
                                    >
                                       {!isMobile && (
                                          <Box>
                                             <Typography variant="subtitle1" fontWeight="medium">
                                                {config.label}
                                             </Typography>
                                             <Typography variant="body2" color="text.secondary">
                                                {config.description}
                                             </Typography>
                                          </Box>
                                       )}
                                    </StepLabel>
                                 </Step>
                              );
                           })}
                        </Stepper>
                     </Paper>
                  </Box>

                  {/* Form Content */}
                  <Box flex={1}>
                     <Card elevation={3} sx={{ minHeight: 400 }}>
                        <CardContent sx={{ p: 4 }}>
                           <Box mb={3}>
                              <Box display="flex" alignItems="center" gap={1} mb={1}>
                                 <Chip
                                    label={`Step ${currentStepIndex + 1}`}
                                    size="small"
                                    color="primary"
                                 />
                                 <Typography variant="h5" fontWeight="bold">
                                    {stepConfig[currentStepIndex].label}
                                 </Typography>
                              </Box>
                              <Typography variant="body1" color="text.secondary">
                                 {stepConfig[currentStepIndex].description}
                              </Typography>
                           </Box>

                           <Box component="form" onSubmit={onSubmit}>
                              <Fade in key={currentStepIndex} timeout={300}>
                                 <Box>{step}</Box>
                              </Fade>

                              <Box
                                 display="flex"
                                 justifyContent="space-between"
                                 alignItems="center"
                                 mt={4}
                                 pt={3}
                                 borderTop={1}
                                 borderColor="divider"
                              >
                                 <Button
                                    onClick={back}
                                    disabled={isFirstStep || isSubmitting}
                                    startIcon={<ArrowBackIcon />}
                                    sx={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
                                 >
                                    Back
                                 </Button>

                                 <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    endIcon={isLastStep ? <CheckIcon /> : <ArrowForwardIcon />}
                                    disabled={isSubmitting}
                                    sx={{
                                       minWidth: 120,
                                       py: 1.5,
                                       px: 3,
                                    }}
                                 >
                                    {isSubmitting ? 'Submitting...' : isLastStep ? 'Complete' : 'Next'}
                                 </Button>
                              </Box>
                           </Box>
                        </CardContent>
                     </Card>
                  </Box>
               </Box>
            </Box>
         </Fade>
      </Container>
   );
}
