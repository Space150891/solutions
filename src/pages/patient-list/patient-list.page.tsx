import * as React from 'react';
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
import { patients } from './mock';
import { IPatient } from './types';

function Row(props: { row: IPatient }) {
   const { row } = props;
   const [open, setOpen] = React.useState(false);

   return (
      <React.Fragment>
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
      </React.Fragment>
   );
}

export default function PatientListPage() {
   return (
      <TableContainer component={Paper}>
         <Table aria-label='collapsible table'>
            <TableHead>
               <TableRow>
                  <TableCell />
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'>Gender</TableCell>
                  <TableCell align='right'>Date of Birth</TableCell>
                  <TableCell align='right'>Doctor's First Name</TableCell>
                  <TableCell align='right'>Doctor's Last Name</TableCell>
                  <TableCell align='right'>Specialization</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {patients.map((row) => (
                  <Row key={row.patient_id} row={row} />
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
