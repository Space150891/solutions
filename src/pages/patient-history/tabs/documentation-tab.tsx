/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Typography, TextField, Button, Card, CardContent, Stack } from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory } from '../../../store/slices/patientHistorySlice';

interface Documentation {
   title: string;
}

export default function DocumentationTab() {
   const [note, setNote] = useState('');
   const dispatch = useAppDispatch();
   const notes = useAppSelector((state) => state.patientHistory.documentation);

   const handlerAddNote = () => {
      if (note.trim() === '') return;

      const newNote: Documentation = {
         title: note,
      };

      dispatch(addInfForHistory({ type: 'documentation', data: newNote }));
      setNote('');
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Documentation
         </Typography>
         <Stack direction='row' spacing={2} mb={2}>
            <TextField label='New Note' fullWidth value={note} onChange={(e) => setNote(e.target.value)} />
            <Button variant='contained' onClick={handlerAddNote}>
               Add
            </Button>
         </Stack>

         {notes.map((entry: any, index: number) => (
            <Card key={index} sx={{ mb: 1 }}>
               <CardContent>{entry.title}</CardContent>
            </Card>
         ))}
      </Box>
   );
}
