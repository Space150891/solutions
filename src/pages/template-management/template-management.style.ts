import { SxProps } from '@mui/material';

export const useTemplateManagementStyle = () => {
   const wrapper: SxProps = { width: '100%', maxWidth: '1250px', margin: '0 auto', py: 3 };
   const button: SxProps = { mb: 2 };

   const builder = (isShownPreview: boolean) => (isShownPreview ? 'hidden' : '');

   return { wrapper, button, builder };
};
