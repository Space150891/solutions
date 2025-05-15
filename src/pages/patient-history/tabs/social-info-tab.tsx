import { Box, Typography, TextField, Button, Stack, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory } from '../../../store/slices/patientHistorySlice';
import { SocialEntry } from '../../../store/slices/types/patientHistoryTypes';

export default function SocialInfoTab() {
   const dispatch = useAppDispatch();
   const socialHistory = useAppSelector((state) => state.patientHistory.socialInfo);

   const [livingConditions, setLivingConditions] = useState('');
   const [supportSystem, setSupportSystem] = useState('');
   const [specialNotes, setSpecialNotes] = useState('');

   const handleSave = () => {
      if (livingConditions.trim() || supportSystem.trim() || specialNotes.trim()) {
         const newEntry: SocialEntry = {
            id: Math.random().toString(36).substring(2, 15),
            livingConditions,
            supportSystem,
            specialNotes,
            lastUpdated: new Date().toISOString()
         };

         dispatch(addInfForHistory({ type: 'socialInfo', data: newEntry }));

         setLivingConditions('');
         setSupportSystem('');
         setSpecialNotes('');
      }
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Social Information
         </Typography>

         <Stack spacing={2}>
            <TextField
               label='Living Conditions'
               placeholder='e.g. Lives alone, shared housing, etc.'
               fullWidth
               value={livingConditions}
               onChange={(e) => setLivingConditions(e.target.value)}
            />

            <TextField
               label='Support System'
               placeholder='e.g. Family, caregiver, community support'
               fullWidth
               value={supportSystem}
               onChange={(e) => setSupportSystem(e.target.value)}
            />

            <TextField
               label='Special Notes or Considerations'
               placeholder='Enter any relevant social or personal considerations'
               multiline
               fullWidth
               value={specialNotes}
               onChange={(e) => setSpecialNotes(e.target.value)}
            />

            <Button
               variant='contained'
               onClick={handleSave}
               disabled={!livingConditions.trim() && !supportSystem.trim() && !specialNotes.trim()}
            >
               Save Info
            </Button>
         </Stack>

         {socialHistory?.length > 0 && (
            <Box mt={4}>
               <Typography variant='subtitle1' mb={1}>
                  Saved Information:
               </Typography>
               <List dense>
                  {socialHistory.map((item, index) => (
                     <ListItem key={index} sx={{ pl: 0 }}>
                        <ListItemText
                           primary={`Entry ${index + 1}`}
                           secondary={
                              <>
                                 {item.livingConditions && (
                                    <div>
                                       <strong>Living:</strong> {item.livingConditions}
                                    </div>
                                 )}
                                 {item.supportSystem && (
                                    <div>
                                       <strong>Support:</strong> {item.supportSystem}
                                    </div>
                                 )}
                                 {item.specialNotes && (
                                    <div>
                                       <strong>Notes:</strong> {item.specialNotes}
                                    </div>
                                 )}
                              </>
                           }
                        />
                     </ListItem>
                  ))}
               </List>
            </Box>
         )}
      </Box>
   );
}
