import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { MainCard } from '../../../components/cards/main-card.component';
import { Box, Typography } from '@mui/material';

export default function HomeAddress() {
   return (
      <MainCard contentSX={{ p: 2.25 }} sx={{ height: '100%' }}>
         <Grid2 container columns={3} spacing={2} sx={{ height: '100%' }}>
            <Grid2 xs={3}>
               <Typography variant='h5'>Home Address:</Typography>
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
                        src={`/assets/home_maps.png`}
                        alt='pat'
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                  </Box>
               </Box>
            </Grid2>
            <Grid2 xs>
               <Grid2 container columns={1} spacing={1}>
                  <Grid2 xs={1}>
                     <Typography variant='body1'>Sweden</Typography>
                     <Typography variant='caption'>Stockholm</Typography>
                  </Grid2>
                  <Grid2 xs={1}>
                     <Typography variant='h6'>Johannesfredsvägen</Typography>
                     <Typography variant='caption'>168 68 Bromma</Typography>
                  </Grid2>
               </Grid2>
            </Grid2>
         </Grid2>
      </MainCard>
   );
}
