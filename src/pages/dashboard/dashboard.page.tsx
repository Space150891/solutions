import { Box, Grid, Typography } from '@mui/material';

import { IPages } from '../../types/common.types';
import StatsCardsRow from './components/StatsCardsRow';
import VisitorsChartSection from './components/VisitorsChartSection';
import OrdersTableSection from './components/OrdersTableSection';
import TransactionHistorySection from './components/TransactionHistorySection';
import AnalyticsReportSection from './components/AnalyticsReportSection';
import SalesReportSection from './components/SalesReportSection';
import PatientsReportSection from './components/PatientsReportSection';

export default function DashboardPage() {
   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>{`${IPages.DASHBOARD.toUpperCase()}`}</Typography>
         </Box>
         <StatsCardsRow />
         <VisitorsChartSection />
         <Grid container gap={1} sx={{ alignItems: 'flex-end' }} pt={1.25} pb={1.25}>
            <OrdersTableSection />
            <AnalyticsReportSection />
         </Grid>
         <Grid container gap={1} pt={1.25} pb={1.25}>
            <SalesReportSection />
            <TransactionHistorySection />
            <PatientsReportSection />
         </Grid>
      </Box>
   );
}
