import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const DiseaseBarChart = () => {
   const options: ApexOptions = {
      chart: {
         type: 'bar',
         toolbar: {
            show: false,
         },
         zoom: {
            enabled: false,
         },
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
      },
      title: {
         text: 'Disease Distribution',
         align: 'left',
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
