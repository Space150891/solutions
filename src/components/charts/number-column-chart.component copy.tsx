import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { IPeriod } from '../../pages/medical-stats/medical-stats.page';

interface Props {
   period: IPeriod;
}

export const NumberColumnChart = ({ period }: Props) => {
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
      },
      plotOptions: {
         bar: {
            columnWidth: '45%',
            borderRadius: 4,
         },
      },
      xaxis: {
         categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      title: {
         text: 'Number of Patients',
         align: 'left',
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
