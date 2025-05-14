import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface ComposeButtonProps {
   onClick: () => void;
}

export const ComposeButton = ({ onClick }: ComposeButtonProps) => {
   return (
      <Fab
         color='primary'
         aria-label='compose new email'
         onClick={onClick}
         sx={{
            position: 'fixed',
            bottom: 32,
            right: 48,
            zIndex: 1200,
         }}
      >
         <AddIcon />
      </Fab>
   );
};
