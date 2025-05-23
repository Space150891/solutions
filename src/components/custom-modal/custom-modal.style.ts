import { SxProps, useTheme } from '@mui/material';

export const useCustomModalStyle = (additionalStyles?: SxProps) => {
   const theme = useTheme();
   const isLightMode = theme.palette.mode === 'light';
   
   const modalWrapper: SxProps = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '95vw',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflow: 'auto',
      bgcolor: 'background.paper',
      border: `1px solid ${isLightMode ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'}`,
      borderRadius: 1,
      boxShadow: 24,
      color: 'text.primary',
      p: 3,
      // Custom scrollbar styling
      '&::-webkit-scrollbar': {
         width: '8px',
         height: '8px',
      },
      '&::-webkit-scrollbar-track': {
         backgroundColor: isLightMode ? '#f1f1f1' : 'rgba(255, 255, 255, 0.05)',
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
      ...additionalStyles,
   };

   const actionsWrapper: SxProps = { display: 'flex', gap: 6, mt: 5 };

   return { modalWrapper, actionsWrapper };
};
