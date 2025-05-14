import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Box } from '@mui/material';
import { getVitalSignChartOptions } from '../../../constants/chart-options';

interface VitalSignChartProps {
  title: string;
  data: { timestamp: string; value: number }[];
  color?: string;
  height?: number;
  unit: string;
  yaxisMin?: number;
  yaxisMax?: number;
}

export const VitalSignChart = ({
  title,
  data,
  color,
  height = 200,
  unit,
  yaxisMin,
  yaxisMax
}: VitalSignChartProps) => {
  const theme = useTheme();

  const options = useMemo<ApexOptions>(() => {
    const chartOptions = getVitalSignChartOptions(theme, unit, yaxisMin, yaxisMax, color);
    

    return {
      ...chartOptions,
      chart: {
        ...chartOptions.chart,
        height: height
      }
    };
  }, [theme, unit, yaxisMin, yaxisMax, color, height]);

  const series = useMemo(() => {
    return [
      {
        name: title,
        data: data.map(point => [new Date(point.timestamp).getTime(), point.value])
      }
    ];
  }, [data, title]);

  return (
    <Box id={`chart-${title.toLowerCase().replace(' ', '-')}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={height}
      />
    </Box>
  );
};
