import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material';
import { IPages } from '../../types/common.types';
import { Search as SearchIcon } from '@mui/icons-material';

import { medicationManagementColumnsConfig } from './medication-management.columns';

import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component';
import { useMedicationMaganementStyle } from './meidcation-management.style';
import { useMedicationManagementLogic } from './medication-management.logic';
import AddMedicationModal from './components/add-medication.modal';

export default function MedicationManagementPage() {
   const sx = useMedicationMaganementStyle();
   const columns = medicationManagementColumnsConfig();
   const { data, state, setState, handlers } = useMedicationManagementLogic();

   return (
      <>
         <AddMedicationModal
            open={state.isShownModal}
            onClose={handlers.handleCloseModal}
            onAddMedication={handlers.handleAddMedication}
         />

         <Card>
            <CardContent sx={sx.cardContent}>
               <Box sx={sx.header}>
                  <Typography variant='h5'>{IPages.MEDICATION_MANAGEMENT.toUpperCase()}</Typography>
                  <Button onClick={() => setState.setIsShownModal((prev) => !prev)} variant='contained'>
                     Add New Medication
                  </Button>
               </Box>

               <TextField
                  sx={{ my: 3 }}
                  fullWidth
                  value={state.searchKeyword}
                  onChange={(e) => setState.setSearchKeyword(e.target.value)}
                  label='Search medication'
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position='start'>
                           <SearchIcon />
                        </InputAdornment>
                     ),
                  }}
               />

               <CustomDataGrid columns={columns} rows={data.filteredList} />
            </CardContent>
         </Card>
      </>
   );
}
