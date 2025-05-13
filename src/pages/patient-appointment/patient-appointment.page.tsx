import { Autocomplete, Box, Card, Grid, TextField, Typography, styled } from '@mui/material';
import { specializations } from '../patient-list/mock';
import { doctors } from './mock';
import { lazy, Suspense } from 'react';

const AppointmentCalendar = lazy(() => import('./components/AppointmentCalendar.component'));

import { useCallback, useMemo, useState } from 'react';
import { IPatientDoctor } from '../patient-list/types';

const Item = styled('div')(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

const getUniqueLocations = (doctors: IPatientDoctor[]) => {
   const locationsSet = new Set<string>();
   doctors.forEach((doc) => doc.locations && doc.locations.forEach((loc) => locationsSet.add(loc)));
   return Array.from(locationsSet);
};

export default function PatientAppointment() {
   const [filteredList, setFilteredList] = useState<IPatientDoctor[]>([]);
   const [specialization, setSpecialization] = useState<string | null>(null);
   const [fullName, setFullName] = useState<string | null>(null);
   const [location, setLocation] = useState<string | null>(null);

   const handleSetLocation = (value: string | null) => {
      setLocation(value);
   };

   const handleSetSpecialization = (value: string | null) => {
      setSpecialization(value);
   };

   const handleSetFullName = (value: string | null) => {
      setFullName(value);
   };

   const applyFilters = useCallback(
      (array: IPatientDoctor[]): IPatientDoctor[] => {
         return array.filter((doc) => {
            const fullNameMatches = fullName ? `${doc.first_name} ${doc.last_name}` === fullName : true;
            const specializationMatches = specialization ? doc.specialization === specialization : true;

            const locationMatches = location ? doc.locations?.includes(location) ?? false : true;

            return fullNameMatches && specializationMatches && locationMatches;
         });
      },
      [fullName, specialization, location],
   );

   useMemo(() => {
      if (doctors) {
         setFilteredList(doctors);
      }

      setFilteredList(applyFilters(doctors));
   }, [applyFilters]);

   const listOfDoctorNames = useMemo(() => doctors.map((doc) => `${doc.first_name} ${doc.last_name}`), []);
   const listOfLocations = useMemo(() => getUniqueLocations(doctors), []);

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
                        id='locations'
                        options={listOfLocations}
                        fullWidth
                        value={location}
                        onChange={(_e, value) => handleSetLocation(value)}
                        renderInput={(params) => (
                           <TextField {...params} variant='outlined' label='Location' />
                        )}
                     />
                  </Item>
               </Grid>
               <Grid item xs={4}>
                  <Item>
                     <Autocomplete
                        freeSolo
                        id='specializations'
                        options={specializations}
                        fullWidth
                        value={specialization}
                        onChange={(_e, value) => handleSetSpecialization(value)}
                        renderInput={(params) => (
                           <TextField {...params} variant='outlined' label='Specialization' />
                        )}
                     />
                  </Item>
               </Grid>
               <Grid item xs={4}>
                  <Item>
                     <Autocomplete
                        freeSolo
                        id='Name'
                        options={listOfDoctorNames}
                        fullWidth
                        value={fullName}
                        onChange={(_e, value) => handleSetFullName(value)}
                        renderInput={(params) => <TextField {...params} variant='outlined' label='Name' />}
                     />
                  </Item>
               </Grid>
               <Grid item xs={12}>
                  <Item>
                     <Typography variant='caption'>
                        Select a doctor from the list to make an appointment.
                     </Typography>
                  </Item>
               </Grid>
            </Grid>
         </Card>
         <Box sx={{ mb: 2.25 }}>
            {filteredList.length === 0 && (
               <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant='h6' color='textSecondary'>
                     No doctors found. Try adjusting your filters to see more options.
                  </Typography>
               </Box>
            )}
            {filteredList.map((doctor) => {
               return (
                  <Card sx={{ padding: '10px' }} key={doctor.doctor_id}>
                     <Grid container spacing={2}>
                        <Grid item xs={7} sx={{ display: 'flex' }}>
                           <Box
                              sx={{
                                 height: '80%',
                                 aspectRatio: 1,
                                 padding: '10px',
                                 maxHeight: '100%',
                              }}
                           >
                              <img
                                 src={`/assets/doctor${doctor.gender === 'Male' ? '_m' : '_f'}.png`}
                                 alt='doc'
                                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                           </Box>
                           <Box>
                              <Typography variant='caption'>{doctor.specialization}</Typography>
                              <Typography variant='h6'>
                                 {doctor.first_name} {doctor.last_name}
                              </Typography>
                              <Typography variant='caption' fontWeight={100}>
                                 {doctor.gender}
                              </Typography>
                              <Typography variant='body1' fontWeight={500}>
                                 {doctor.description}
                              </Typography>
                              <Typography variant='caption' color='primary'>
                                 Locations: {doctor.locations?.join(', ')}
                              </Typography>
                           </Box>
                        </Grid>
                        <Grid item xs={5}>
                           <Suspense fallback={<div>Loading...</div>}>
                              <AppointmentCalendar doctor={doctor} />
                           </Suspense>
                        </Grid>
                     </Grid>
                  </Card>
               );
            })}
         </Box>
      </Box>
   );
}
