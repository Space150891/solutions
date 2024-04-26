import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from 'react';
import { TablePagination, TableSortLabel } from '@mui/material';
import { IPatient, IPatientDoctor } from '../types';

function Row(props: { row: IPatient }) {
   const { row } = props;
   const [open, setOpen] = useState(false);

   return (
      <>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
               <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            <TableCell component='th' scope='row'>
               {row.first_name}
            </TableCell>
            <TableCell component='th' scope='row'>
               {row.last_name}
            </TableCell>
            <TableCell align='right'>{row.email}</TableCell>
            <TableCell align='right'>{row.status}</TableCell>
            <TableCell align='right'>{row.gender}</TableCell>
            <TableCell align='right'>{row.date_of_birth}</TableCell>
            <TableCell align='right'>{row.doctor.first_name}</TableCell>
            <TableCell align='right'>{row.doctor.last_name}</TableCell>
            <TableCell align='right'>{row.doctor.specialization}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout='auto' unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Typography variant='h6' gutterBottom component='div'>
                        Contact Info
                     </Typography>
                     <Table size='small' aria-label='purchases'>
                        <TableHead>
                           <TableRow>
                              <TableCell>Address</TableCell>
                              <TableCell>Mobile phone number</TableCell>
                              <TableCell align='right'>City</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell component='th' scope='row'>
                                 {row.contact_info.address}
                              </TableCell>
                              <TableCell>{row.contact_info.mobile}</TableCell>
                              <TableCell align='right'>{row.contact_info.city}</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </>
   );
}

export type PatientListProps = {
   patients: IPatient[];
};

export default function PatientListTable({ patients }: PatientListProps) {
   const [order, setOrder] = useState<string>('asc');
   const [orderBy, setOrderBy] = useState<keyof IPatient>('first_name');
   const [page, setPage] = useState<number>(0);
   const [rowsPerPage, setRowsPerPage] = useState<number>(5);

   const handleSort = (property: any) => (event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const sortedPatients = [...patients].sort((a, b) => {
      const isAsc = order === 'asc';
      if (orderBy === 'date_of_birth') {
         // Convert date strings to Date objects for comparison
         const dateA = new Date(a[orderBy]).getTime();
         const dateB = new Date(b[orderBy]).getTime();

         return isAsc ? dateA - dateB : dateB - dateA;
      } else if (orderBy.includes('doctor.')) {
         const doctorProp: keyof IPatientDoctor = orderBy.split('.')[1] as keyof IPatientDoctor;
         if (a.doctor[doctorProp] < b.doctor[doctorProp]) {
            return isAsc ? -1 : 1;
         }
         if (a.doctor[doctorProp] > b.doctor[doctorProp]) {
            return isAsc ? 1 : -1;
         }

         return 0;
      } else {
         if (a[orderBy] < b[orderBy]) {
            return isAsc ? -1 : 1;
         }
         if (a[orderBy] > b[orderBy]) {
            return isAsc ? 1 : -1;
         }
         return 0;
      }
   });

   const paginatedPatients = sortedPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

   return (
      <TableContainer component={Paper}>
         <Table aria-label='collapsible table'>
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell>
                     <TableSortLabel
                        active={orderBy === 'first_name'}
                        direction={orderBy === 'first_name' ? (order as 'asc' | 'desc') : 'asc'}
                        onClick={handleSort('first_name')}
                     >
                        First Name
                     </TableSortLabel>
                  </TableCell>
                  <TableCell>
                     <TableSortLabel
                        active={orderBy === 'last_name'}
                        direction={orderBy === 'last_name' ? (order as 'asc' | 'desc') : 'asc'}
                        onClick={handleSort('last_name')}
                     >
                        Last Name
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>
                     <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? (order as 'asc' | 'desc') : 'asc'}
                        onClick={handleSort('status')}
                     >
                        Status
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align='right'>
                     <TableSortLabel
                        active={orderBy === 'gender'}
                        direction={orderBy === 'gender' ? (order as 'asc' | 'desc') : 'asc'}
                        onClick={handleSort('gender')}
                     >
                        Gender
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align='right'>
                     <TableSortLabel
                        active={orderBy === 'date_of_birth'}
                        direction={orderBy === 'date_of_birth' ? (order as 'asc' | 'desc') : 'asc'}
                        onClick={handleSort('date_of_birth')}
                     >
                        Date of Birth
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align='right'>
                     <TableSortLabel
                        active={(orderBy as string) === 'doctor.first_name'}
                        direction={
                           (orderBy as string) === 'doctor.first_name' ? (order as 'asc' | 'desc') : 'asc'
                        }
                        onClick={handleSort('doctor.first_name')}
                     >
                        Doctor's First Name
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align='right'>
                     <TableSortLabel
                        active={(orderBy as string) === 'doctor.last_name'}
                        direction={
                           (orderBy as string) === 'doctor.last_name' ? (order as 'asc' | 'desc') : 'asc'
                        }
                        onClick={handleSort('doctor.last_name')}
                     >
                        Doctor's Last Name
                     </TableSortLabel>
                  </TableCell>
                  <TableCell align='right'>
                     <TableSortLabel
                        active={(orderBy as string) === 'doctor.specialization'}
                        direction={
                           (orderBy as string) === 'doctor.specialization' ? (order as 'asc' | 'desc') : 'asc'
                        }
                        onClick={handleSort('doctor.specialization')}
                     >
                        Specialization
                     </TableSortLabel>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {paginatedPatients.map((row) => (
                  <Row key={row.patient_id} row={row} />
               ))}
            </TableBody>
         </Table>
         <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={sortedPatients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      </TableContainer>
   );
}
