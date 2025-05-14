import { Box, Button, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Email } from './types';

interface EmailViewProps {
   email: Email;
   onBack: () => void;
   onReply: (email: Email) => void;
}

export const EmailView = ({ email, onBack, onReply }: EmailViewProps) => {
   return (
      <Box p={4}>
         <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            sx={{ mb: 2, mr: 2 }}
            variant='outlined'
         >
            Back to all emails
         </Button>
         <Button
            variant='contained'
            color='primary'
            sx={{ mb: 2 }}
            onClick={() => onReply(email)}
         >
            Reply
         </Button>
         <Typography variant='h6' mb={1} color="text.primary">
            {email.subject}
         </Typography>
         <Typography variant='subtitle2' mb={1} color="text.primary">
            {email.nickname} &lt;{email.from}&gt;
         </Typography>
         <Typography variant='caption' color='text.secondary'>
            {email.time}
         </Typography>
         <Typography mt={2} color="text.primary" style={{ whiteSpace: 'pre-line' }}>
            {email.text}
         </Typography>
      </Box>
   );
};
