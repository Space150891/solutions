import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material';
import { IPages } from '../../types/common.types';
import { Search as SearchIcon } from '@mui/icons-material';

import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component';
import { useMedicationMaganementStyle } from './meidcation-management.style';
import { useMedicationManagementLogic } from './medication-management.logic';
import CreateOrEditMedicationModal from './components/create-or-edit-medication.modal';

export default function MedicationManagementPage() {
   const sx = useMedicationMaganementStyle();
   const { data, state, setState, handlers } = useMedicationManagementLogic();

   return (
      <>
         <CreateOrEditMedicationModal
            open={data.isOpenModal}
            selectedMedication={state.selectedMedication}
            onClose={handlers.handleCloseModal}
            onConfirm={
               state.selectedMedication ? handlers.handleEditMedication : handlers.handleCreateMedication
            }
         />

         <Card>
            <CardContent sx={sx.cardContent}>
               <Box sx={sx.header}>
                  <Typography variant='h5'>{IPages.MEDICATION_MANAGEMENT.toUpperCase()}</Typography>
                  <Button onClick={() => setState.setIsShownModal(true)} variant='contained'>
                     Add new medication
                  </Button>
               </Box>

               <TextField
                  sx={sx.searchInput}
                  name='search_medication'
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

               <CustomDataGrid columns={data.columns} rows={data.filteredList} />
            </CardContent>
         </Card>
      </>
   );
}
