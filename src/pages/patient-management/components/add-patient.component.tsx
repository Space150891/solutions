import {
   Box,
   Button,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { IManagePatient } from '../mock';

type AddPatientProps = {
   addPatient: (newPatient: IManagePatient) => void;
   nextId: number;
};

export default function AddPatient({ addPatient, nextId }: AddPatientProps) {
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [phoneNumber, setPhoneNumber] = useState<string>('');
   const [gender, setGender] = useState<'Male' | 'Female' | null>(null);
   const [dob, setDob] = useState<Dayjs | null>(null);

   const handleChange = (event: SelectChangeEvent<typeof gender>) => {
      if (event.target.value === 'Male' || event.target.value === 'Female') {
         setGender(event.target.value);
      }
   };
   const handlSubmit = () => {
      if (
         firstName.trim().length === 0 ||
         lastName.trim().length === 0 ||
         email.trim().length === 0 ||
         phoneNumber.trim().length === 0 ||
         !gender ||
         !dob
      ) {
         return;
      }
      addPatient({
         id: nextId + 1,
         first_name: firstName,
         last_name: lastName,
         email: email,
         gender,
         phone_number: phoneNumber,
         date_of_birth: dob.format('MM/DD/YYYY'),
      });
   };

   return (
      <Box maxWidth={'60%'} margin={'0 auto'}>
         <Grid2 container columnSpacing={1} columns={6} rowSpacing={2}>
            <Grid2 xs={6}>
               <TextField
                  label='First Name'
                  variant='filled'
                  fullWidth
                  value={firstName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setFirstName(event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={6}>
               <TextField
                  label='Last Name'
                  variant='filled'
                  fullWidth
                  value={lastName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setLastName(event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={3}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     label='Date of Birth'
                     value={dob}
                     onChange={(newValue) => setDob(newValue)}
                     sx={{ width: '100%' }}
                  />
               </LocalizationProvider>
            </Grid2>
            <Grid2 xs={3}>
               <FormControl fullWidth>
                  <InputLabel id='gender-select-label'>Gender</InputLabel>
                  <Select
                     labelId='gender-select-label'
                     id='gender-select'
                     value={gender}
                     label='Gender'
                     onChange={handleChange}
                     sx={{ height: '45px' }}
                  >
                     <MenuItem value='Male'>Male</MenuItem>
                     <MenuItem value='Female'>Female</MenuItem>
                  </Select>
               </FormControl>
            </Grid2>
            <Grid2 xs={3}>
               <TextField
                  label='Phone number'
                  variant='outlined'
                  fullWidth
                  value={phoneNumber}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setPhoneNumber(event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={3}>
               <TextField
                  label='Email'
                  variant='outlined'
                  fullWidth
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setEmail(event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={6}>
               <Button variant='contained' fullWidth onClick={handlSubmit}>
                  Add New Patient
               </Button>
            </Grid2>
         </Grid2>
      </Box>
   );
}
