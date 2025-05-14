import { useState } from 'react';
import { Box, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { IPages } from '../../types/common.types';
import { MainCard } from '../../components/cards/main-card.component';
import { NumberColumnChart } from '../../components/charts/number-column-chart.component copy';
import { AgeDistributionChart } from '../../components/charts/age-distribution-chart.component.tsx';
import { GenderPieChart } from '../../components/charts/gender-pie-chart.component.tsx';
import { DiseaseBarChart } from '../../components/charts/disease-bar-chart.component.tsx';

export type IPeriod = 'today' | 'week' | 'month' | 'year';

const periodOptions = [
   { value: 'today', label: 'Today' },
   { value: 'week', label: 'This Week' },
   { value: 'month', label: 'This Month' },
];

export default function MedicalStatsPage() {
   const [period, setPeriod] = useState<IPeriod>('today');

   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>{`${IPages.MEDICAL_STATS.toUpperCase()}`}</Typography>
         </Box>

         <Grid container spacing={2} gap={1}>
            <Grid item xs={12} lg={7.9}>
               <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h5'>Patients per {period}</Typography>
                  <TextField
                     select
                     size='small'
                     value={period}
                     onChange={(e) => setPeriod(e.target.value as IPeriod)}
                     sx={{ width: 150 }}
                  >
                     {periodOptions.map((option) => (
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
                  <NumberColumnChart period={period} />
               </MainCard>
            </Grid>

            <Grid item xs={15} lg={4} mt={5.4}>
               <MainCard sx={{ mt: 2 }}>
                  <GenderPieChart />
               </MainCard>
            </Grid>
            <Grid item xs={12} lg={5.9}>
               <MainCard sx={{ mt: 2 }}>
                  <AgeDistributionChart />
               </MainCard>
            </Grid>

            <Grid item xs={12} lg={6}>
               <MainCard sx={{ mt: 2 }}>
                  <DiseaseBarChart />
               </MainCard>
            </Grid>
         </Grid>
      </Box>
   );
}
