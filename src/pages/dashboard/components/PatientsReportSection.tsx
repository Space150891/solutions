import { Grid, Stack, TextField, Typography, MenuItem } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { NumberColumnChart } from '../../../components/charts/number-column-chart.component copy';
import { useState } from 'react';

const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

type IPeriod = 'today' | 'month' | 'year';

export default function PatientsReportSection() {
  const [value, setValue] = useState<IPeriod>('today');
  return (
    <Grid item lg={7}>
      <Stack alignItems='center' justifyContent='space-between' direction='row'>
        <Typography variant='h5'>Number of patients and where they are treated</Typography>
        <TextField
          id='standard-number-currency'
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
      <MainCard sx={{ mt: 1.75, p: 2 }}>
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Typography variant='h6' color='secondary'>
            Number of patients
          </Typography>
          <Typography variant='h4'>2738</Typography>
        </Stack>
        <NumberColumnChart period={value} />
      </MainCard>
    </Grid>
  );
}
