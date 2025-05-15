import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material';
import { IPeriod } from '../../pages/medical-stats/medical-stats.page';

interface Props {
   period: IPeriod;
}

export const NumberColumnChart = ({ period }: Props) => {
   const theme = useTheme();
   const { mode } = theme.palette;
   
   const dataMap: Record<IPeriod, number[]> = {
      today: [10, 15, 20, 18, 12, 14, 16],
      week: [70, 80, 75, 90, 85, 95, 100],
      month: [300, 320, 310, 400, 420, 390, 450],
      year: [7823, 4532, 4561, 4080, 7433, 5853, 4673],
   };

   const options: ApexOptions = {
      chart: {
         type: 'bar',
         toolbar: { show: false },
         zoom: { enabled: false },
         foreColor: theme.palette.text.primary,
         background: 'transparent',
      },
      plotOptions: {
         bar: {
            columnWidth: '45%',
            borderRadius: 4,
         },
      },
      xaxis: {
         categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
         labels: {
            style: {
               colors: theme.palette.text.secondary,
            },
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
            },
         },
      },
      grid: {
         borderColor: theme.palette.divider,
         strokeDashArray: 4,
      },
      title: {
         text: 'Number of Patients',
         align: 'left',
         style: {
            color: theme.palette.text.primary,
         },
      },
      tooltip: {
         theme: mode,
      },
      dataLabels: { enabled: false },
   };

   const series = [
      {
         name: 'Patients',
         data: dataMap[period] || [],
      },
   ];

   return <Chart options={options} series={series} type='bar' height={300} />;
};
