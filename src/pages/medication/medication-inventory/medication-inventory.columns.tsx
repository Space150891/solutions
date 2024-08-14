import { IconButton } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

import { MedicationInventoryItem } from './medication-inventory.mock';
import { SetState } from '../../../types/common.types';

export const medicationInventoryColumnsConfig = (
   setSelectedItem: SetState<MedicationInventoryItem | null>,
) => {
   const columns: GridColDef<MedicationInventoryItem>[] = [
      {
         field: 'id',
         headerName: 'ID',
         flex: 1,
      },
      {
         field: 'name',
         headerName: 'Name',
         flex: 1,
      },
      {
         field: 'quantity',
         headerName: 'Quantity',
         flex: 1,
      },
      {
         field: 'inDoctorsOffice',
         headerName: 'In doctor`s office',
         flex: 1,
         type: 'boolean',
         align: 'left',
         headerAlign: 'left',
      },
      {
         field: 'inProxies',
         headerName: 'In proxies',
         flex: 1,
         type: 'boolean',
         align: 'left',
         headerAlign: 'left',
      },
      {
         field: 'prescription',
         headerName: 'Prescription',
         flex: 1,
      },

      {
         field: 'edit',
         headerName: 'Edit',
         flex: 1,

         sortable: false,
         filterable: false,
         renderCell: ({ row }) => {
            return (
               <IconButton onClick={() => setSelectedItem(row)}>
                  <EditIcon />
               </IconButton>
            );
         },
      },
   ];

   return columns;
};
