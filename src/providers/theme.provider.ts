import { createTheme } from '@mui/material';

export const theme = createTheme({
   components: {
      MuiTextField: {
         styleOverrides: {
            root: {
               '& .MuiInputBase-root': {
                  height: '45px',
               },
               '& .MuiFormHelperText-root.Mui-error': {
                  position: 'absolute',
                  bottom: '-20px',
               },
            },
         },
      },
      MuiGrid: {
         styleOverrides: {
            root: {
               marginTop: 0,
               marginLeft: 0,
               width: '100%',
               '& .MuiGrid-item': {
                  padding: 0,
               },
            },
         },
      },
   },
   palette: {
      primary: {
         main: '#4599bf',
      },
   },
});
