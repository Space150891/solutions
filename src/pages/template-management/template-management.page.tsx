import { Box, Button, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { FormBuilderPostData, ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

export default function TemplateManagementPage() {
   const [formData, setFormData] = useState<FormBuilderPostData>({ task_data: [] });
   const [isShownPreview, setIsShownPreview] = useState(false);

   const handleUpdateForm = (data: FormBuilderPostData) => {
      console.log(data);
      setFormData(data);
   };

   return (
      <Box sx={{ width: '100%', maxWidth: '1250px', margin: '0 auto', py: 3 }}>
         <Button sx={{ mb: 2 }} variant='contained' onClick={() => setIsShownPreview((prev) => !prev)}>
            Open form {isShownPreview ? 'builder' : 'preview'}
         </Button>

         <Box className={isShownPreview ? 'hidden' : ''}>
            <ReactFormBuilder onPost={handleUpdateForm} />
         </Box>

         {isShownPreview ? (
            <Card>
               <CardContent>
                  <ReactFormGenerator data={formData.task_data} form_action='' form_method='' />
               </CardContent>
            </Card>
         ) : null}
      </Box>
   );
}
