import {
   Box,
   Button,
   Dialog,
   DialogTitle,
   DialogContent,
   TextField,
   IconButton,
   useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ComposeEmailProps {
   open: boolean;
   onClose: () => void;
   to: string;
   subject: string;
   body: string;
   setTo: (value: string) => void;
   setSubject: (value: string) => void;
   setBody: (value: string) => void;
   onSend: () => void;
   isDarkMode: boolean;
}

export const ComposeEmail = ({
   open,
   onClose,
   to,
   subject,
   body,
   setTo,
   setSubject,
   setBody,
   onSend,
   isDarkMode
}: ComposeEmailProps) => {
   const theme = useTheme();

   return (
      <Dialog
         open={open}
         onClose={onClose}
         maxWidth='xs'
         fullWidth
         PaperProps={{
            sx: {
               bgcolor: 'background.paper',
               color: 'text.primary',
               transition: theme.transitions.create(['background-color', 'color'], {
                  duration: theme.transitions.duration.standard,
               }),
            }
         }}
      >
         <DialogTitle sx={{ p: 2, pr: 4 }}>
            New Email
            <IconButton
               onClick={onClose}
               sx={{ position: 'absolute', right: 8, top: 8 }}
               size='small'
            >
               <CloseIcon />
            </IconButton>
         </DialogTitle>
         <DialogContent sx={{ paddingTop: '8px !important' }}>
            <Box display='flex' flexDirection='column' gap={2}>
               <TextField
                  label='To (email)'
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  fullWidth
                  size='small'
                  type='text'
                  color='primary'
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        transition: theme.transitions.create(['border-color'], {
                           duration: theme.transitions.duration.standard,
                        })
                     }
                  }}
               />
               <TextField
                  label='Subject'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  fullWidth
                  size='small'
                  color='primary'
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        transition: theme.transitions.create(['border-color'], {
                           duration: theme.transitions.duration.standard,
                        })
                     }
                  }}
               />
               <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='Message'
                  style={{
                     width: '100%',
                     height: 200,
                     resize: 'none',
                     padding: 12,
                     fontSize: 16,
                     borderRadius: 4,
                     border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.23)' : '1px solid rgba(0, 0, 0, 0.23)',
                     marginTop: 8,
                     fontFamily: 'inherit',
                     boxSizing: 'border-box',
                     transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
                     backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                     color: isDarkMode ? '#fff' : 'inherit',
                  }}
               />
               <Button
                  variant='contained'
                  color='primary'
                  onClick={onSend}
                  fullWidth
                  sx={{ mt: 1 }}
               >
                  Send
               </Button>
            </Box>
         </DialogContent>
      </Dialog>
   );
};
