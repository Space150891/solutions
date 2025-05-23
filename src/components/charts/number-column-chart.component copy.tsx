import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material';
import { getPatientNumberColumnOptions } from '../../constants/chart-options';
import { IPeriod } from '../../pages/medical-stats/medical-stats.page';
import { ChartContainer } from '../common';

interface Props {
   period: IPeriod;
}

export const NumberColumnChart = ({ period }: Props) => {
   const theme = useTheme();
   
   const dataMap: Record<IPeriod, number[]> = {
      today: [10, 15, 20, 18, 12, 14, 16],
      week: [70, 80, 75, 90, 85, 95, 100],
      month: [300, 320, 310, 400, 420, 390, 450],
      year: [7823, 4532, 4561, 4080, 7433, 5853, 4673],
   };

   const options = getPatientNumberColumnOptions(theme);
   const series = [
      {
         name: 'Patients',
         data: dataMap[period] || [],
      },
   ];

   return (
      <ChartContainer height="320px">
         <Chart options={options} series={series} type='bar' height={300} />
      </ChartContainer>
   );
};
