import { ReactNode } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import { CustomScrollbar } from '../custom-scrollbar';

interface DialogContentProps extends BoxProps {
  children: ReactNode;
  maxHeight?: string | number;
  padding?: number | string;
}

/**
 * A specialized component for dialog/modal content with custom scrollbar styling
 * 
 * Features:
 * - Theme-aware scrollbar styling (light/dark mode)
 * - Consistent scrollbar appearance for modal/dialog content
 * - Proper overflow handling for large content in dialogs
 * 
 * @example
 * <DialogContent maxHeight="500px">
 *   <Typography>Your dialog content here...</Typography>
 * </DialogContent>
 */
export const DialogContent = ({
  children,
  maxHeight = '70vh',
  padding = 2,
  sx = {},
  ...rest
}: DialogContentProps) => {
  // const theme = useTheme();

  // // Create a Box-specific props object to avoid type conflicts
  // const boxProps: BoxProps = { ...rest };

  return (
    <CustomScrollbar
      maxHeight={maxHeight}
      sx={{
        width: '100%',
        padding: padding,
        ...sx
      }}
    >
      {children}
    </CustomScrollbar>
  );
};

export default DialogContent;
