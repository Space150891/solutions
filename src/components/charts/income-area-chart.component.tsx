import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const areaChartOptions: ApexOptions = {
   chart: {
      height: 450,
      type: 'area',
      toolbar: {
         show: false,
      },
   },
   dataLabels: {
      enabled: false,
   },
   stroke: {
      curve: 'smooth',
      width: 2,
   },
   grid: {
      strokeDashArray: 0,
   },
};

export const IncomeAreaChart = ({ slot }: { slot: 'month' | 'week' }) => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const line = theme.palette.divider;

   const [options, setOptions] = useState(areaChartOptions);

   const [series, setSeries] = useState([
      {
         name: 'Page Views',
         data: [0, 86, 28, 115, 48, 210, 136],
      },
      {
         name: 'Sessions',
         data: [0, 43, 14, 56, 24, 105, 68],
      },
   ]);

   useEffect(() => {
      setOptions((prevState) => ({
         ...prevState,
         colors: [theme.palette.primary.main, theme.palette.primary.light],
         xaxis: {
            categories:
               slot === 'month'
                  ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
               style: {
                  colors: [
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                     secondary,
                  ],
               },
            },
            axisBorder: {
               show: true,
               color: line,
            },
            tickAmount: slot === 'month' ? 11 : 7,
         },
         yaxis: {
            labels: {
               style: {
                  colors: [secondary],
               },
            },
         },
         grid: {
            borderColor: line,
         },
         tooltip: {
            theme: theme.palette.mode,
         },
      }));
   }, [primary, secondary, line, theme, slot]);

   useEffect(() => {
      setSeries([
         {
            name: 'Page Views',
            data:
               slot === 'month'
                  ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
                  : [31, 40, 28, 51, 42, 109, 100],
         },
         {
            name: 'Sessions',
            data:
               slot === 'month'
                  ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
                  : [11, 32, 45, 32, 34, 52, 41],
         },
      ]);
   }, [slot]);

   return <ReactApexChart options={options} series={series} type='area' height={450} />;
};
