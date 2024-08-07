import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';

import type { ButtonProps, ModalProps, SxProps } from '@mui/material';
import { useCustomModalStyle } from './custom-modal.style';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';

type Props = ModalProps & {
   additionalStyles?: SxProps;
   cancelButtonProps?: ButtonProps;
   confirmButtonProps?: LoadingButtonProps;
   hideCancelButton?: boolean;
   heading?: string;
};

const CustomModal = (props: Props) => {
   const {
      additionalStyles = {},
      cancelButtonProps = {},
      confirmButtonProps = {},
      hideCancelButton,
      heading,
      children,
      ...modalProps
   } = props;

   const sx = useCustomModalStyle(additionalStyles);

   return (
      <Modal {...modalProps}>
         <Box sx={sx.modalWrapper}>
            {heading ? (
               <Typography variant='h5' mb={2}>
                  {heading}
               </Typography>
            ) : null}
            {children}

            <Box sx={sx.actionsWrapper}>
               {hideCancelButton ? null : (
                  <Button variant='contained' size='small' fullWidth color='error' {...cancelButtonProps}>
                     {cancelButtonProps.children || 'Cancel'}
                  </Button>
               )}

               <LoadingButton
                  variant='contained'
                  size='small'
                  fullWidth
                  color='success'
                  {...confirmButtonProps}
               >
                  {confirmButtonProps.children || 'Confirm'}
               </LoadingButton>
            </Box>
         </Box>
      </Modal>
   );
};

export default CustomModal;
