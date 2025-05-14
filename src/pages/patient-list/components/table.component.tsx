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
import { formatDisplayDate, compareDates } from '../../../utils/date.util';

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
            <TableCell component='th' scope='row'>{row.firstName}</TableCell>
            <TableCell component='th' scope='row'>{row.lastName}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.gender}</TableCell>
            <TableCell>{formatDisplayDate(row.dateOfBirth)}</TableCell>
            <TableCell>{row.doctor.firstName}</TableCell>
            <TableCell>{row.doctor.lastName}</TableCell>
            <TableCell>{row.doctor.specialization}</TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
               <Collapse in={open} timeout='auto' unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                     <Typography variant='h6' gutterBottom component='div'>Contact Info</Typography>
                     <Table size='small' aria-label='purchases'>
                        <TableHead>
                           <TableRow>
                              <TableCell>Address</TableCell>
                              <TableCell>Mobile phone number</TableCell>
                              <TableCell>City</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           <TableRow>
                              <TableCell>{row.contactInfo.address}</TableCell>
                              <TableCell>{row.contactInfo.mobile}</TableCell>
                              <TableCell>{row.contactInfo.city}</TableCell>
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
   const [orderBy, setOrderBy] = useState<string>('firstName');
   const [page, setPage] = useState<number>(0);
   const [rowsPerPage, setRowsPerPage] = useState<number>(5);   const handleSort = (property: keyof IPatient | `doctor.${keyof IPatientDoctor}`) => (_event: React.MouseEvent<unknown>) => {
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
   }; const sortedPatients = [...patients].sort((a, b) => {
      const isAsc = order === 'asc';      if (orderBy === 'dateOfBirth') {
         return isAsc 
            ? compareDates(a.dateOfBirth, b.dateOfBirth)
            : compareDates(b.dateOfBirth, a.dateOfBirth);
      }

      if (orderBy.includes('doctor.')) {
         const doctorProp: keyof IPatientDoctor = orderBy.split('.')[1] as keyof IPatientDoctor;

         if (!a.doctor || !b.doctor) {
            return isAsc ? -1 : 1;
         }

         const valueA = String(a.doctor[doctorProp] ?? '');
         const valueB = String(b.doctor[doctorProp] ?? '');

         return isAsc
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
      }

      // Handle other fields
      const keyToUse = orderBy as keyof IPatient;
      const valueA = String(a[keyToUse] ?? '');
      const valueB = String(b[keyToUse] ?? '');

      return isAsc
         ? valueA.localeCompare(valueB)
         : valueB.localeCompare(valueA);
   });

   const paginatedPatients = sortedPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

   return (
      <TableContainer component={Paper}>
         <Table aria-label='collapsible table'>
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell align="left"><TableSortLabel active={orderBy === 'firstName'} direction={orderBy === 'firstName' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('firstName')}>First Name</TableSortLabel></TableCell>
                  <TableCell align="left"><TableSortLabel active={orderBy === 'lastName'} direction={orderBy === 'lastName' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('lastName')}>Last Name</TableSortLabel></TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left"><TableSortLabel active={orderBy === 'status'} direction={orderBy === 'status' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('status')}>Status</TableSortLabel></TableCell>
                  <TableCell align="left"><TableSortLabel active={orderBy === 'gender'} direction={orderBy === 'gender' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('gender')}>Gender</TableSortLabel></TableCell>
                  <TableCell align="left"><TableSortLabel active={orderBy === 'dateOfBirth'} direction={orderBy === 'dateOfBirth' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('dateOfBirth')}>Date of Birth</TableSortLabel></TableCell>
                  <TableCell align="left"><TableSortLabel active={(orderBy as string) === 'doctor.firstName'} direction={(orderBy as string) === 'doctor.firstName' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('doctor.firstName')}>Doctor's First Name</TableSortLabel></TableCell>
                  <TableCell align="left"><TableSortLabel active={(orderBy as string) === 'doctor.lastName'} direction={(orderBy as string) === 'doctor.lastName' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('doctor.lastName')}>Doctor's Last Name</TableSortLabel></TableCell>
                  <TableCell align="left"><TableSortLabel active={(orderBy as string) === 'doctor.specialization'} direction={(orderBy as string) === 'doctor.specialization' ? (order as 'asc' | 'desc') : 'asc'} onClick={handleSort('doctor.specialization')}>Specialization</TableSortLabel></TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {paginatedPatients.map((row) => <Row key={row.patientId} row={row} />)}
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
