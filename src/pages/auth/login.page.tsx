import { Controller } from 'react-hook-form';
import { Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material';
import { Google, LocalPostOffice } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useAuthLogic } from './auth.logic';
import { LoginServiceButton } from '../../components/login-service-button';
import { paths } from '../../routes/paths';

export default function LoginPage() {
   const { handlers } = useAuthLogic();

   return (
      <Stack direction='column' alignItems='center'>
         <Link to='/auth' style={{ padding: '45px' }}>
            C U B E X
         </Link>
         <Card
            sx={{
               maxWidth: '400px',
               width: '95vw',
               padding: '22px',
               gap: '8px',
               display: 'flex',
               flexDirection: 'column',
               mb: '10px',
            }}
         >
            <Typography>Sign in below.</Typography>
            <Box
               component='form'
               display='flex'
               flexDirection='column'
               onSubmit={handlers.handleSubmitLoginData}
            >
               <Controller
                  name='email'
                  control={handlers.loginFormControl}
                  render={({ field, fieldState }) => (
                     <TextField
                        autoComplete='off'
                        placeholder='Email'
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        sx={{ mb: '26px' }}
                     />
                  )}
               />

               <Controller
                  name='password'
                  control={handlers.loginFormControl}
                  render={({ field, fieldState }) => (
                     <TextField
                        autoComplete='off'
                        placeholder='Password'
                        type='password'
                        sx={{ mb: '26px' }}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                     />
                  )}
               />
               <Button type='submit' variant='contained'>
                  Login
               </Button>
            </Box>
            <Box display={'flex'} alignItems='center' justifyContent='center'>
               <Divider sx={{ width: '40%' }} />
               <Typography sx={{ padding: '0 8px' }}>or</Typography>
               <Divider sx={{ width: '40%' }} />
            </Box>
            <Box display={'flex'} gap={1.5} flexDirection={'column'}>
               <LoginServiceButton startIcon={<Google />}>Sign in with Google</LoginServiceButton>
               <LoginServiceButton startIcon={<LocalPostOffice />}>Sign In With Office365</LoginServiceButton>
            </Box>
         </Card>
         <Typography>
            First Time Here? <Link to={paths.auth}>Create an account</Link>
         </Typography>
      </Stack>
   );
}
