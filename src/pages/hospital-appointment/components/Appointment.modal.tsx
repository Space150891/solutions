import {
   Autocomplete,
   Backdrop,
   Box,
   Button,
   DialogActions,
   Fade,
   Grid,
   Modal,
   TextField,
   Typography,
   styled,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IPatientDoctor } from '../../patient-list/types';
import { CloseOutlined } from '@mui/icons-material';
import { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { IEvent } from '../mock';

const style = {
   position: 'absolute' as const,
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '100%',
   maxWidth: '90vw',
   bgcolor: 'background.paper',
   borderRadius: '1rem',
   boxShadow: 24,
   p: 4,
};

const Item = styled(`div`)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

export type AppointmentModalProps = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   doctor: IPatientDoctor;
   scheduler: SchedulerHelpers;
   setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
};

export default function AppointmentModal({
   open = true,
   setOpen,
   doctor,
   scheduler,
   setEvents,
}: AppointmentModalProps) {
   const event = scheduler?.edited;
   const [state, setState] = useState({
      start: event?.start || null,
      end: event?.end || null,
      location: event?.location || '',
      phone_number: event?.phone_number || '',
      first_name: event?.first_name || '',
      last_name: event?.last_name || '',
      addition_info: event?.addition_info || '',
   });
   const [error, setError] = useState('');

   const handleChange = (value: string | Dayjs | null, name: string) => {
      console.log('change', name, value instanceof dayjs, value);
      let val: string | Date | null;
      if (value instanceof dayjs) {
         val = dayjs(scheduler.state[name].value)
            .set('hour', value.get('hour'))
            .set('minute', value.get('minute'))
            .toDate();

         console.log('val::', val);
         setState((prev) => ({
            ...prev,
            [name]: val,
         }));
      } else {
         setState((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   const handleSubmit = async () => {
      if (!state.start) {
         return setError('Time should be selected');
      }
      try {
         scheduler.loading(true);

         const addedUpdatedEvent = (await new Promise((res) => {
            const result: IEvent = {
               event_id: event?.event_id || Math.random(),
               title: `${state.first_name || 'no'} ${state.last_name || 'name'}`,
               start: state.start || scheduler.state.start.value,
               end: state.end || scheduler.state.end.value,
               location: state?.location || '',
               phone_number: state?.phone_number || '',
               first_name: state?.first_name || '',
               last_name: state?.last_name || '',
               addition_info: state?.addition_info || '',
            };
            setTimeout(() => {
               if (!event) {
                  setEvents((prev) => [...prev, result]);
               } else {
                  setEvents((prev) =>
                     prev.map((eve) => (eve.event_id === event.event_id ? { ...eve, ...result } : eve)),
                  );
               }

               res(result);
            }, 3000);
         })) as ProcessedEvent;

         scheduler.onConfirm(addedUpdatedEvent, event ? 'edit' : 'create');
         scheduler.close();
      } finally {
         scheduler.loading(false);
      }
   };

   const handleClose = () => setOpen(false);
   console.log('error::', error);
   console.log('event::', event);
   console.log('state::', state);

   return (
      <Modal
         aria-labelledby='transition-modal-title'
         aria-describedby='transition-modal-description'
         open={open}
         onClose={handleClose}
         closeAfterTransition
         slots={{ backdrop: Backdrop }}
         slotProps={{
            backdrop: {
               timeout: 500,
            },
         }}
      >
         <Fade in={open}>
            <Box sx={style}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                     id='transition-modal-title'
                     variant='h5'
                     component='h2'
                     sx={{ textTransform: 'uppercase' }}
                  >
                     Make an appointment
                  </Typography>
                  <Button variant='text' onClick={handleClose}>
                     <CloseOutlined color='action' />
                  </Button>
               </Box>

               <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} mt={4}>
                     <Typography
                        id='transition-modal-title'
                        variant='body1'
                        component='text'
                        sx={{ textTransform: 'uppercase' }}
                     >
                        Select time and place:
                     </Typography>
                  </Grid>
                  <Grid item xs='auto'>
                     <Item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <TimePicker
                              ampm={false}
                              label='Start'
                              minTime={dayjs(new Date(0, 0, 0, 9, 0))}
                              maxTime={dayjs(new Date(0, 0, 0, 17, 0))}
                              skipDisabled
                              value={state.start ? dayjs(state.start) : null}
                              onAccept={(newValue) => handleChange(newValue, 'start')}
                              slotProps={{
                                 layout: {
                                    sx: {
                                       ul: {
                                          '::-webkit-scrollbar': {
                                             width: '3px',
                                          },
                                          '::-webkit-scrollbar-track': {
                                             '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                                          },
                                          '::-webkit-scrollbar-thumb': {
                                             backgroundColor: 'rgba(0,0,0,.1)',
                                             borderRadius: '10px',
                                          },
                                       },
                                    },
                                 },
                              }}
                           />
                        </LocalizationProvider>
                     </Item>
                  </Grid>
                  <Grid item xs='auto'>
                     <Item>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <TimePicker
                              ampm={false}
                              label='End'
                              minTime={dayjs(new Date(0, 0, 0, 9, 0))}
                              maxTime={dayjs(new Date(0, 0, 0, 17, 0))}
                              skipDisabled
                              value={state.end ? dayjs(state.end) : null}
                              onAccept={(newValue) => handleChange(newValue, 'end')}
                              slotProps={{
                                 layout: {
                                    sx: {
                                       ul: {
                                          '::-webkit-scrollbar': {
                                             width: '3px',
                                          },
                                          '::-webkit-scrollbar-track': {
                                             '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                                          },
                                          '::-webkit-scrollbar-thumb': {
                                             backgroundColor: 'rgba(0,0,0,.1)',
                                             borderRadius: '10px',
                                          },
                                       },
                                    },
                                 },
                              }}
                           />
                        </LocalizationProvider>
                     </Item>
                  </Grid>
                  <Grid item xs>
                     <Item>
                        <Autocomplete
                           freeSolo
                           id='location'
                           options={doctor.locations as readonly string[]}
                           fullWidth
                           sx={{
                              '& .MuiInputBase-root': { height: '45px !important' },
                           }}
                           value={state.location}
                           onChange={(_, value) => handleChange(value, 'location')}
                           renderInput={(params) => (
                              <TextField {...params} variant='outlined' label='Location' />
                           )}
                        />
                     </Item>
                  </Grid>
                  <Grid item xs={12} mt={2}>
                     <Typography
                        id='transition-modal-title'
                        variant='body1'
                        component='text'
                        sx={{ textTransform: 'uppercase' }}
                     >
                        Enter your data:
                     </Typography>
                  </Grid>
                  <Grid item xs={4}>
                     <Item>
                        <TextField
                           variant='outlined'
                           label='First Name'
                           fullWidth
                           value={state.first_name || ''}
                           onChange={(e) => handleChange(e.target.value, 'first_name')}
                        />
                     </Item>
                  </Grid>
                  <Grid item xs={4}>
                     <Item>
                        <TextField
                           variant='outlined'
                           label='Last Name'
                           fullWidth
                           value={state.last_name || ''}
                           onChange={(e) => handleChange(e.target.value, 'last_name')}
                        />
                     </Item>
                  </Grid>
                  <Grid item xs={4}>
                     <Item>
                        <TextField
                           variant='outlined'
                           label='Phone Number'
                           fullWidth
                           value={state.phone_number || ''}
                           onChange={(e) => handleChange(e.target.value, 'phone_number')}
                        />
                     </Item>
                  </Grid>
                  <Grid item xs={12} mt={2}>
                     <Typography
                        id='transition-modal-title'
                        variant='body1'
                        component='text'
                        sx={{ textTransform: 'uppercase' }}
                     >
                        Describe what is bothering you:
                     </Typography>
                  </Grid>
                  <Grid item xs={12}>
                     <Item>
                        <TextField
                           variant='outlined'
                           label='Additional info'
                           fullWidth
                           multiline
                           rows={8}
                           value={state.addition_info || ''}
                           onChange={(e) => handleChange(e.target.value, 'addition_info')}
                           sx={{
                              '& .MuiInputBase-root': { height: 'initial !important' },
                           }}
                        />
                     </Item>
                  </Grid>
               </Grid>
               <Box>
                  <Button variant='contained' onClick={handleSubmit} fullWidth>
                     Send
                  </Button>
               </Box>
            </Box>
         </Fade>
      </Modal>
   );
}
