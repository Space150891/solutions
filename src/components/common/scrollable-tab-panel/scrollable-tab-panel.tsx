import { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

interface ScrollableTabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
  maxHeight?: string | number;
  padding?: number | string;
  sx?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow rest props
}

/**
 * A specialized component for tab panels with custom scrollbar styling
 * 
 * Features:
 * - Theme-aware scrollbar styling (light/dark mode)
 * - Consistent scrollbar appearance for tab content
 * - Proper overflow handling for tabs with large content
 * - Standard tab panel accessibility attributes
 * 
 * @example
 * <TabContext value={tabValue}>
 *   <TabList onChange={handleChange}>
 *     <Tab label="Tab 1" value={0} />
 *     <Tab label="Tab 2" value={1} />
 *   </TabList>
 *   <ScrollableTabPanel value={tabValue} index={0} maxHeight="400px">
 *     <Typography>Content for Tab 1</Typography>
 *   </ScrollableTabPanel>
 *   <ScrollableTabPanel value={tabValue} index={1} maxHeight="400px">
 *     <Typography>Content for Tab 2</Typography>
 *   </ScrollableTabPanel>
 * </TabContext>
 */
export const ScrollableTabPanel = ({
  children,
  value,
  index,
  maxHeight = '400px',
  padding = 3,
  sx = {},
  ...rest
}: ScrollableTabPanelProps) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-tabpanel-${index}`}
      aria-labelledby={`scrollable-tab-${index}`}
      {...rest}
    >
      {value === index && (
        <Box
          sx={{
            maxHeight,
            overflow: 'auto',
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
        >
          <Box sx={{ p: padding }}>
            {children}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ScrollableTabPanel;
