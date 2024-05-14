import { Box, Typography } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function AssignedDoctorCard() {
   return (
      <MainCard contentSX={{ p: 2.25 }} sx={{ height: '100%' }}>
         <Grid2 container columns={3} spacing={2} sx={{ height: '100%' }}>
            <Grid2 xs={3}>
               <Typography variant='h5'>Assigned doctor:</Typography>
            </Grid2>
            <Grid2 xs={1}>
               <Box>
                  <Box
                     sx={{
                        aspectRatio: 1,
                        overflow: 'hidden',
                     }}
                     borderRadius={1}
                  >
                     <img
                        src={`/assets/doctor_m.png`}
                        alt='pat'
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                  </Box>
               </Box>
            </Grid2>
            <Grid2 xs>
               <Grid2 container columns={1} spacing={1}>
                  <Grid2 xs={1}>
                     <Typography variant='h6'>Elvis Precisely</Typography>
                     <Typography variant='caption'>Male</Typography>
                  </Grid2>

                  <Grid2 xs={1}>
                     <Typography variant='body1'>Oncologist</Typography>
                     <Typography variant='caption'>at St. Peters National Hospital</Typography>
                  </Grid2>
               </Grid2>
            </Grid2>
         </Grid2>
      </MainCard>
   );
}
