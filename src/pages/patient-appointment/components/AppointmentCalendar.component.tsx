import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import AppointmentModal from './Appointment.modal';
import { Dayjs } from 'dayjs';

export default function AppointmentCalendar({ doctor }) {
   const [date, setDate] = useState<Dayjs | null>(null);
   const [open, setOpen] = useState<boolean>(false);

   const newTheme = (theme: any) =>
      createTheme({
         ...theme,
         components: {
            MuiPickersDay: {
               styleOverrides: {
                  root: {
                     color: '#1565c0',
                     borderRadius: '3px',
                     borderWidth: '1px',
                     borderColor: '#2196f3',
                     border: '1px solid',
                     backgroundColor: '#90caf975',

                     '&.Mui-disabled': {
                        backgroundColor: '#fefefe90',
                        borderColor: '#b8b8b8',
                     },
                  },
               },
            },
         },
      });
   console.log('date:', date);

   return (
      <>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={newTheme}>
               <StaticDatePicker
                  orientation='landscape'
                  disablePast
                  value={date}
                  displayStaticWrapperAs='desktop'
                  onAccept={(value) => {
                     setOpen(true);
                     console.log('click:', value);
                     setDate(value);
                  }}
               />
            </ThemeProvider>
         </LocalizationProvider>
         <AppointmentModal open={open} setOpen={setOpen} doctor={doctor} />
      </>
   );
}
