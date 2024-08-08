import { Medication } from './medication-management.mock';
import { formatDate } from '../../utils/format-date.util';
import { IconButton, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { SetState } from '../../types/common.types';

export const medicationManagementColumnsConfig = (setSelectedMedication: SetState<Medication | null>) => {
   const columns: GridColDef<Medication>[] = [
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
         field: 'startDate',
         headerName: 'Start',
         flex: 1,
         renderCell: ({ row }) => <Typography>{formatDate(row.startDate)}</Typography>,
      },
      {
         field: 'stopDate',
         headerName: 'Stop',
         flex: 1,
         renderCell: ({ row }) => <Typography>{formatDate(row.stopDate)}</Typography>,
      },
      {
         field: 'dosageInstructions',
         headerName: 'Dosage instructions',
         flex: 1,
      },
      {
         field: 'form',
         headerName: 'Form',
         flex: 1,
      },
      {
         field: 'frequency',
         headerName: 'Frequency',
         flex: 1,
      },
      {
         field: 'duration',
         headerName: 'Duration',
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
               <IconButton onClick={() => setSelectedMedication(row)}>
                  <EditIcon />
               </IconButton>
            );
         },
      },
   ];

   return columns;
};
