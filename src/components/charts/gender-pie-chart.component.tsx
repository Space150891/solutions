import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material';

export const GenderPieChart = () => {
   const theme = useTheme();
   const { mode } = theme.palette;

   const options: ApexOptions = {
      chart: {
         type: 'pie',
         toolbar: {
            show: false,
         },
         foreColor: theme.palette.text.primary,
         background: 'transparent',
      },
      labels: ['Male', 'Female'],
      title: {
         text: 'Gender Distribution',
         align: 'left',
         style: {
            color: theme.palette.text.primary,
         },
      },
      legend: {
         position: 'bottom',
         labels: {
            colors: theme.palette.text.primary,
         },
      },
      tooltip: {
         theme: mode,
      },
      colors: ['#2196f3', '#f50057'],
      stroke: {
         width: 0
      },
   };

   const series = [58, 42];

   return <Chart options={options} series={series} type='pie' height={480} />;
};
