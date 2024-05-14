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

const patientIllnessHistory = [
   {
      illnessName: 'Flu',
      description: 'Patient had symptoms of fever, cough, and body aches.',
      date: '2022-01-15',
   },
   {
      illnessName: 'Asthma',
      description: 'Patient experienced shortness of breath and wheezing.',
      date: '2021-11-20',
   },
   {
      illnessName: 'Sprained Ankle',
      description: 'Patient sprained their ankle during a hiking trip.',
      date: '2022-02-10',
   },
   {
      illnessName: 'Appendicitis',
      description: 'Patient underwent surgery for appendicitis.',
      date: '2021-09-05',
   },
   {
      illnessName: 'Appendicitis',
      description: 'Patient underwent consultation for appendicitis surgery.',
      date: '2021-09-03',
   },
];

export default function IllnessHistory() {
   return (
      <MainCard sx={{ height: '100%' }}>
         <Typography variant='h5'>Illness History:</Typography>
         <List>
            {patientIllnessHistory.map((el, idx) => {
               return (
                  <>
                     <ListItem alignItems='flex-start'>
                        <ListItemText
                           primary={el.illnessName}
                           secondary={
                              <>
                                 <Typography variant='body2' color='text.primary'>
                                    {el.description}
                                 </Typography>
                                 <Typography variant='caption' color='text.primary'>
                                    {el.date}
                                 </Typography>
                              </>
                           }
                        />
                     </ListItem>
                     {idx !== patientIllnessHistory.length - 1 && <Divider variant='inset' component='li' />}
                  </>
               );
            })}
         </List>
      </MainCard>
   );
}
