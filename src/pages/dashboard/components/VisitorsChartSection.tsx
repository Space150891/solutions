import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { IncomeAreaChart } from '../../../components/charts/income-area-chart.component';
import { MonthlyBarChart } from '../../../components/charts/monthly-bar-chart.component';
import { useState } from 'react';

export default function VisitorsChartSection() {
  const [slot, setSlot] = useState<'month' | 'week'>('week');
  return (
    <Grid container gap={1} sx={{ alignItems: 'flex-end' }} pt={1.25} pb={1.25}>
      <Grid item lg={6.9}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>Unique Visitor</Typography>
          <Box>
            <Button
              size='small'
              onClick={() => setSlot('month')}
              color={slot === 'month' ? 'primary' : 'secondary'}
              variant={slot === 'month' ? 'outlined' : 'text'}
            >
              Month
            </Button>
            <Button
              size='small'
              onClick={() => setSlot('week')}
              color={slot === 'week' ? 'primary' : 'secondary'}
              variant={slot === 'week' ? 'outlined' : 'text'}
            >
              Week
            </Button>
          </Box>
        </Stack>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item lg={5}>
        <MainCard sx={{ mt: 1.5 }} content={false}>
          <Box sx={{ p: '0 16px' }}>
            <Stack spacing={2}>
              <Typography variant='h6' color='textSecondary'>
                This Week Statistics
              </Typography>
              <Typography variant='h3' sx={{ marginTop: '5px !important' }}>
                $7,650
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
    </Grid>
  );
}
