import { ApexOptions } from 'apexcharts';
import { Theme } from '@mui/material/styles';

// Base options for all vital sign charts
export const getBaseVitalChartOptions = (theme: Theme): ApexOptions => {
  const secondary = theme.palette.text.secondary;
  const line = theme.palette.divider;
  
  return {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      background: 'transparent',
      foreColor: theme.palette.text.primary
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      borderColor: line,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: secondary,
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM',
          day: 'dd',
          hour: 'HH:mm'
        }
      },
      axisBorder: {
        show: true,
        color: line
      },
      axisTicks: {
        show: true,
        color: line
      },
      tickAmount: 6,
    },
    tooltip: {
      theme: theme.palette.mode,
      x: {
        format: 'HH:mm'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    legend: {
      show: false
    }
  };
};

// Options specifically for heart rate charts
export const getHeartRateChartOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getBaseVitalChartOptions(theme);
  return {
    ...baseOptions,
    colors: [theme.palette.primary.main],
    yaxis: {
      ...baseOptions.yaxis,
      min: 40,
      max: 140,
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
        formatter: (value: number) => `${value.toFixed(1)} bpm`
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      y: {
        formatter: (value: number) => `${value.toFixed(1)} bpm`
      }
    }
  };
};

// Options for blood pressure charts
export const getBloodPressureChartOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getBaseVitalChartOptions(theme);
  return {
    ...baseOptions,
    colors: [theme.palette.error.main, theme.palette.info.main],
    yaxis: {
      ...baseOptions.yaxis,
      min: 40,
      max: 200,
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
        formatter: (value: number) => `${value.toFixed(0)} mmHg`
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      y: {
        formatter: (value: number) => `${value.toFixed(0)} mmHg`
      }
    }
  };
};

// Options for temperature charts
export const getTemperatureChartOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getBaseVitalChartOptions(theme);
  return {
    ...baseOptions,
    colors: [theme.palette.warning.main],
    yaxis: {
      ...baseOptions.yaxis,
      min: 35,
      max: 41,
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
        formatter: (value: number) => `${value.toFixed(1)} °C`
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      y: {
        formatter: (value: number) => `${value.toFixed(1)} °C`
      }
    }
  };
};

// Options for respiratory rate charts
export const getRespiratoryRateChartOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getBaseVitalChartOptions(theme);
  return {
    ...baseOptions,
    colors: [theme.palette.info.main],
    yaxis: {
      ...baseOptions.yaxis,
      min: 8,
      max: 30,
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
        formatter: (value: number) => `${value.toFixed(1)} bpm`
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      y: {
        formatter: (value: number) => `${value.toFixed(1)} bpm`
      }
    }
  };
};

// Options for oxygen saturation charts
export const getOxygenSaturationChartOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getBaseVitalChartOptions(theme);
  return {
    ...baseOptions,
    colors: [theme.palette.success.main],
    yaxis: {
      ...baseOptions.yaxis,
      min: 85,
      max: 100,
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
        formatter: (value: number) => `${value.toFixed(1)} %`
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      y: {
        formatter: (value: number) => `${value.toFixed(1)} %`
      }
    }
  };
};

// Generic vital sign chart options with customizable parameters
export const getVitalSignChartOptions = (
  theme: Theme, 
  unit: string, 
  yaxisMin?: number, 
  yaxisMax?: number, 
  color?: string
): ApexOptions => {
  const baseOptions = getBaseVitalChartOptions(theme);
  return {
    ...baseOptions,
    colors: [color || theme.palette.primary.main],
    yaxis: {
      ...baseOptions.yaxis,
      min: yaxisMin,
      max: yaxisMax,
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
        formatter: (value: number) => `${value.toFixed(1)} ${unit}`
      }
    },
    tooltip: {
      ...baseOptions.tooltip,
      y: {
        formatter: (value: number) => `${value.toFixed(1)} ${unit}`
      }
    }
  };
};
