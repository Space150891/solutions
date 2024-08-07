import { SxProps } from '@mui/material';

export const useMedicationMaganementStyle = () => {
   const cardContent: SxProps = {
      p: 1,
   };

   const header: SxProps = {
      mb: 2.25,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
   };

   return { cardContent, header };
};
