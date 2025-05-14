import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const GenderPieChart = () => {
   const options: ApexOptions = {
      chart: {
         type: 'pie',
         toolbar: {
            show: false,
         },
      },
      labels: ['Male', 'Female'],
      title: {
         text: 'Gender Distribution',
         align: 'left',
      },
      legend: {
         position: 'bottom',
      },
      colors: ['#2196f3', '#f50057'],
   };

   const series = [58, 42];

   return <Chart options={options} series={series} type='pie' height={480} />;
};
