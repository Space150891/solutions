import { Box, Typography, useTheme } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

export const EmailHeader = () => {
   const theme = useTheme();

   return (
      <Box
         width='100%'
         display='flex'
         alignItems='center'
         pl={{ xs: 2, sm: 4, md: 6 }}
         pt={4}
      >
         <EmailIcon sx={{ mr: 1.5, color: 'primary.main' }} />
         <Typography
            variant='h4'
            fontWeight={500}
            color="text.primary"
            sx={{
               transition: theme.transitions.create(['color'], {
                  duration: theme.transitions.duration.standard,
               })
            }}
         >
            Email Service
         </Typography>
      </Box>
   );
};
