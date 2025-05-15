/* eslint-disable @typescript-eslint/no-explicit-any */

import {
   Box,
   Typography,
   TextField,
   Button,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Stack,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory } from '../../../store/slices/patientHistorySlice';
import { Diagnosis } from '../../../store/slices/types/patientHistoryTypes';

export default function DiagnosisTab() {
   const [code, setCode] = useState('');
   const [description, setDescription] = useState('');
   const dispatch = useAppDispatch();
   const diagnosis = useAppSelector((state) => state.patientHistory.diagnosis);

   const handleAddDiagnosis = () => {
      if (code.trim() && description.trim()) {
         const newDiagnosis: Diagnosis = {
            code: parseInt(code),
            title: description,
            id: Math.random().toString(36).substring(2, 15),
            date: new Date().toISOString()
         }

         dispatch(addInfForHistory({ type: 'diagnosis', data: newDiagnosis }));

         setCode('');
         setDescription('');
      }
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Diagnosis
         </Typography>
         <Stack direction='row' spacing={2} mb={2}>
            <TextField label='ICD Code' value={code} onChange={(e) => setCode(e.target.value)} />
            <TextField
               label='Description'
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               fullWidth
            />
            <Button variant='contained' onClick={handleAddDiagnosis}>
               Add
            </Button>
         </Stack>

         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>ICD Code</TableCell>
                  <TableCell>Description</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {diagnosis.map((diag: any, index: number) => (
                  <TableRow key={index}>
                     <TableCell>{diag.code}</TableCell>
                     <TableCell>{diag.description}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </Box>
   );
}
