import { TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function InsuranceInformation() {
   return (
      <Grid2 container columnSpacing={1} columns={12} rowSpacing={2}>
         <Grid2 xs={6}>
            <TextField label='Insurance Name' variant='filled' fullWidth />
         </Grid2>
         <Grid2 xs={6}>
            <TextField label='Type' variant='filled' fullWidth />
         </Grid2>
         <Grid2 xs={6}>
            <TextField label='Address' variant='filled' fullWidth />
         </Grid2>
         <Grid2 xs={6}>
            <TextField label='Social Security Number' variant='filled' fullWidth />
         </Grid2>
      </Grid2>
   );
}
