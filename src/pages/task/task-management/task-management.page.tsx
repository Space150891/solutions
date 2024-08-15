import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { IPages } from '../../../types/common.types';
import { useTaskManagementStyle } from './task-management.style';
import { useTaskManagementLogic } from './task-management.logic';
import CustomDataGrid from '../../../components/custom-data-grid/custom-data-grid.component';
import { Link } from 'react-router-dom';

export default function TaskManagementPage() {
   const sx = useTaskManagementStyle();
   const { data, state } = useTaskManagementLogic();

   return (
      <Card>
         <CardContent sx={sx.cardContent}>
            <Box sx={sx.header}>
               <Typography variant='h5'>{IPages.TASK_MANAGEMENT.toUpperCase()}</Typography>
               <Button component={Link} to='create' variant='contained'>
                  Create new task
               </Button>
            </Box>

            <CustomDataGrid columns={data.columns} rows={state.rows} />
         </CardContent>
      </Card>
   );
}
