import { Grid, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { ReportAreaChart } from '../../../components/charts/report-area-chart.component';

export default function AnalyticsReportSection() {
  return (
    <Grid item lg={4}>
      <Typography variant='h5'>Analytics Report</Typography>
      <MainCard sx={{ mt: 2 }} content={false}>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
          <ListItemButton divider>
            <ListItemText primary='Company Finance Growth' />
            <Typography variant='h5'>+45.14%</Typography>
          </ListItemButton>
          <ListItemButton divider>
            <ListItemText primary='Company Expenses Ratio' />
            <Typography variant='h5'>0.58%</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary='Business Risk Cases' />
            <Typography variant='h5'>Low</Typography>
          </ListItemButton>
        </List>
        <ReportAreaChart />
      </MainCard>
    </Grid>
  );
}
