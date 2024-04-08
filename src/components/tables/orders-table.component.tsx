import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
   Box,
   Link,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   useTheme,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';

import { type IHeadCells, type IRow } from './types';

function createData(trackingNo: number, name: string, fat: number, carbs: number, protein: number) {
   return { trackingNo, name, fat, carbs, protein };
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
   const stabilizedThis = array.map((el, index) => [el, index] as const);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
         return order;
      }
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator<T>(order: 'asc' | 'desc', orderBy: keyof T): (a: T, b: T) => number {
   return order === 'desc'
      ? (a: T, b: T) => descendingComparator(a, b, orderBy)
      : (a: T, b: T) => -descendingComparator(a, b, orderBy);
}

const rows: IRow[] = [
   createData(84564564, 'Camera Lens', 40, 2, 40570),
   createData(98764564, 'Laptop', 300, 0, 180139),
   createData(98756325, 'Mobile', 355, 1, 90989),
   createData(98652366, 'Handset', 50, 1, 10239),
   createData(13286564, 'Computer Accessories', 100, 1, 83348),
   createData(86739658, 'TV', 99, 0, 410780),
   createData(13256498, 'Keyboard', 125, 2, 70999),
   createData(98753263, 'Mouse', 89, 2, 10570),
   createData(98753275, 'Desktop', 185, 1, 98063),
   createData(98753291, 'Chair', 100, 0, 14001),
];

const headCells: IHeadCells[] = [
   {
      id: 'trackingNo',
      align: 'left',
      disablePadding: false,
      label: 'Tracking No.',
   },
   {
      id: 'name',
      align: 'left',
      disablePadding: true,
      label: 'Product Name',
   },
   {
      id: 'fat',
      align: 'right',
      disablePadding: false,
      label: 'Total Order',
   },
   {
      id: 'carbs',
      align: 'left',
      disablePadding: false,

      label: 'Status',
   },
   {
      id: 'protein',
      align: 'right',
      disablePadding: false,
      label: 'Total Amount',
   },
];

function OrderTableHead({ order, orderBy }: { order: 'asc' | 'desc'; orderBy: keyof IRow }) {
   return (
      <TableHead>
         <TableRow>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  {headCell.label}
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
}

const OrderStatus = ({ status }: { status: number }) => {
   const { palette } = useTheme();
   let color: 'warning' | 'success' | 'error' | 'primary';
   let title;

   switch (status) {
      case 0:
         color = 'warning';
         title = 'Pending';
         break;
      case 1:
         color = 'success';
         title = 'Approved';
         break;
      case 2:
         color = 'error';
         title = 'Rejected';
         break;
      default:
         color = 'primary';
         title = 'None';
   }

   return (
      <Stack direction='row' spacing={1} alignItems='center'>
         <Box
            sx={{
               width: 8,
               height: 8,
               borderRadius: '50%',
               background: palette[color].main,
            }}
         />
         <Typography>{title}</Typography>
      </Stack>
   );
};

export const OrdersTable = () => {
   const [order] = useState<'asc' | 'desc'>('asc');
   const [orderBy] = useState<keyof IRow>('trackingNo');
   const [selected] = useState<IRow[]>([]);

   const isSelected = (trackingNo: number) => selected.some((row) => row.trackingNo === trackingNo);

   return (
      <TableContainer
         sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' },
         }}
      >
         <Table
            aria-labelledby='tableTitle'
            sx={{
               '& .MuiTableCell-root:first-of-type': {
                  pl: 2,
               },
               '& .MuiTableCell-root:last-of-type': {
                  pr: 3,
               },
            }}
         >
            <OrderTableHead order={order} orderBy={orderBy} />
            <TableBody>
               {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isItemSelected = isSelected(row.trackingNo);

                  return (
                     <TableRow
                        hover
                        key={row.trackingNo}
                        role='checkbox'
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        sx={{
                           '&:last-child td, &:last-child th': {
                              border: 0,
                           },
                        }}
                        tabIndex={-1}
                     >
                        <TableCell component='th' id={labelId} scope='row' align='left'>
                           <Link color='secondary' component={RouterLink} to=''>
                              {row.trackingNo}
                           </Link>
                        </TableCell>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='right'>{row.fat}</TableCell>
                        <TableCell align='left'>
                           <OrderStatus status={row.carbs} />
                        </TableCell>
                        <TableCell align='right'>
                           <NumericFormat
                              value={row.protein}
                              displayType='text'
                              thousandSeparator
                              prefix='$'
                           />
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </TableContainer>
   );
};
