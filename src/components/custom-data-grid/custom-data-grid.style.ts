import { SxProps } from '@mui/material';

export const useCustomDataGridStyle = () => {
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
   };

   return { dataGrid };
};
