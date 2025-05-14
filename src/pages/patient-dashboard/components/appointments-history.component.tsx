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
import { appointmentHistory } from './mock';

export default function AppointmentHistory() {
   return (
      <MainCard sx={{ height: '100%' }}>
         <Typography variant='h5'>Appointment History:</Typography>
         <List>
            {appointmentHistory.map((el, idx) => {
               return (
                  <Box key={el.id}>
                     <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                           <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
                        </ListItemAvatar>
                        <ListItemText
                           primary={el.doctorName}
                           secondary={
                              <>
                                 <Typography variant='body2' color='text.primary' component='span'>
                                    {el.reason}
                                 </Typography>
                                 <Typography variant='body1' color='text.primary' component='span'>
                                    Prescription: {el.prescription}
                                 </Typography>
                                 <Typography variant='caption' color='text.primary' component='span'>
                                    {el.date}
                                 </Typography>
                              </>
                           }
                        />
                     </ListItem>
                     {idx !== appointmentHistory.length - 1 && <Divider variant='inset' component='li' />}
                  </Box>
               );
            })}
         </List>
      </MainCard>
   );
}
