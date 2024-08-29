import { Box, Button, Card, CardContent } from '@mui/material';

import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

import { useTemplateManagementLogic } from './template-management.logic';
import { useTemplateManagementStyle } from './template-management.style';

export default function TemplateManagementPage() {
   const { handlers, setState, state } = useTemplateManagementLogic();
   const sx = useTemplateManagementStyle();

   return (
      <Box sx={sx.wrapper}>
         <Button
            sx={sx.button}
            disabled={state.formData.task_data.length === 0}
            variant='contained'
            onClick={() => setState.setIsShownPreview((prev) => !prev)}
         >
            Open form {state.isShownPreview ? 'builder' : 'preview'}
         </Button>

         <Box className={sx.builder(state.isShownPreview)}>
            <ReactFormBuilder data={state.formData.task_data} editMode onPost={handlers.handleUpdateForm} />
         </Box>

         {state.isShownPreview ? (
            <Card>
               <CardContent>
                  <ReactFormGenerator
                     submitButton={
                        <Button onClick={(data) => console.log(data)} variant='contained'>
                           Save
                        </Button>
                     }
                     data={state.formData.task_data}
                     form_action=''
                     form_method=''
                  />
               </CardContent>
            </Card>
         ) : null}
      </Box>
   );
}
