import { Grid, Typography } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import RecentAppointmentsTable from './RecentAppointmentsTable';

export default function OrdersTableSection() {
  return (
    <Grid item lg={7.9}>
      <Typography variant='h5'>Recent Appointments</Typography>
      <MainCard sx={{ mt: 2 }} content={false}>
        <RecentAppointmentsTable />
      </MainCard>
    </Grid>
  );
}
