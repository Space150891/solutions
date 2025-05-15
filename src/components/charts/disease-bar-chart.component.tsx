import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material';

export const DiseaseBarChart = () => {
   const theme = useTheme();
   const { mode } = theme.palette;

   const options: ApexOptions = {
      chart: {
         type: 'bar',
         toolbar: {
            show: false,
         },
         zoom: {
            enabled: false,
         },
         foreColor: theme.palette.text.primary,
         background: 'transparent',
      },
      plotOptions: {
         bar: {
            borderRadius: 4,
            horizontal: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      xaxis: {
         categories: ['Flu', 'Diabetes', 'COVID-19', 'Hypertension', 'Asthma'],
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
         text: 'Disease Distribution',
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
         data: [120, 90, 70, 45, 30],
      },
   ];

   return <Chart options={options} series={series} type='bar' height={300} />;
};
