import React, { useState } from 'react';
import {
   Box,
   Button,
   Typography,
   List,
   ListItem,
   ListItemText,
   Paper,
   Fab,
   Dialog,
   DialogContent,
   DialogTitle,
   IconButton,
   TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

interface Email {
   id: number;
   from: string;
   nickname: string;
   time: string;
   subject: string;
   text: string;
}

const initialEmails: Email[] = [
   {
      id: 1,
      from: 'alice@example.com',
      nickname: 'Alice',
      time: '2024-06-01 10:00',
      subject: 'Greetings',
      text: 'Hello! How are you?',
   },
   {
      id: 2,
      from: 'bob@example.com',
      nickname: 'Bob',
      time: '2024-06-02 12:30',
      subject: 'File',
      text: 'Please check the attached file.',
   },
];

export default function Email() {
   const [emails, setEmails] = useState<Email[]>(initialEmails);
   const [openModal, setOpenModal] = useState(false);
   const [openView, setOpenView] = useState<Email | null>(null);
   const [to, setTo] = useState('');
   const [subject, setSubject] = useState('');
   const [body, setBody] = useState('');

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

   return (
      <Box width='100vw' minHeight='100vh' position='relative' bgcolor='#f7f7f7'>
         <Box width='100%' display='flex' alignItems='center' pl={6} pt={4}>
            <Typography variant='h4' fontWeight={500}>
               Gmail Service
            </Typography>
         </Box>
         <Box display='flex' justifyContent='flex-start' mt={4} px={6}>
            <Paper elevation={3} sx={{ width: '100%', minHeight: 500, p: 0 }}>
               {openView ? (
                  <Box p={4}>
                     <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => setOpenView(null)}
                        sx={{ mb: 2, mr: 2 }}
                        variant='outlined'
                     >
                        Back to all emails
                     </Button>
                     <Button
                        variant='contained'
                        color='primary'
                        sx={{ mb: 2 }}
                        onClick={() => handleReply(openView)}
                     >
                        Reply
                     </Button>
                     <Typography variant='h6' mb={1}>
                        {openView.subject}
                     </Typography>
                     <Typography variant='subtitle2' mb={1}>
                        {openView.nickname} &lt;{openView.from}&gt;
                     </Typography>
                     <Typography variant='caption' color='text.secondary'>
                        {openView.time}
                     </Typography>
                     <Typography mt={2} style={{ whiteSpace: 'pre-line' }}>
                        {openView.text}
                     </Typography>
                  </Box>
               ) : (
                  <List>
                     {emails.map((email) => (
                        <ListItem
                           key={email.id}
                           button
                           onClick={() => setOpenView(email)}
                           sx={{ borderBottom: '1px solid #eee', px: 4 }}
                        >
                           <ListItemText
                              primary={
                                 <>
                                    <b>{email.nickname}</b>{' '}
                                    <span style={{ color: '#888', fontSize: 12 }}>{email.time}</span>
                                    <span style={{ marginLeft: 16, fontWeight: 400 }}>{email.subject}</span>
                                 </>
                              }
                              secondary={
                                 email.text.length > 40 ? email.text.slice(0, 40) + '...' : email.text
                              }
                           />
                        </ListItem>
                     ))}
                  </List>
               )}
            </Paper>
         </Box>
         <Fab
            color='primary'
            aria-label='add'
            onClick={() => {
               setTo('');
               setSubject('');
               setBody('');
               setOpenModal(true);
            }}
            sx={{
               position: 'fixed',
               bottom: 32,
               right: 48,
               zIndex: 1200,
            }}
         >
            <AddIcon />
         </Fab>
         <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth='xs' fullWidth>
            <DialogTitle sx={{ p: 2, pr: 4 }}>
               New Email
               <IconButton
                  onClick={() => setOpenModal(false)}
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
                  />
                  <TextField
                     label='Subject'
                     value={subject}
                     onChange={(e) => setSubject(e.target.value)}
                     fullWidth
                     size='small'
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
                        border: '1px solid #ccc',
                        marginTop: 8,
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                     }}
                  />
                  <Button variant='contained' color='primary' onClick={handleSend} fullWidth sx={{ mt: 1 }}>
                     Send
                  </Button>
               </Box>
            </DialogContent>
         </Dialog>
      </Box>
   );
}
