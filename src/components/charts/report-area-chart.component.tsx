import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const areaChartOptions: ApexOptions = {
   chart: {
      height: 340,
      type: 'line',
      toolbar: {
         show: false,
      },
   },
   dataLabels: {
      enabled: false,
   },
   stroke: {
      curve: 'smooth',
      width: 1.5,
   },
   grid: {
      strokeDashArray: 4,
   },
   xaxis: {
      type: 'datetime',
      categories: [
         '2018-05-19T00:00:00.000Z',
         '2018-06-19T00:00:00.000Z',
         '2018-07-19T01:30:00.000Z',
         '2018-08-19T02:30:00.000Z',
         '2018-09-19T03:30:00.000Z',
         '2018-10-19T04:30:00.000Z',
         '2018-11-19T05:30:00.000Z',
         '2018-12-19T06:30:00.000Z',
      ],
      labels: {
         format: 'MMM',
      },
      axisBorder: {
         show: false,
      },
      axisTicks: {
         show: false,
      },
   },
   yaxis: {
      show: false,
   },
   tooltip: {
      x: {
         format: 'MM',
      },
   },
};

export const ReportAreaChart = () => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const line = theme.palette.divider;

   const [options, setOptions] = useState(areaChartOptions);

   const [series] = useState([
      {
         name: 'Series 1',
         data: [58, 115, 28, 83, 63, 75, 35, 55],
      },
   ]);

   useEffect(() => {
      setOptions((prevState) => ({
         ...prevState,
         colors: [theme.palette.warning.main],
         xaxis: {
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
                  ],
               },
            },
         },
         grid: {
            borderColor: line,
         },
         tooltip: {
            theme: theme.palette.mode,
         },
         legend: {
            labels: {
               colors: 'grey.500',
            },
         },
      }));
   }, [primary, secondary, line, theme.palette.mode, theme]);

   return <ReactApexChart options={options} series={series} type='line' height={415} />;
};
