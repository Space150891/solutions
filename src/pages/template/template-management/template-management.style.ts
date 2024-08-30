import { SxProps } from '@mui/material';

export const useTemplateManagementStyle = () => {
   const cardContent: SxProps = {
      p: 1,
   };

   const header: SxProps = {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      pb: 3,
   };

   const searchInput: SxProps = {
      my: 3,
   };

   return { cardContent, header, searchInput };
};
