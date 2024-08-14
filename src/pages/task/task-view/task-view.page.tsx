import PageWrapper from '../../../components/page-wrapper/page-wrapper';

import { newTaskFields } from './task-view.mock';
import { Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { useTaskViewLogic } from './task-view.logic';
import { useTaskViewStyle } from './task-view.style';

export default function TaskViewPage() {
   const { data, handlers, state } = useTaskViewLogic();
   const sx = useTaskViewStyle();

   return (
      <PageWrapper
         heading={`Task View (ID: ${state.task.id})`}
         headerButton={{ label: 'Go back', onClick: () => data.navigate(-1) }}
      >
         <Grid2 container rowSpacing={2} sx={sx.gridContainer}>
            {newTaskFields.map((field) => (
               <Grid2 xs={12} key={field.field}>
                  {handlers.handleRenderField(field)}
               </Grid2>
            ))}

            <Button sx={sx.confirmButton} onClick={() => data.navigate(-1)} variant='contained'>
               Save
            </Button>
         </Grid2>
      </PageWrapper>
   );
}
