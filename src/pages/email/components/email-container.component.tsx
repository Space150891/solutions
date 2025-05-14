import { Box, Paper, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface EmailContainerProps {
   children: ReactNode;
   isDarkMode: boolean;
}

export const EmailContainer = ({ children, isDarkMode }: EmailContainerProps) => {
   const theme = useTheme();

   return (
      <Box
         display='flex'
         justifyContent='flex-start'
         mt={4}
         px={{ xs: 2, sm: 4, md: 6 }}
         pb={8}
      >
         <Paper
            elevation={isDarkMode ? 4 : 3}
            sx={{
               width: '100%',
               minHeight: 500,
               p: 0,
               bgcolor: 'background.paper',
               transition: theme.transitions.create(['background-color', 'box-shadow'], {
                  duration: theme.transitions.duration.standard,
               }),
            }}
         >
            {children}
         </Paper>
      </Box>
   );
};
