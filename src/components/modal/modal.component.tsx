import {
   Dialog,
   DialogTitle,
   DialogContent,
   Box,
   IconButton,
   useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

interface ModalProps {
   open: boolean;
   onClose: () => void;
   title: string;
   icon?: ReactNode;
   children: ReactNode;
   maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({ 
   open,
   onClose,
   title,
   icon,
   children,
   maxWidth = 'md'
}: ModalProps) => {
   const theme = useTheme();

   return (
      <Dialog
         open={open}
         onClose={onClose}
         maxWidth={maxWidth}
         fullWidth
      >
         <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.divider}`
         }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
               {title}
            </Box>
            <IconButton
               edge="end"
               color="inherit"
               onClick={onClose}
               aria-label="close"
            >
               <CloseIcon />
            </IconButton>
         </DialogTitle>
         <DialogContent sx={{ pt: 2 }}>
            {children}
         </DialogContent>
      </Dialog>
   );
};
