import { useEffect, useState } from 'react';

import { Box, useTheme } from '@mui/material';

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const barChartOptions: ApexOptions = {
   chart: {
      type: 'bar',
      height: 365,
      toolbar: {
         show: false,
      },
   },
   plotOptions: {
      bar: {
         columnWidth: '45%',
         borderRadius: 4,
      },
   },
   dataLabels: {
      enabled: false,
   },
   xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
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
   grid: {
      show: false,
   },
};

export const MonthlyBarChart = () => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const info = theme.palette.info.light;

   const [series] = useState([
      {
         data: [80, 95, 70, 42, 65, 55, 78],
      },
   ]);

   const [options, setOptions] = useState(barChartOptions);

   useEffect(() => {
      setOptions((prevState) => ({
         ...prevState,
         colors: [info],
         xaxis: {
            labels: {
               style: {
                  colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary],
               },
            },
         },
         tooltip: {
            theme: theme.palette.mode,
         },
      }));
   }, [primary, info, secondary, theme.palette.mode]);

   return (
      <Box id='chart'>
         <ReactApexChart options={options} series={series} type='bar' height={365} />
      </Box>
   );
};
