import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { getDiseaseDistributionOptions } from '../../constants/chart-options';

export const DiseaseBarChart = () => {
   const theme = useTheme();
   const options = getDiseaseDistributionOptions(theme);
   const series = [
      {
         name: 'Patients',
         data: [120, 90, 70, 45, 30],
      },
   ];

   return <Chart options={options} series={series} type='bar' height={300} />;
};
