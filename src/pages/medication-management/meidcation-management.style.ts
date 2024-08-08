import { SxProps } from '@mui/material';

export const useMedicationMaganementStyle = () => {
   const cardContent: SxProps = {
      p: 1,
   };

   const header: SxProps = {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
   };

   return { cardContent, header };
};
