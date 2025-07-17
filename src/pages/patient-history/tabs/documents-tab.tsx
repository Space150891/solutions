import { Box, Typography, Button, List, ListItem, ListItemText, Stack, Card, CardContent, Grid } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addInfForHistory } from '../../../store/slices/patientHistorySlice';
import { Document } from '../../../store/slices/types/patientHistoryTypes';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../routes/paths';
import { CloudUpload as CloudUploadIcon, FolderOpen as FolderOpenIcon } from '@mui/icons-material';

export default function DocumentsTab() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
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

   const navigateToRootDataManagement = () => {
      // Navigate to Root Data Management with a state parameter to indicate which folder to open
      navigate(paths.rootDataManagement, { state: { openFolder: 'folder-patientHistoryData' } });
   };

   return (
      <Box>
         <Typography variant='h6' mb={2}>
            Documents
         </Typography>

         <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
               <Card variant="outlined">
                  <CardContent>
                     <Typography variant="h6" gutterBottom>
                        Upload New Document
                     </Typography>
                     <Typography variant="body2" color="text.secondary" mb={2}>
                        Add a new document to the patient's history record.
                     </Typography>
                     <Button 
                        variant='contained' 
                        component='label'
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                     >
                        Upload Document
                        <input hidden type='file' onChange={handleFileChange} />
                     </Button>
                  </CardContent>
               </Card>
            </Grid>

            <Grid item xs={12} md={6}>
               <Card variant="outlined">
                  <CardContent>
                     <Typography variant="h6" gutterBottom>
                        Patient History Data
                     </Typography>
                     <Typography variant="body2" color="text.secondary" mb={2}>
                        Access the complete patient history document repository.
                     </Typography>
                     <Button 
                        variant='contained' 
                        color="secondary"
                        onClick={navigateToRootDataManagement}
                        startIcon={<FolderOpenIcon />}
                        fullWidth
                     >
                        Open Document Repository
                     </Button>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>

         <Typography variant="subtitle1" gutterBottom>
            Recent Documents
         </Typography>

         {documents.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
               No documents have been uploaded yet.
            </Typography>
         ) : (
            <List>
               {documents.map((file, index) => (
                  <ListItem key={index} divider={index < documents.length - 1}>
                     <ListItemText 
                        primary={file.title} 
                        secondary={`Uploaded on ${new Date(file.uploadedAt).toLocaleDateString()}`} 
                     />
                  </ListItem>
               ))}
            </List>
         )}
      </Box>
   );
}
