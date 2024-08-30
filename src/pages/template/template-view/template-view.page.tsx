import { Box, Button, Card, CardContent } from '@mui/material';

import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

import { useTemplateViewLogic } from './template-view.logic';
import { useTemplateViewStyle } from './template-view.style';

export default function TemplateViewPage() {
   const { data, handlers, setState, state } = useTemplateViewLogic();
   const sx = useTemplateViewStyle();

   return (
      // <PageWrapper
      //    heading={data.pageIsCreate ? 'Create Template' : `Template View (ID: ${state.template.id})`}
      //    headerButton={{ label: 'Go back', onClick: () => data.navigate(-1) }}
      // >
      <Box sx={sx.wrapper}>
         <Box sx={sx.buttonsWrapper}>
            <Button
               sx={sx.button}
               disabled={state.template.fields.length === 0}
               variant='contained'
               onClick={() => setState.setIsShownPreview((prev) => !prev)}
            >
               Open form {state.isShownPreview ? 'builder' : 'preview'}
            </Button>
            <Button sx={sx.button} onClick={() => data.navigate(-1)} variant='contained'>
               Go back
            </Button>
         </Box>

         <Box className={sx.builder(state.isShownPreview)}>
            <ReactFormBuilder data={state.template.fields} editMode onPost={handlers.handleUpdateForm} />
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
                     data={state.template.fields}
                     form_action=''
                     form_method=''
                  />
               </CardContent>
            </Card>
         ) : null}
      </Box>
      // </PageWrapper>
   );
}
