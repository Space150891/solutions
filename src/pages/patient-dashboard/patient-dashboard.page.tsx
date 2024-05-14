import { Box, Button, Stack, Typography } from '@mui/material';
import { MainCard } from '../../components/cards/main-card.component';
import { IPages } from '../../types/common.types';
import PatientCard from './components/patient-card.component';
import AssignedDoctorCard from './components/assigned-doctor.component';
import HomeAddress from './components/hame-address.component';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import IllnessHistory from './components/illness-history.component';
import AppointmentHistory from './components/appointments-history.component';

export default function PatientDashboard() {
   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>{`${IPages.PATIENT_DASHBOARD.toUpperCase()}`}</Typography>
         </Box>
         <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }} alignItems='stretch'>
            <Grid2 lg={4} sm={6}>
               <PatientCard />
            </Grid2>
            <Grid2 lg={4} sm={6}>
               <AssignedDoctorCard />
            </Grid2>
            <Grid2 lg={4} sm={6}>
               <HomeAddress />
            </Grid2>
         </Grid2>
         <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
            <Grid2 lg={4} sm={6}>
               <IllnessHistory />
            </Grid2>
            <Grid2 lg={8} sm={6}>
               <AppointmentHistory />
            </Grid2>
         </Grid2>
      </Box>
   );
}
