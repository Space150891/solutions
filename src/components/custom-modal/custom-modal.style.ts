import { SxProps } from '@mui/material';

export const useCustomModalStyle = (additionalStyles?: SxProps) => {
   const modalWrapper: SxProps = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '95vw',
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      color: 'text.primary',
      p: 2,
      ...additionalStyles,
   };

   const actionsWrapper: SxProps = { display: 'flex', gap: 6, mt: 5 };

   return { modalWrapper, actionsWrapper };
};
