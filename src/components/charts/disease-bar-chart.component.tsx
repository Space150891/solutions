import Chart from 'react-apexcharts';
import { Box, Typography, useTheme } from '@mui/material';
import { getDiseaseDistributionOptions } from '../../constants/chart-options';
import { ChartContainer } from '../common';

export const DiseaseBarChart = () => {
   const theme = useTheme();
   const options = getDiseaseDistributionOptions(theme);
   const series = [
      {
         name: 'Patients',
         data: [120, 90, 70, 45, 30],
      },
   ];

   return (
      <Box>
         <Typography variant="h6" gutterBottom>
            Disease Distribution
         </Typography>
         <ChartContainer height="320px">
            <Chart options={options} series={series} type='bar' height={300} />
         </ChartContainer>
      </Box>
   );
};
