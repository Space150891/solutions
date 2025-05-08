import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { type IPeriod } from '../../pages/dashboard/dashboard.page';

const columnChartOptions: ApexOptions = {
   chart: {
      type: 'bar',
      height: 430,
      toolbar: {
         show: false,
      },
   },
   plotOptions: {
      bar: {
         columnWidth: '30%',
         borderRadius: 4,
      },
   },
   dataLabels: {
      enabled: false,
   },
   stroke: {
      show: true,
      width: 8,
      colors: ['transparent'],
   },
   xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
   },
   yaxis: {
      title: {
         text: '$ (thousands)',
      },
   },
   fill: {
      opacity: 1,
   },
   tooltip: {
      y: {
         formatter(val) {
            return `$ ${val} thousands`;
         },
      },
   },
   legend: {
      show: true,
      fontFamily: `'Public Sans', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
         useSeriesColors: false,
      },
      markers: {
         width: 16,
         height: 16,
         radius: 50,
         offsetX: 2,
         offsetY: 2,
      },
      itemMargin: {
         horizontal: 15,
         vertical: 50,
      },
   },
   responsive: [
      {
         breakpoint: 600,
         options: {
            yaxis: {
               show: false,
            },
         },
      },
   ],
};

export const NumberColumnChart = ({ period }: { period: IPeriod }) => {
   const theme = useTheme();

   const { primary, secondary } = theme.palette.text;
   const line = theme.palette.divider;

   const warning = theme.palette.warning.main;
   const primaryMain = theme.palette.primary.main;
   const successDark = theme.palette.success.dark;

   const [options, setOptions] = useState(columnChartOptions);

   const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

   useEffect(() => {
      const fluCases = [120, 130, 150, 170, 160, 140];
      const covidCases = [80, 95, 100, 110, 105, 98];
      const fractures = [45, 95, 39, 200, 43, 80];

      setSeries([
         {
            name: 'Flu',
            data: fluCases.map((val) => Math.round(val)),
         },
         {
            name: 'COVID-19',
            data: covidCases.map((val) => Math.round(val)),
         },
         {
            name: 'Fractures',
            data: fractures.map((val) => Math.round(val)),
         },
      ]);
   }, [period]);

   useEffect(() => {
      setOptions((prevState) => ({
         ...prevState,
         colors: [warning, primaryMain],
         xaxis: {
            labels: {
               style: {
                  colors: [secondary, secondary, secondary, secondary, secondary, secondary],
               },
            },
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
            theme: 'light',
         },
         legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
               colors: 'grey.500',
            },
         },
      }));
   }, [primary, secondary, line, warning, primaryMain, successDark]);

   return <ReactApexChart options={options} series={series} type='bar' height={430} />;
};
