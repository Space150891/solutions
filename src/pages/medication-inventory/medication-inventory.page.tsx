import { Card, CardContent, Box, Typography, TextField, InputAdornment } from '@mui/material';
import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component';
import { IPages } from '../../types/common.types';
import { useMedicationInventoryStyle } from './medication-inventory.style';
import { useMedicationInventoryLogic } from './medication-inventory.logic';
import { Search as SearchIcon } from '@mui/icons-material';

export default function MedicationInventoryPage() {
   const sx = useMedicationInventoryStyle();
   const { data, state, setState } = useMedicationInventoryLogic();

   return (
      <Card>
         <CardContent sx={sx.cardContent}>
            <Box sx={sx.header}>
               <Typography variant='h5'>{IPages.MEDICATION_INVENTORY.toUpperCase()}</Typography>
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
   );
}
