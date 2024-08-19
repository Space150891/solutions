import { GridColDef } from '@mui/x-data-grid';
import { UserActivity } from './user-activity.mock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/format-date.util';

export const userActivityColumnsConfig = () => {
   const columns: GridColDef<UserActivity>[] = [
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
         field: 'createdAt',
         headerName: 'Created at',
         flex: 1,
         renderCell: ({ row }) => <Typography>{formatDate(row.createdAt)}</Typography>,
      },
      {
         field: 'edit',
         headerName: 'View',
         flex: 1,

         sortable: false,
         filterable: false,
         renderCell: ({ row }) => {
            return (
               <Link to={`/cubex/task-management/view/${row.id}`}>
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
