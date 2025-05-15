import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory } from '../../../store/slices/patientHistorySlice';
import { Document } from '../../../store/slices/types/patientHistoryTypes';

export default function DocumentsTab() {
   const dispatch = useAppDispatch();
   const documents = useAppSelector((state) => state.patientHistory.documents);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const newDocument: Document = {
            title: file.name,
            id: Math.random().toString(36).substring(2, 15),
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
         };

         dispatch(addInfForHistory({ type: 'documents', data: newDocument }));
      }
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Documents
         </Typography>
         <Button variant='contained' component='label'>
            Upload Document
            <input hidden type='file' onChange={handleFileChange} />
         </Button>

         <List>
            {documents.map((file, index) => (
               <ListItem key={index}>
                  <ListItemText primary={file.title} />
               </ListItem>
            ))}
         </List>
      </Box>
   );
}
