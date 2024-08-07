import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { IPages } from '../../types/common.types';

import { medicationManagementColumnsConfig } from './medication-management.columns';
import { medicationManagementMock } from './medication-management.mock';
import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component';
import { useMedicationMaganementStyle } from './meidcation-management.style';

export default function MedicationManagementPage() {
   const columns = medicationManagementColumnsConfig();
   const sx = useMedicationMaganementStyle();

   return (
      <Card>
         <CardContent sx={sx.cardContent}>
            <Box sx={sx.header}>
               <Typography variant='h5'>{IPages.MEDICATION_MANAGEMENT.toUpperCase()}</Typography>
               <Button variant='contained'>Add new medication</Button>
            </Box>

            <CustomDataGrid columns={columns} rows={medicationManagementMock} />
         </CardContent>
      </Card>
   );
}
