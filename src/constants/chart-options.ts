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

// Base options for medical stats charts
export const getMedicalStatsBaseOptions = (theme: Theme): ApexOptions => {
  const { mode, text, divider } = theme.palette;
  
  return {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: text.primary,
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: divider,
      strokeDashArray: 4,
    },
    xaxis: {
      labels: {
        style: {
          colors: text.secondary,
        },
      },
      axisBorder: {
        color: divider,
      },
      axisTicks: {
        color: divider,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: text.secondary,
        },
      },
    },
    tooltip: {
      theme: mode,
    },
  };
};

export const getPatientNumberColumnOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getMedicalStatsBaseOptions(theme);
  return {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4,
      },
    },
    xaxis: {
      ...baseOptions.xaxis,
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    title: {
      text: 'Number of Patients',
      align: 'left',
      style: {
        color: theme.palette.text.primary,
      },
    },
  };
};

// Options for gender distribution pie chart
export const getGenderPieOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getMedicalStatsBaseOptions(theme);
  return {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'pie',
    },
    labels: ['Male', 'Female'],
    colors: ['#2196f3', '#f50057'],
    legend: {
      position: 'bottom',
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    title: {
      text: 'Gender Distribution',
      align: 'left',
      style: {
        color: theme.palette.text.primary,
      },
    },
    stroke: {
      width: 0,
    },
  };
};

// Options for age distribution chart
export const getAgeDistributionOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getMedicalStatsBaseOptions(theme);
  return {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    xaxis: {
      ...baseOptions.xaxis,
      categories: ['0-18', '19-30', '31-45', '46-60', '60+'],
    },
    title: {
      text: 'Age Distribution',
      align: 'left',
      style: {
        color: theme.palette.text.primary,
      },
    },
  };
};

// Options for disease distribution chart
export const getDiseaseDistributionOptions = (theme: Theme): ApexOptions => {
  const baseOptions = getMedicalStatsBaseOptions(theme);
  return {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    xaxis: {
      ...baseOptions.xaxis,
      categories: ['Flu', 'Diabetes', 'COVID-19', 'Hypertension', 'Asthma'],
    },
    title: {
      text: 'Disease Distribution',
      align: 'left',
      style: {
        color: theme.palette.text.primary,
      },
    },
  };
};
