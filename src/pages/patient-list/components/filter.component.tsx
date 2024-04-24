import {
   Autocomplete,
   Box,
   Button,
   Card,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   SwipeableDrawer,
   TextField,
   Typography,
   styled,
} from '@mui/material';
import { useState } from 'react';
import { specializations } from '../mock';
import { FilterList } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Item = styled(`div`)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

export type FilterProps = {
   setFilters: React.Dispatch<React.SetStateAction<object>>;
};
export interface FilterCriteria {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   [key: string]: any;
}

export default function Filter({ setFilters }: FilterProps) {
   const [filter, setFilter] = useState<FilterCriteria>({});
   const [isOpen, setIsOpen] = useState<boolean>(false);
   console.log('filter:', filter);

   function onSaveHandle() {
      setFilters(filter);
      setIsOpen(false);
   }

   return (
      <Card>
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }} px={4} py={2}>
            <Typography variant='h4'>Patient List</Typography>
            <Button variant='text' onClick={() => setIsOpen(true)}>
               <FilterList />
            </Button>
         </Box>

         <SwipeableDrawer
            anchor='top'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
         >
            <Typography mt={4} px={2} variant='h4'>
               Filters
            </Typography>
            <Grid my={2} container spacing={2}>
               <Grid item xs={6}>
                  <Item>
                     <TextField
                        variant='outlined'
                        label='First Name'
                        fullWidth
                        value={filter.first_name}
                        onChange={(e) => setFilter((prev) => ({ ...prev, first_name: e.target.value }))}
                     />
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <TextField
                        variant='outlined'
                        label='Last Name'
                        fullWidth
                        value={filter.last_name}
                        onChange={(e) => setFilter((prev) => ({ ...prev, last_name: e.target.value }))}
                     />
                  </Item>
               </Grid>
               <Grid item xs={4}>
                  <Item>
                     <FormControl fullWidth>
                        <InputLabel id='status'>Status</InputLabel>
                        <Select
                           labelId='status'
                           value={filter.status}
                           onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
                           fullWidth
                           label='Status'
                        >
                           <MenuItem value=''>
                              <em>None</em>
                           </MenuItem>
                           <MenuItem value='wealth'>Wealth</MenuItem>
                           <MenuItem value='examination'>Examination</MenuItem>
                           <MenuItem value='ill'>Ill</MenuItem>
                        </Select>
                     </FormControl>
                  </Item>
               </Grid>
               <Grid item xs={4}>
                  <Item>
                     <FormControl fullWidth>
                        <InputLabel id='gender'>Gender</InputLabel>
                        <Select
                           labelId='gender'
                           value={filter.gender}
                           onChange={(e) => setFilter((prev) => ({ ...prev, gender: e.target.value }))}
                           fullWidth
                           label='Gender'
                        >
                           <MenuItem value=''>
                              <em>None</em>
                           </MenuItem>
                           <MenuItem value='Male'>Male</MenuItem>
                           <MenuItem value='Female'>Female</MenuItem>
                        </Select>
                     </FormControl>
                  </Item>
               </Grid>
               <Grid item xs={4}>
                  <Item>
                     <Autocomplete
                        freeSolo
                        multiple
                        id='specialization'
                        options={specializations}
                        fullWidth
                        onChange={(e, values) =>
                           setFilter((prev) => ({
                              ...prev,
                              doctor: { ...prev.doctor, specialization: values },
                           }))
                        }
                        renderInput={(params) => (
                           <TextField {...params} variant='outlined' label='Specialization' />
                        )}
                     />
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <TextField
                        variant='outlined'
                        label="Doctor's First Name"
                        fullWidth
                        value={filter.doctor?.first_name}
                        onChange={(e) =>
                           setFilter((prev) => ({
                              ...prev,
                              doctor: { ...prev.doctor, first_name: e.target.value },
                           }))
                        }
                     />
                  </Item>
               </Grid>
               <Grid item xs={6}>
                  <Item>
                     <TextField
                        variant='outlined'
                        label="Doctor's Last Name"
                        fullWidth
                        value={filter.doctor?.last_name || ''}
                        onChange={(e) =>
                           setFilter((prev) => ({
                              ...prev,
                              doctor: { ...prev.doctor, last_name: e.target.value },
                           }))
                        }
                     />
                  </Item>
               </Grid>
               <Grid item xs={2}>
                  <Item>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                           value={dayjs(filter.date_of_birth?.from)}
                           label='Born from'
                           slotProps={{ textField: { fullWidth: true } }}
                           onChange={(value) => {
                              console.log(value);

                              return setFilter((prev) => ({
                                 ...prev,
                                 date_of_birth: {
                                    ...prev.date_of_birth,
                                    from: dayjs(value).format('DD/MM/YYYY'),
                                 },
                              }));
                           }}
                        />
                     </LocalizationProvider>
                  </Item>
               </Grid>
               <Grid item xs={2}>
                  <Item>
                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                           value={dayjs(filter.date_of_birth?.to)}
                           label='Born untill'
                           slotProps={{ textField: { fullWidth: true } }}
                           onChange={(value) => {
                              console.log(value);

                              return setFilter((prev) => ({
                                 ...prev,
                                 date_of_birth: {
                                    ...prev.date_of_birth,
                                    to: dayjs(value).format('DD/MM/YYYY'),
                                 },
                              }));
                           }}
                        />
                     </LocalizationProvider>
                  </Item>
               </Grid>
            </Grid>
            <Button variant='text' onClick={onSaveHandle}>
               Save
            </Button>
            <Button variant='text' color='error' onClick={() => setIsOpen(false)}>
               Close
            </Button>
         </SwipeableDrawer>
      </Card>
   );
}
