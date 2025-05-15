import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { getAgeDistributionOptions } from '../../constants/chart-options';

export const AgeDistributionChart = () => {
   const theme = useTheme();
   const options = getAgeDistributionOptions(theme);
   const series = [
      {
         name: 'Patients',
         data: [120, 300, 250, 180, 95],
      },
   ];

   return <Chart options={options} series={series} type='bar' height={300} />;
};
