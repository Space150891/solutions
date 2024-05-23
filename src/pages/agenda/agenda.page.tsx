import {
   Box,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   useTheme,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { agendas } from './mock';

interface Column {
   id: 'time' | 'task' | 'doctor' | 'patient' | 'outcome';
   label: string;
   minWidth?: number;
   align?: 'right';
   format?: (value: number) => string;
}

interface Data {
   time: string;
   task: string;
   doctor: string;
   patient: string;
   outcome: string;
}

const columns: readonly Column[] = [
   { id: 'time', label: 'Time', minWidth: 70 },
   { id: 'task', label: 'Task', minWidth: 170 },
   { id: 'doctor', label: 'Doctor', minWidth: 100 },
   {
      id: 'patient',
      label: 'Patient',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'outcome',
      label: 'Outcome',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
   },
];

export default function Agenda() {
   const theme = useTheme();
   return (
      <Box
         display='flex'
         width='100%'
         flexDirection='column'
         height={'calc(100svh - 60px)'}
         maxHeight={'calc(100svh - 60px)'}
      >
         <Box sx={{ backgroundColor: theme.palette.primary.main }} p={1} width='100%'>
            <Typography variant='h4' color={theme.palette.primary.contrastText}>
               Agenda
            </Typography>
         </Box>
         <Box p={4} width='100%'>
            <TableContainer sx={{ height: '100%' }}>
               <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                           >
                              {column.label}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {agendas
                        .sort((a, b) => {
                           const [ah, am] = a.time.split(':').map(Number);
                           const [bh, bm] = b.time.split(':').map(Number);

                           const timeA = ah * 60 + am;
                           const timeB = bh * 60 + bm;

                           return timeA - timeB;
                        })
                        .map((row, idx) => {
                           return (
                              <TableRow hover role='checkbox' tabIndex={-1} key={row.task + idx}>
                                 {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                       <TableCell key={column.id} align={column.align}>
                                          {column.format && typeof value === 'number'
                                             ? column.format(value)
                                             : value}
                                       </TableCell>
                                    );
                                 })}
                              </TableRow>
                           );
                        })}
                  </TableBody>
               </Table>
            </TableContainer>
         </Box>
      </Box>
   );
}
