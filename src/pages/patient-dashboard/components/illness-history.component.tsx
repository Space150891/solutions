import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { MainCard } from '../../../components/cards/main-card.component';
import { patientIllnessHistory } from './mock';

export default function IllnessHistory() {
   return (
      <MainCard sx={{ height: '100%' }}>
         <Typography variant='h5'>Illness History:</Typography>
         <List>
            {patientIllnessHistory.map((el, idx) => {
               return (
                  <Box key={el.id}>
                     <ListItem alignItems='flex-start'>
                        <ListItemText
                           primary={el.illnessName}
                           secondary={
                              <>
                                 <Typography
                                    variant='body2'
                                    color='text.primary'
                                    component='span'
                                    display="block"
                                 >
                                    {el.description}
                                 </Typography>
                                 <Typography
                                    variant='caption'
                                    color='text.primary'
                                    component='span'
                                    display="block"
                                    sx={{ mt: 0.5 }}
                                 >
                                    {el.date}
                                 </Typography>
                              </>
                           }
                        />
                     </ListItem>
                     {idx !== patientIllnessHistory.length - 1 && <Divider variant='inset' component='li' />}
                  </Box>
               );
            })}
         </List>
      </MainCard>
   );
}
