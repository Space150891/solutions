import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { getGenderPieOptions } from '../../constants/chart-options';

export const GenderPieChart = () => {
   const theme = useTheme();
   const options = getGenderPieOptions(theme);
   const series = [58, 42];

   return <Chart options={options} series={series} type='pie' height={480} />;
};
