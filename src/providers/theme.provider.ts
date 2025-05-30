import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

// Common theme options for both light and dark modes
const getCommonThemeOptions = (mode: PaletteMode): ThemeOptions => ({
   components: {
      MuiCssBaseline: {
         styleOverrides: {
            body: {
               transition: 'background-color 0.2s ease, color 0.2s ease',
            },
            '*::-webkit-scrollbar': {
               width: '8px',
               height: '8px',
            },
            '*::-webkit-scrollbar-track': {
               backgroundColor: mode === 'light' ? '#f1f1f1' : 'rgba(255, 255, 255, 0.05)',
               borderRadius: '4px',
            },
            '*::-webkit-scrollbar-thumb': {
               backgroundColor: mode === 'light' ? '#c1c1c1' : 'rgba(255, 255, 255, 0.2)',
               borderRadius: '4px',
               transition: 'background-color 0.2s ease',
            },
            '*::-webkit-scrollbar-thumb:hover': {
               backgroundColor: mode === 'light' ? '#a1a1a1' : 'rgba(255, 255, 255, 0.3)', 
            },
         },
      },
      MuiPaper: {
         styleOverrides: {
            root: {
               transition: 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
            },
         },
      },
      MuiCard: {
         styleOverrides: {
            root: {
               transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
            },
         },
      },
      MuiIconButton: {
         styleOverrides: {
            root: {
               transition: 'background-color 0.2s ease, color 0.2s ease',
            },
         },
      },
   },
   palette: {
      mode,
      primary: {
         main: '#4599bf',
      },
      ...(mode === 'dark' ? {
         background: {
            default: '#121212',
            paper: '#1e1e1e',
         },
         text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
         },
         divider: 'rgba(255, 255, 255, 0.12)',
         action: {
            active: 'rgba(255, 255, 255, 0.7)',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
         },
      } : {
         background: {
            default: '#f5f5f5',
            paper: '#ffffff',
         },
         text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
         },
         divider: 'rgba(0, 0, 0, 0.12)',
         action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
         },
      }),
   },
});

// Light theme
export const lightTheme = createTheme(getCommonThemeOptions('light'));

// Dark theme
export const darkTheme = createTheme(getCommonThemeOptions('dark'));

// For backward compatibility
export const theme = lightTheme;
