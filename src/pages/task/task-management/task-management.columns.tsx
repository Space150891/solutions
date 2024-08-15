import { Task } from './task-management.mock';
import { formatDate } from '../../../utils/format-date.util';

import { IconButton, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

export const medicationManagementColumnsConfig = () => {
   const columns: GridColDef<Task>[] = [
      {
         field: 'id',
         headerName: 'ID',
         flex: 1,
      },
      {
         field: 'creator',
         headerName: 'Creator',
         flex: 1,
      },
      {
         field: 'assignedUser',
         headerName: 'Assigned to',
         flex: 1,
      },
      {
         field: 'isCompleted',
         headerName: 'Complete status',
         flex: 1,
         type: 'boolean',
         align: 'left',
         headerAlign: 'left',
      },
      {
         field: 'endDate',
         headerName: 'Due to',
         flex: 1,
         renderCell: ({ row }) => <Typography>{formatDate(row.endDate)}</Typography>,
      },

      {
         field: 'edit',
         headerName: 'View',
         flex: 1,

         sortable: false,
         filterable: false,
         renderCell: ({ row }) => {
            return (
               <Link to={`view/${row.id}`}>
                  <IconButton>
                     <ArrowForwardIcon />
                  </IconButton>
               </Link>
            );
         },
      },
   ];

   return columns;
};
