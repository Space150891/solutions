import { Grid, Stack, TextField, Typography, MenuItem } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { SalesColumnChart } from '../../../components/charts/sales-column-chart.component';
import { useState } from 'react';

const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

type IPeriod = 'today' | 'month' | 'year';

export default function SalesReportSection() {
  const [value, setValue] = useState<IPeriod>('today');
  return (
    <Grid item lg={7}>
      <Stack alignItems='center' justifyContent='space-between' direction='row'>
        <Typography variant='h5'>Sales Report</Typography>
        <TextField
          id='standard-select-currency'
          size='small'
          select
          value={value}
          onChange={(e) => setValue(e.target.value as IPeriod)}
          sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
        >
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <MainCard sx={{ mt: 1.75 }}>
        <Stack spacing={1.5} sx={{ mb: -12 }}>
          <Typography variant='h6' color='secondary'>
            Net Profit
          </Typography>
          <Typography variant='h4'>$1560</Typography>
        </Stack>
        <SalesColumnChart period={value} />
      </MainCard>
    </Grid>
  );
}
