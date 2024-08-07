import { SxProps } from '@mui/material';

export const useCustomDataGridStyle = () => {
   const dataGrid: SxProps = {
      border: 0,

      '& .MuiDataGrid-footerContainer': {
         borderTop: 0,
      },
   };

   return { dataGrid };
};
