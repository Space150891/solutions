import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const AgeDistributionChart = () => {
   const options: ApexOptions = {
      chart: {
         type: 'bar',
         toolbar: {
            show: false,
         },
      },
      plotOptions: {
         bar: {
            horizontal: false,
            columnWidth: '55%',
         },
      },
      dataLabels: {
         enabled: false,
      },
      xaxis: {
         categories: ['0-18', '19-30', '31-45', '46-60', '60+'],
      },
      title: {
         text: 'Age Distribution',
         align: 'left',
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
