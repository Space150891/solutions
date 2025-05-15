import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material';

export const AgeDistributionChart = () => {
   const theme = useTheme();
   const { mode } = theme.palette;

   const options: ApexOptions = {
      chart: {
         type: 'bar',
         toolbar: {
            show: false,
         },
         foreColor: theme.palette.text.primary,
         background: 'transparent',
      },
      plotOptions: {
         bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 4,
         },
      },
      dataLabels: {
         enabled: false,
      },
      xaxis: {
         categories: ['0-18', '19-30', '31-45', '46-60', '60+'],
         labels: {
            style: {
               colors: theme.palette.text.secondary,
            }
         },
         axisBorder: {
            color: theme.palette.divider,
         },
         axisTicks: {
            color: theme.palette.divider,
         },
      },
      yaxis: {
         labels: {
            style: {
               colors: theme.palette.text.secondary,
            }
         },
      },
      grid: {
         borderColor: theme.palette.divider,
         strokeDashArray: 4,
      },
      title: {
         text: 'Age Distribution',
         align: 'left',
         style: {
            color: theme.palette.text.primary,
         },
      },
      tooltip: {
         theme: mode,
      },
   };

   const series = [
      {
         name: 'Patients',
         data: [120, 300, 250, 180, 95],
      },
   ];

   return <Chart options={options} series={series} type='bar' height={300} />;
};
