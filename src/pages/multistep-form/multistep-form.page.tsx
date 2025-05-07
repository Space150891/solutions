import {
   Box,
   Stack,
   Step,
   useTheme,
   Stepper,
   Typography,
   StepLabel,
   StepIconProps,
   Button,
} from '@mui/material';
import { Filter9PlusRounded } from '@mui/icons-material';

import { IPages } from '../../types/common.types';
import { FormEvent, useState } from 'react';
import { useMultistepForm } from './multistep-form.logic';
import { UserForm } from './components/use-form.component';
import { PersonalForm } from './components/personal-form.component';
import { type FormData } from './types';
import { AddressForm } from './components/account-form.component';

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

export default function MultistepFormPage() {
   const { palette } = useTheme();
   const [data, setData] = useState(INITIAL_DATA);

   function updateFields(fields: Partial<FormData>) {
      setData((prev) => {
         return { ...prev, ...fields };
      });
   }

   const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <PersonalForm {...data} updateFields={updateFields} />,
   ]);

   function onSubmit(e: FormEvent) {
      e.preventDefault();
      if (!isLastStep) return next();
   }

   function StepIcon(props: StepIconProps) {
      const { active, className } = props;

      return <Filter9PlusRounded sx={{ color: active ? '#fff' : 'black' }} className={className} />;
   }

   return (
      <Box component='section'>
         <Box>
            <Typography variant='h5'>{IPages.MULTISTEP_FORM}</Typography>
         </Box>
         <Stack direction='row' justifyContent='space-between' padding='40px' width='60%' margin='0 auto'>
            <Box>
               <Stepper
                  activeStep={currentStepIndex}
                  orientation='vertical'
                  sx={{
                     '& .MuiStep-root': {
                        cursor: 'pointer',
                     },
                     '& .MuiStepLabel-root': {
                        padding: 0,
                        '& .MuiStepLabel-iconContainer': {
                           paddingRight: 0,
                           background: palette.primary.main,
                           width: '44px',
                           height: '44px',
                           justifyContent: 'center',
                           alignItems: 'center',
                           borderRadius: '50%',
                           '&.Mui-active': {
                              cursor: 'pointer',
                           },
                           '&.Mui-disabled': {
                              cursor: 'pointer',
                           },
                        },
                     },
                     '& .MuiStepConnector-root': {
                        marginLeft: '21px',
                        '&.Mui-disabled': {
                           cursor: 'pointer',
                           '& > span': {
                              minHeight: '48px',
                           },
                        },
                     },
                  }}
               >
                  {steps.map((_, index) => (
                     <Step key={index} onClick={() => goTo(index)}>
                        <StepLabel StepIconComponent={StepIcon} />
                     </Step>
                  ))}
               </Stepper>
            </Box>
            <Box>
               <Box component='form' onSubmit={onSubmit}>
                  {step}
                  <div
                     style={{
                        marginTop: '1rem',
                        display: 'flex',
                        gap: '.5rem',
                        justifyContent: 'flex-end',
                     }}
                  >
                     {!isFirstStep && (
                        <Button variant='text' type='button' onClick={back}>
                           Back
                        </Button>
                     )}
                     <Button variant='contained' type='submit'>
                        {isLastStep ? 'Finish' : 'Next'}
                     </Button>
                  </div>
               </Box>
            </Box>
         </Stack>
      </Box>
   );
}
