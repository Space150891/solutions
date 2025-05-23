import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Paper
} from '@mui/material';
import { appointmentHistory } from '../../patient-dashboard/components/mock';

export default function RecentAppointmentsTable() {
  const theme = useTheme();
  return (
    <TableContainer component={Paper} sx={{
      background: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      borderRadius: 2,
      overflow: 'auto',
      minWidth: 320,
      height: { lg: 420, xs: 'auto' }, // Match AnalyticsReportSection MainCard height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
    }}>
      <Table size="small" aria-label="recent appointments table" sx={{ flex: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Prescription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentHistory.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>
                <Typography variant="body2">{row.date}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 28, height: 28, fontSize: 14 }}>
                    {row.doctorName.split(' ').map((n) => n[0]).join('')}
                  </Avatar>
                  <Typography variant="body2">{row.doctorName}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{row.reason}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color={row.prescription === 'None' ? 'text.secondary' : 'success.main'}>
                  {row.prescription}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
