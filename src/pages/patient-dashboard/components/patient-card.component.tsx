import { Box, Typography } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function PatientCard() {
   return (
      <MainCard contentSX={{ p: 2.25 }} sx={{ height: '100%' }}>
         <Grid2 container columns={3} spacing={2} sx={{ height: '100%' }}>
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
                        src={`/assets/patient_m.png`}
                        alt='pat'
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                  </Box>
                  <Typography variant='h6'>John Doe</Typography>
                  <Typography variant='caption'>Male</Typography>
               </Box>
            </Grid2>
            <Grid2 xs>
               <Grid2 container columns={2} spacing={1}>
                  <Grid2 xs={1}>
                     <Box
                        sx={{ backgroundColor: '#5ea8c942', display: 'flex' }}
                        p={2}
                        borderRadius={1}
                        flexDirection='column'
                        alignContent='center'
                        alignItems='center'
                        justifyItems='center'
                     >
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                           23 Years
                        </Typography>
                        <Typography variant='body2'>Age</Typography>
                     </Box>
                  </Grid2>
                  <Grid2 xs={1}>
                     <Box
                        sx={{ backgroundColor: '#5ea8c942', display: 'flex' }}
                        p={2}
                        borderRadius={1}
                        flexDirection='column'
                        alignContent='center'
                        alignItems='center'
                        justifyItems='center'
                     >
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                           AB-
                        </Typography>
                        <Typography variant='body2'>Blood Type</Typography>
                     </Box>
                  </Grid2>
                  <Grid2 xs={1}>
                     <Box
                        sx={{ backgroundColor: '#5ea8c942', display: 'flex' }}
                        p={2}
                        borderRadius={1}
                        flexDirection='column'
                        alignContent='center'
                        alignItems='center'
                        justifyItems='center'
                     >
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                           1.93
                        </Typography>
                        <Typography variant='body2'>Height (M)</Typography>
                     </Box>
                  </Grid2>
                  <Grid2 xs={1}>
                     <Box
                        sx={{ backgroundColor: '#5ea8c942', display: 'flex' }}
                        p={2}
                        borderRadius={1}
                        flexDirection='column'
                        alignContent='center'
                        alignItems='center'
                        justifyItems='center'
                     >
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                           84
                        </Typography>
                        <Typography variant='body2'>Weight (KG)</Typography>
                     </Box>
                  </Grid2>
               </Grid2>
            </Grid2>
         </Grid2>
      </MainCard>
   );
}
