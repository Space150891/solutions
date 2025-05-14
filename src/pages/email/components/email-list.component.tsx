import {
   Box,
   Typography,
   List,
   ListItem,
   ListItemText,
   useTheme
} from '@mui/material';
import { Email } from './types';

interface EmailListProps {
   emails: Email[];
   onEmailSelect: (email: Email) => void;
   isDarkMode: boolean;
}

export const EmailList = ({ emails, onEmailSelect, isDarkMode }: EmailListProps) => {
   const theme = useTheme();

   return (
      <List sx={{
         width: '100%',
         '& .MuiListItem-root': {
            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
            transition: theme.transitions.create(['border-color'], {
               duration: theme.transitions.duration.standard,
            }),
         }
      }}>
         {emails.map((email) => (
            <ListItem
               key={email.id}
               button
               onClick={() => onEmailSelect(email)}
               sx={{ px: 4 }}
            >
               <ListItemText
                  primary={
                     <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography
                           component="span"
                           sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              mr: 1,
                           }}
                        >
                           {email.nickname}
                        </Typography>
                        <Typography
                           component="span"
                           sx={{
                              color: 'text.secondary',
                              fontSize: '0.75rem',
                              mr: 2,
                           }}
                        >
                           {email.time}
                        </Typography>
                        <Typography
                           component="span"
                           sx={{
                              fontWeight: 400,
                              color: 'text.primary',
                           }}
                        >
                           {email.subject}
                        </Typography>
                     </Box>
                  }
                  secondary={
                     <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                           overflow: 'hidden',
                           textOverflow: 'ellipsis',
                           display: '-webkit-box',
                           WebkitLineClamp: 1,
                           WebkitBoxOrient: 'vertical',
                        }}
                     >
                        {email.text}
                     </Typography>
                  }
               />
            </ListItem>
         ))}
      </List>
   );
};
