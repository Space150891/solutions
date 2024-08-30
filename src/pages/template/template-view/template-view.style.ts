import { SxProps } from '@mui/material';

export const useTemplateViewStyle = () => {
   const wrapper: SxProps = {
      width: '100%',
      maxWidth: '1250px',
      margin: '0 auto',
      py: 3,
   };
   const button: SxProps = { mb: 2 };
   const buttonsWrapper: SxProps = {
      pl: '10px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
   };

   const builder = (isShownPreview: boolean) => (isShownPreview ? 'hidden' : '');

   return { wrapper, button, buttonsWrapper, builder };
};
