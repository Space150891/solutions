import Chart from 'react-apexcharts';
import { Box, Typography, useTheme } from '@mui/material';
import { getGenderPieOptions } from '../../constants/chart-options';
import { ChartContainer } from '../common';

export const GenderPieChart = () => {
   const theme = useTheme();
   const options = getGenderPieOptions(theme);
   const series = [58, 42];

   return (
      <Box>
         <Typography variant="h6" gutterBottom>Gender Distribution</Typography>
         <ChartContainer height="480px">
            <Chart options={options} series={series} type='pie' height={460} />
         </ChartContainer>
      </Box>
   );
};
