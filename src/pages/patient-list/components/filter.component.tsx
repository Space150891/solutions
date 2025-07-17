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
   useTheme,
} from '@mui/material';
import { useState } from 'react';
import { specializations } from '../mock';
import { FilterList } from '@mui/icons-material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DATE_TIME_FORMAT } from '../../../utils/date.util';

dayjs.extend(utc);

const Item = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
   borderRadius: theme.shape.borderRadius,
   padding: theme.spacing(2),
   '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
      '&:hover': {
         backgroundColor: theme.palette.mode === 'dark' ?
            `${theme.palette.background.paper}80` :
            theme.palette.background.default,
      }
   },
   '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary
   },
   '& .MuiSelect-icon': {
      color: theme.palette.text.secondary
   },
   '& .MuiAutocomplete-tag': {
      backgroundColor: theme.palette.mode === 'dark' ?
         theme.palette.primary.dark :
         theme.palette.primary.light,
      color: theme.palette.primary.contrastText
   }
}));

export type FilterProps = {
   setFilters: React.Dispatch<React.SetStateAction<object>>;
};

export interface FilterCriteria {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   [key: string]: any;
}

export default function Filter({ setFilters }: FilterProps) {
   const theme = useTheme();
   const [filter, setFilter] = useState<FilterCriteria>({});
   const [isOpen, setIsOpen] = useState<boolean>(false);

   function onSaveHandle() {
      // Remove empty values and format dates correctly
      const cleanedFilter = Object.entries(filter).reduce((acc, [key, value]) => {
         if (value === '' || value === null || value === undefined) return acc;
         if (key === 'dateOfBirth') {
            const { from, to } = value;
            if (from || to) {
               return {
                  ...acc,
                  dateOfBirth: {
                     ...(from && { from: dayjs(from).utc().format(DATE_TIME_FORMAT) }),
                     ...(to && { to: dayjs(to).utc().format(DATE_TIME_FORMAT) })
                  }
               };
            }
            return acc;
         }
         return { ...acc, [key]: value };
      }, {});

      setFilters(cleanedFilter);
      setIsOpen(false);
   }

   function handleDateFromChange(value: dayjs.Dayjs | null) {
      if (!value) {
         setFilter((prev) => ({
            ...prev,
            dateOfBirth: {
               ...prev.dateOfBirth,
               from: undefined,
            },
         }));
         return;
      }
      setFilter((prev) => ({
         ...prev,
         dateOfBirth: {
            ...prev.dateOfBirth,
            from: value.startOf('day'),
         },
      }));
   }

   function handleDateToChange(value: dayjs.Dayjs | null) {
      if (!value) {
         setFilter((prev) => ({
            ...prev,
            dateOfBirth: {
               ...prev.dateOfBirth,
               to: undefined,
            },
         }));
         return;
      }
      setFilter((prev) => ({
         ...prev,
         dateOfBirth: {
            ...prev.dateOfBirth,
            to: value.endOf('day'),
         },
      }));
   }

   return (
      <Card sx={{
         backgroundColor: theme.palette.mode === 'dark' ?
            theme.palette.background.paper :
            theme.palette.background.default
      }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} px={4} py={2}>
            <Typography variant='h4'>Patient List</Typography>
            <Button
               variant='contained'
               onClick={() => setIsOpen(true)}
               startIcon={<FilterList />}
               size="small"
            >
               Filters
            </Button>
         </Box>

         <SwipeableDrawer
            anchor='top'
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            PaperProps={{
               sx: {
                  backgroundColor: theme.palette.mode === 'dark' ?
                     theme.palette.background.default :
                     theme.palette.background.paper,
                  backgroundImage: 'none'
               }
            }}
         >
            <Box sx={{ maxWidth: 1200, width: '100%', mx: 'auto', p: 3 }}>
               <Typography
                  variant='h4'
                  sx={{
                     mb: 3,
                     pb: 2,
                     borderBottom: `1px solid ${theme.palette.divider}`,
                     display: 'flex',
                     alignItems: 'center',
                     gap: 1
                  }}
               >
                  <FilterList /> Filters
               </Typography>

               <Grid container spacing={3}>
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
                              value={filter.status || ''}
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
                              value={filter.gender || ''}
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
                        <TextField
                           label="Born from"
                           type="date"
                           value={filter.dateOfBirth?.from ? dayjs(filter.dateOfBirth.from).format('YYYY-MM-DD') : ''}
                           onChange={(e) => {
                              const value = e.target.value ? dayjs(e.target.value).startOf('day') : null;
                              handleDateFromChange(value);
                           }}
                           fullWidth
                           InputLabelProps={{
                              shrink: true,
                           }}
                        />
                     </Item>
                  </Grid>
                  <Grid item xs={2}>
                     <Item>
                        <TextField
                           label="Born until"
                           type="date"
                           value={filter.dateOfBirth?.to ? dayjs(filter.dateOfBirth.to).format('YYYY-MM-DD') : ''}
                           onChange={(e) => {
                              const value = e.target.value ? dayjs(e.target.value).endOf('day') : null;
                              handleDateToChange(value);
                           }}
                           fullWidth
                           InputLabelProps={{
                              shrink: true,
                           }}
                        />
                     </Item>
                  </Grid>
               </Grid>

               <Box sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-end',
                  mt: 4,
                  pt: 3,
                  borderTop: `1px solid ${theme.palette.divider}`
               }}>
                  <Button
                     variant='outlined'
                     color='inherit'
                     onClick={() => setIsOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     variant='contained'
                     onClick={onSaveHandle}
                     startIcon={<FilterList />}
                  >
                     Apply Filters
                  </Button>
               </Box>
            </Box>
         </SwipeableDrawer>
      </Card>
   );
}
