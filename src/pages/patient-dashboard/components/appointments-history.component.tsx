import {
   Avatar,
   Box,
   Divider,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Typography,
} from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';

const appointmentHistory = [
   {
      date: '2023-04-05',
      doctorName: 'Dr. Jane Smith',
      reason: 'Annual Check-up',
      prescription: 'None',
   },
   {
      date: '2023-03-15',
      doctorName: 'Dr. John Doe',
      reason: 'Flu Symptoms',
      prescription: 'Antiviral medication',
   },
   {
      date: '2023-02-20',
      doctorName: 'Dr. Emily Brown',
      reason: 'Sprained Ankle',
      prescription: 'Pain relievers and rest',
   },
   {
      date: '2023-01-10',
      doctorName: 'Dr. Michael Johnson',
      reason: 'Asthma Follow-up',
      prescription: 'Inhaler',
   },
];

export default function AppointmentHistory() {
   return (
      <MainCard sx={{ height: '100%' }}>
         <Typography variant='h5'>Appointment History:</Typography>
         <List>
            {appointmentHistory.map((el, idx) => {
               return (
                  <>
                     <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                           <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                           primary={el.doctorName}
                           secondary={
                              <>
                                 <Typography variant='body2' color='text.primary'>
                                    {el.reason}
                                 </Typography>
                                 <Typography variant='body1' color='text.primary'>
                                    Prescription: {el.prescription}
                                 </Typography>
                                 <Typography variant='caption' color='text.primary'>
                                    {el.date}
                                 </Typography>
                              </>
                           }
                        />
                     </ListItem>
                     {idx !== appointmentHistory.length - 1 && <Divider variant='inset' component='li' />}
                  </>
               );
            })}
         </List>
      </MainCard>
   );
}
