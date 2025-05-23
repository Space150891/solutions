import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

interface ScrollableCardContentProps {
  children: ReactNode;
  maxHeight?: string | number;
  padding?: number | string;
  sx?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow rest props
}

/**
 * A specialized component for card content with custom scrollbar styling
 * 
 * Features:
 * - Theme-aware scrollbar styling (light/dark mode)
 * - Consistent scrollbar appearance for card content
 * - Proper overflow handling for cards with large content
 * 
 * @example
 * <Card>
 *   <CardHeader title="Card Title" />
 *   <ScrollableCardContent maxHeight="300px">
 *     <Typography>Your card content here...</Typography>
 *   </ScrollableCardContent>
 * </Card>
 */
export const ScrollableCardContent = ({
  children,
  maxHeight = '300px',
  padding = 2,
  sx = {},
  ...rest
}: ScrollableCardContentProps) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        maxHeight,
        overflow: 'auto',
        padding,
        width: '100%',
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

export default ScrollableCardContent;
