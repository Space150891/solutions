import { useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { CustomScrollbar } from './custom-scrollbar';

interface ChartContainerProps {
  children: ReactNode;
  height?: string | number;
  maxHeight?: string | number;
  width?: string | number;
  sx?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow other props to pass through
}

/**
 * A specialized container for charts that provides custom scrollbars with theme-aware styling
 * 
 * Features:
 * - Responsive chart display with proper scrolling behavior
 * - Theme-aware scrollbar styling (light/dark mode)
 * - Consistent scrollbar appearance across the application
 * - Enhanced user experience for chart interactions
 * 
 * @example
 * <ChartContainer height="320px">
 *   <Chart options={options} series={series} type='bar' height={300} />
 * </ChartContainer>
 */
export const ChartContainer = ({
  children,
  height,
  maxHeight,
  width,
  sx = {},
  ...rest
}: ChartContainerProps) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <CustomScrollbar
      height={height}
      maxHeight={maxHeight}
      width={width}
      sx={{
        backgroundColor: isLightMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.1)',
        borderRadius: 1,
        padding: 1,
        ...sx
      }}
      {...rest}
    >
      {children}
    </CustomScrollbar>
  );
};
