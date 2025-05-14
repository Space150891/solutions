/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Typography, TextField, Button, Card, CardContent, Stack, IconButton } from '@mui/material';
import { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory } from '../../../store/slices/patientHistorySlice';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

interface SpeechRecognitionAlternative {
   transcript: string;
   confidence: number;
}

interface SpeechRecognitionResult {
   isFinal: boolean;
   length: number;
   [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
   length: number;
   [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
   readonly resultIndex: number;
   readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
   lang: string;
   continuous: boolean;
   interimResults: boolean;
   maxAlternatives: number;
   onresult: ((event: SpeechRecognitionEvent) => void) | null;
   onend: ((event: Event) => void) | null;
   onerror: ((event: Event) => void) | null;
   start(): void;
   stop(): void;
   abort(): void;
}

interface Documentation {
   title: string;
}

export default function DocumentationTab() {
   const [note, setNote] = useState('');
   const [listening, setListening] = useState(false);
   const dispatch = useAppDispatch();
   const notes = useAppSelector((state) => state.patientHistory.documentation);

   const recognitionRef = useRef<SpeechRecognition | null>(null);

   const initSpeechRecognition = (): SpeechRecognition | null => {
      const SpeechRecognitionConstructor =
         (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      const recognition: SpeechRecognition = new SpeechRecognitionConstructor();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
         const transcript = event.results[0][0].transcript;
         setNote((prev) => (prev ? prev + ' ' : '') + transcript);
      };

      recognition.onend = () => {
         setListening(false);
      };

      recognition.onerror = (event) => {
         console.error('Speech recognition error', event);
         setListening(false);
      };

      return recognition;
   };

   const toggleListening = () => {
      if (listening) {
         recognitionRef.current?.stop();
         setListening(false);
      } else {
         const recognition = initSpeechRecognition();
         if (recognition) {
            recognitionRef.current = recognition;
            recognition.start();
            setListening(true);
         }
      }
   };

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
            <IconButton onClick={toggleListening} color={listening ? 'error' : 'primary'}>
               {listening ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
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
