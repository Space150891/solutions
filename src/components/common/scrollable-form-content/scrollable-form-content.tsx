import { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

interface ScrollableFormContentProps {
  children: ReactNode;
  maxHeight?: string | number;
  padding?: number | string;
  sx?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * A specialized component for form content with custom scrollbar styling
 * 
 * Features:
 * - Theme-aware scrollbar styling (light/dark mode)
 * - Consistent scrollbar appearance for form content
 * - Proper overflow handling for forms with many fields
 * - Maintains spacing between form elements
 * 
 * @example
 * <Paper>
 *   <ScrollableFormContent maxHeight="500px">
 *     <TextField label="Field 1" />
 *     <TextField label="Field 2" />
 *   </ScrollableFormContent>
 * </Paper>
 */
export const ScrollableFormContent = ({
  children,
  maxHeight = '500px',
  padding = 3,
  sx = {},
  ...rest
}: ScrollableFormContentProps) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        maxHeight,
        overflow: 'auto',
        width: '100%',
        padding,
        '& > *': {
          marginBottom: theme.spacing(2),
          '&:last-child': {
            marginBottom: 0,
          }
        },
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
      {...rest}
    >
      {children}
    </Box>
  );
};

export default ScrollableFormContent;
