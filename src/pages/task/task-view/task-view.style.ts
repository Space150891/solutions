import { SxProps } from '@mui/material';

export const useTaskViewStyle = () => {
   const gridContainer: SxProps = { flexDirection: 'column', maxWidth: '500px', margin: '0 auto' };

   const confirmButton: SxProps = { mt: 1 };

   return { gridContainer, confirmButton };
};
