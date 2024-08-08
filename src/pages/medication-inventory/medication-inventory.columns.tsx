import { Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';

import { MedicationInventory } from './medication-inventory.mock';

export const medicationInventoryColumnsConfig = () => {
   const columns: GridColDef<MedicationInventory>[] = [
      {
         field: 'id',
         headerName: 'ID',
         flex: 1,
         renderCell: ({ row }) => <Typography>{row.id}</Typography>,
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

      // {
      //    field: 'edit',
      //    headerName: 'Edit',
      //    flex: 1,

      //    sortable: false,
      //    filterable: false,
      //    renderCell: ({ row }) => {
      //       return (
      //          <IconButton onClick={() => setSelectedMedication(row)}>
      //             <EditIcon />
      //          </IconButton>
      //       );
      //    },
      // },
   ];

   return columns;
};
