import { SyntheticEvent, useState } from 'react';
import { Box, Button, Card, Divider, Stack, TextField, Typography } from '@mui/material';
import { Google, LocalPostOffice } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { LoginServiceButton } from '../../components/login-service-button';
import { paths } from '../../routes/paths';

export default function AuthPage() {
   const [email, setEmail] = useState('');
   const [error] = useState(false);

   const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
   };
   console.log('re', error);
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
            <Typography>Enter your email to get started.</Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3} onSubmit={handleSubmit}>
               <TextField
                  autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='john.doe@gmail.com'
                  error={error}
                  helperText={error ? 'Wrong credentials' : ''}
               />
               <Button type='submit' variant='contained'>
                  Sign Up
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
            Already have an account? <Link to={paths.login}>Login</Link>
         </Typography>
      </Stack>
   );
}
