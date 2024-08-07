import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { IPages } from '../../types/common.types';

import { medicationManagementColumnsConfig } from './medication-management.columns';
import { medicationManagementMock } from './medication-management.mock';
import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component';
import { useMedicationMaganementStyle } from './meidcation-management.style';
import { useMedicationManagementLogic } from './medication-management.logic';
import AddMedicationModal from './components/add-medication.modal';

export default function MedicationManagementPage() {
   const sx = useMedicationMaganementStyle();
   const columns = medicationManagementColumnsConfig();
   const { state, setState, handlers } = useMedicationManagementLogic();

   return (
      <>
         <AddMedicationModal open={state.isShownModal} onClose={handlers.handleCloseModal} />

         <Card>
            <CardContent sx={sx.cardContent}>
               <Box sx={sx.header}>
                  <Typography variant='h5'>{IPages.MEDICATION_MANAGEMENT.toUpperCase()}</Typography>
                  <Button onClick={() => setState.setIsShownModal((prev) => !prev)} variant='contained'>
                     Add New Medication
                  </Button>
               </Box>

               <CustomDataGrid columns={columns} rows={medicationManagementMock} />
            </CardContent>
         </Card>
      </>
   );
}
