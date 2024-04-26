import { Autocomplete, Box, Card, Grid, TextField, Typography, styled } from '@mui/material';
import { specializations } from '../patient-list/mock';
import { doctors } from './mock';

import AppointmentCalendar from './components/AppointmentCalendar.component';
import { useCallback, useEffect, useState } from 'react';
import { IPatientDoctor } from '../patient-list/types';

const Item = styled('div')(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

export default function PatientAppointment() {
   const [filteredList, setFilteredList] = useState<IPatientDoctor[]>([]);
   const [specialization, setSpecialization] = useState<string | null>(null);
   const [fullName, setFullName] = useState<string | null>(null);

   const applyFilters = useCallback(
      (array: IPatientDoctor[]): IPatientDoctor[] => {
         return array.filter((doc) => {
            const fullNameMatches = fullName ? `${doc.first_name} ${doc.last_name}` === fullName : true;
            const specializationMatches = specialization ? doc.specialization === specialization : true;
            return fullNameMatches && specializationMatches;
         });
      },
      [fullName, specialization],
   );

   useEffect(() => {
      if (doctors) setFilteredList(doctors);
   }, []);

   useEffect(() => {
      setFilteredList(applyFilters(doctors));
   }, [applyFilters]);

   const listOfDoctorNames = doctors.map((doc) => `${doc.first_name} ${doc.last_name}`);

   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>Make an Appointment</Typography>
         </Box>
         <Card sx={{ mb: 2.25, padding: '10px' }}>
            <Grid container spacing={2}>
               <Grid item xs={4}>
                  <Item>
                     <Autocomplete
                        freeSolo
                        id='specializations'
                        options={specializations}
                        fullWidth
                        value={specialization}
                        onChange={(e, value) => setSpecialization(value)}
                        renderInput={(params) => (
                           <TextField {...params} variant='outlined' label='Specialization' />
                        )}
                     />
                  </Item>
               </Grid>
               <Grid item xs={8}>
                  <Item>
                     <Autocomplete
                        freeSolo
                        id='Name'
                        options={listOfDoctorNames}
                        fullWidth
                        value={fullName}
                        onChange={(e, value) => setFullName(value)}
                        renderInput={(params) => <TextField {...params} variant='outlined' label='Name' />}
                     />
                  </Item>
               </Grid>
            </Grid>
         </Card>
         <Box sx={{ mb: 2.25 }}>
            {filteredList.map((doctor) => {
               return (
                  <Card sx={{ padding: '10px' }}>
                     <Grid container spacing={2}>
                        <Grid item xs={7}>
                           <Box sx={{ mb: 1.25 }}>
                              <Typography variant='caption'>{doctor.specialization}</Typography>
                              <Typography variant='h6'>
                                 {doctor.first_name} {doctor.last_name}
                              </Typography>
                              <Typography variant='caption' fontWeight={100}>
                                 {doctor.gender}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid item xs={5}>
                           <AppointmentCalendar doctor={doctor} />
                        </Grid>
                     </Grid>
                  </Card>
               );
            })}
         </Box>
      </Box>
   );
}
