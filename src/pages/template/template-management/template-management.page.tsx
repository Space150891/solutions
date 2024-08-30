import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { IPages } from '../../../types/common.types';
import CustomDataGrid from '../../../components/custom-data-grid/custom-data-grid.component';
import { Link } from 'react-router-dom';
import { useTemplateManagementStyle } from './template-management.style';
import { useTemplateManagementLogic } from './template-management.logic';

export default function TemplateManagementPage() {
   const sx = useTemplateManagementStyle();
   const { data, state } = useTemplateManagementLogic();

   return (
      <Card>
         <CardContent sx={sx.cardContent}>
            <Box sx={sx.header}>
               <Typography variant='h5'>{IPages.TEMPLATE_MANAGEMENT.toUpperCase()}</Typography>
               <Button component={Link} to='create' variant='contained'>
                  Create new template
               </Button>
            </Box>

            <CustomDataGrid columns={data.columns} rows={state.rows} />
         </CardContent>
      </Card>
   );
}
