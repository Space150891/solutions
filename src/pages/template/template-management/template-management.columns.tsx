import { GridColDef } from '@mui/x-data-grid';
import { Template } from '../template-view/template-view.mock';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const templateManagementColumnsConfig = () => {
   const columns: GridColDef<Template>[] = [
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
