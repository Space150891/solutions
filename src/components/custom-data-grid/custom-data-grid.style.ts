import { SxProps, useTheme } from '@mui/material';

export const useCustomDataGridStyle = () => {
   const theme = useTheme();
   const isLightMode = theme.palette.mode === 'light';

   const dataGrid: SxProps = {
      border: 0,

      '& .MuiDataGrid-booleanCell': {
         "&[data-value='false']": {
            color: '#ff0000',
         },

         "&[data-value='true']": {
            color: '#00aa1b',
         },
      },

      '& .MuiDataGrid-footerContainer': {
         borderTop: 0,
      },

      // Custom scrollbar styling for DataGrid
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
         width: '8px',
         height: '8px',
      },
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
         backgroundColor: isLightMode ? '#f1f1f1' : 'rgba(255, 255, 255, 0.05)',
         borderRadius: '4px',
      },
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
         backgroundColor: isLightMode ? '#c1c1c1' : 'rgba(255, 255, 255, 0.2)',
         borderRadius: '4px',
         transition: 'background-color 0.2s ease',
         '&:hover': {
           backgroundColor: isLightMode ? '#a1a1a1' : 'rgba(255, 255, 255, 0.3)',
         }
      },
   };

   return { dataGrid };
};
