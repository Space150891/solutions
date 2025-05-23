import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface CustomScrollbarProps {
  children: ReactNode;
  maxHeight?: string | number;
  height?: string | number;
  width?: string | number;
  sx?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // To allow for rest props
}

/**
 * A component that applies custom scrollbar styling based on the current theme
 */
export const CustomScrollbar = ({
  children,
  maxHeight,
  height,
  width,
  sx = {},
  ...rest
}: CustomScrollbarProps) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      {...rest}
      sx={{
        maxHeight,
        height,
        width,
        overflow: 'auto',
        // Custom scrollbar styles
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: isLightMode ? '#f1f1f1' : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: isLightMode ? '#c1c1c1' : 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: isLightMode ? '#a1a1a1' : 'rgba(255, 255, 255, 0.3)',
          }
        },
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default CustomScrollbar;
