import Chart from 'react-apexcharts';
import { Box, Typography, useTheme } from '@mui/material';
import { getAgeDistributionOptions } from '../../constants/chart-options';
import { ChartContainer } from '../common';

export const AgeDistributionChart = () => {
   const theme = useTheme();
   const options = getAgeDistributionOptions(theme);
   const series = [
      {
         name: 'Patients',
         data: [120, 300, 250, 180, 95],
      },
   ];

   return (
      <Box>
         <Typography variant="h6" gutterBottom>
            Age Distribution
         </Typography>
         <ChartContainer height="320px">
            <Chart options={options} series={series} type='bar' height={300} />
         </ChartContainer>
      </Box>
   );
};
