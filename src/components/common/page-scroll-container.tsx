import { Box, BoxProps, styled } from '@mui/material';

// A styled component for page content with custom scrollbars
export const PageScrollContainer = styled(Box)<BoxProps>(({ theme }) => ({
  height: 'calc(100vh - 60px)', // Adjust if you have different header heights
  overflow: 'auto',
  padding: theme.spacing(3),
  // Add other styling as needed
  ...(theme.palette.mode === 'light' && {
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#c1c1c1',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: '#a1a1a1',
      }
    },
  }),
}));
