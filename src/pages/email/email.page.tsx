import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useThemeContext } from '../../providers/theme-context.provider';

import { EmailHeader } from './components/email-header.component';
import { EmailContainer } from './components/email-container.component';
import { EmailList } from './components/email-list.component';
import { EmailView } from './components/email-view.component';
import { ComposeButton } from './components/compose-button.component';
import { ComposeEmail } from './components/compose-email.component';
import { type Email, initialEmails } from './components/types';

export default function Email() {
   const [emails, setEmails] = useState<Email[]>(initialEmails);
   const [openModal, setOpenModal] = useState(false);
   const [openView, setOpenView] = useState<Email | null>(null);
   const [to, setTo] = useState('');
   const [subject, setSubject] = useState('');
   const [body, setBody] = useState('');
   const theme = useTheme();
   const { mode } = useThemeContext();
   const isDarkMode = mode === 'dark';

   const handleSend = () => {
      if (!to.trim() || !body.trim() || !subject.trim()) return;
      setEmails([
         ...emails,
         {
            id: emails.length + 1,
            from: to,
            nickname: to.split('@')[0],
            time: new Date().toLocaleString(),
            subject,
            text: body,
         },
      ]);
      setTo('');
      setSubject('');
      setBody('');
      setOpenModal(false);
   };

   const handleReply = (email: Email) => {
      setTo(email.from);
      setSubject('Re: ' + email.subject);
      setBody('');
      setOpenModal(true);
   };

   const handleNewEmail = () => {
      setTo('');
      setSubject('');
      setBody('');
      setOpenModal(true);
   };

   return (
      <Box
         width='100%'
         minHeight='calc(100vh - 60px)'
         position='relative'
         bgcolor='background.default'
         sx={{
            transition: theme.transitions.create(['background-color'], {
               duration: theme.transitions.duration.standard,
            })
         }}
      >
         <EmailHeader />
         
         <EmailContainer isDarkMode={isDarkMode}>
            {openView ? (
               <EmailView 
                  email={openView} 
                  onBack={() => setOpenView(null)} 
                  onReply={handleReply} 
               />
            ) : (
               <EmailList 
                  emails={emails} 
                  onEmailSelect={setOpenView} 
                  isDarkMode={isDarkMode} 
               />
            )}
         </EmailContainer>
         
         <ComposeButton onClick={handleNewEmail} />
         
         <ComposeEmail
            open={openModal}
            onClose={() => setOpenModal(false)}
            to={to}
            subject={subject}
            body={body}
            setTo={setTo}
            setSubject={setSubject}
            setBody={setBody}
            onSend={handleSend}
            isDarkMode={isDarkMode}
         />
      </Box>
   );
}
