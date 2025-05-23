import { Grid } from '@mui/material';
import { AnalyticEcommerce } from '../../../components/cards/analytic-ecommerse.component';

export default function StatsCardsRow() {
  return (
    <Grid container rowSpacing={1} columnSpacing={1} gap={1} sx={{ justifyContent: 'space-between' }}>
      <Grid item lg={2.9} sm={5.9}>
        <AnalyticEcommerce title='Total Page Views' count='4,42,236' percentage={59.3} extra='35,000' />
      </Grid>
      <Grid item lg={2.9} sm={5.9}>
        <AnalyticEcommerce title='Total Users' count='78,250' percentage={70.5} extra='8,900' />
      </Grid>
      <Grid item lg={2.9} sm={5.9}>
        <AnalyticEcommerce title='Total Order' count='18,800' percentage={27.4} isLoss color='warning' extra='1,943' />
      </Grid>
      <Grid item lg={2.9} sm={5.9}>
        <AnalyticEcommerce title='Total Sales' count='$35,078' percentage={27.4} isLoss color='warning' extra='$20,395' />
      </Grid>
    </Grid>
  );
}
