import {
   Autocomplete,
   Backdrop,
   Box,
   Button,
   Fade,
   Grid,
   Modal,
   TextField,
   Typography,
   outlinedInputClasses,
   styled,
} from '@mui/material';
import { LocalizationProvider, StaticTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { specializations } from '../../patient-list/mock';
import { IPatientDoctor } from '../../patient-list/types';
import { CloseOutlined } from '@mui/icons-material';

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
};

export default function AppointmentModal({ open = true, setOpen, doctor }: AppointmentModalProps) {
   const handleClose = () => setOpen(false);

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
                           //    onChange={(e, values) =>
                           //       setFilter((prev) => ({
                           //          ...prev,
                           //          doctor: { ...prev.doctor, specialization: values },
                           //       }))
                           //    }
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
                        <TextField variant='outlined' label='First Name' fullWidth />
                     </Item>
                  </Grid>
                  <Grid item xs={4}>
                     <Item>
                        <TextField variant='outlined' label='Last Name' fullWidth />
                     </Item>
                  </Grid>
                  <Grid item xs={4}>
                     <Item>
                        <TextField variant='outlined' label='Phone Number' fullWidth />
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
                           sx={{
                              '& .MuiInputBase-root': { height: 'initial !important' },
                           }}
                        />
                     </Item>
                  </Grid>
               </Grid>
               <Box>
                  <Button variant='contained' onClick={handleClose} fullWidth>
                     Send
                  </Button>
               </Box>
            </Box>
         </Fade>
      </Modal>
   );
}
