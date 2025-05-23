import {
   Box,
   Button,
   FormControl,
   InputAdornment,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   TextField,
   ToggleButton,
   ToggleButtonGroup,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { IManagedDoctor, IManagedNurse, IManagedOther } from '../mock';
import { v4 as uuidv4 } from 'uuid';

type AddPersonnelProps = {
   addPersonnel: (position: string, employee: IManagedDoctor | IManagedNurse | IManagedOther) => void;
};

export default function AddPersonnel({ addPersonnel }: AddPersonnelProps) {
   const [position, setPosition] = useState<'doctor' | 'nurse' | 'other'>('doctor');
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');
   const [gender, setGender] = useState<'Male' | 'Female' | null>(null);
   const [salary, setSalary] = useState<number>(0);
   const [yearsOfExp, setYearsOfExp] = useState<number>(0);
   const [locations, setLocations] = useState<string[]>([]);
   const [location, setLocation] = useState<string>('');
   const [specialization, setSpecialization] = useState<string>('');
   const [shift, setShift] = useState<'Morning' | 'Afternoon' | 'Night' | null>(null);
   const [hireDate, setHireDate] = useState<Dayjs | null>(null);
   const [rank, setRank] = useState<string>('');
   const [role, setRole] = useState<string>('');
   const [department, setDepartment] = useState<string>('');

   const clearData = () => {
      setFirstName('');
      setLastName('');
      setGender(null);
      setSalary(0);
      setLocation('');
      setLocations([]);
      setSpecialization('');
      setShift(null);
      setHireDate(null);
      setRank('');
      setRole('');
      setDepartment('');
   };

   const handleChangeGender = (event: SelectChangeEvent<typeof gender>) => {
      if (event.target.value === 'Male' || event.target.value === 'Female') {
         setGender(event.target.value);
      }
   };

   const handleChangeShift = (event: SelectChangeEvent<typeof shift>) => {
      if (
         event.target.value === 'Morning' ||
         event.target.value === 'Afternoon' ||
         event.target.value === 'Night'
      ) {
         setShift(event.target.value);
      }
   };

   const handleChangePosition = (
      _: React.MouseEvent<HTMLElement>,
      newPosition: 'doctor' | 'nurse' | 'other',
   ) => {
      setPosition(newPosition);
   };

   const handleSubmit = () => {
      const data = {         doctor: {
            id: uuidv4(),
            firstName,
            lastName,
            gender,
            specialization,
            locations,
            hireDate: hireDate?.format('MM/DD/YYYY'),
            salary,
            yearsOfExperience: yearsOfExp,
         } as IManagedDoctor,

         nurse: {
            id: uuidv4(),
            firstName,
            lastName,
            gender,
            rank,
            department,
            location,
            hireDate: hireDate?.format('MM/DD/YYYY'),
            salary,
            yearsOfExperience: yearsOfExp,
         } as IManagedNurse,

         other: {
            id: uuidv4(),
            firstName,
            lastName,
            gender,
            role,
            department,
            location,
            hireDate: hireDate?.format('MM/DD/YYYY'),
            salary,
            yearsOfExperience: yearsOfExp,
            shift,
         } as IManagedOther,
      };

      addPersonnel(position, data[position]);
   };

   return (
      <Box maxWidth={'60%'} margin={'0 auto'} sx={{ display: 'flex' }} flexDirection={'column'} gap={2}>
         <Box>
            <ToggleButtonGroup exclusive value={position} onChange={handleChangePosition} color='primary'>
               <ToggleButton value='doctor'>Doctor</ToggleButton>
               <ToggleButton value='nurse'>Nurse</ToggleButton>
               <ToggleButton value='other'>Other</ToggleButton>
            </ToggleButtonGroup>
         </Box>
         <Grid2 container columnSpacing={1} columns={6} rowSpacing={2}>
            <Grid2 xs={6}>
               <TextField
                  label='First Name'
                  variant='filled'
                  fullWidth
                  value={firstName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setFirstName(event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={6}>
               <TextField
                  label='Last Name'
                  variant='filled'
                  fullWidth
                  value={lastName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setLastName(event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={3}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     label='Date of Hire'
                     value={hireDate}
                     onChange={(newValue) => setHireDate(newValue)}
                     sx={{ width: '100%' }}
                  />
               </LocalizationProvider>
            </Grid2>
            <Grid2 xs={3}>
               <FormControl fullWidth>
                  <InputLabel id='gender-select-label'>Gender</InputLabel>
                  <Select
                     labelId='gender-select-label'
                     id='gender-select'
                     value={gender}
                     label='Gender'
                     onChange={handleChangeGender}
                     sx={{ height: '45px' }}
                  >
                     <MenuItem value='Male'>Male</MenuItem>
                     <MenuItem value='Female'>Female</MenuItem>
                  </Select>
               </FormControl>
            </Grid2>
            <Grid2 xs={3}>
               <TextField
                  label='Salary'
                  variant='outlined'
                  type='number'
                  InputProps={{
                     startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                  }}
                  fullWidth
                  value={salary}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setSalary(+event.target.value);
                  }}
               />
            </Grid2>
            <Grid2 xs={3}>
               <TextField
                  label='Years of experience'
                  variant='outlined'
                  type='number'
                  fullWidth
                  InputProps={{
                     endAdornment: <InputAdornment position='end'>year(s)</InputAdornment>,
                  }}
                  value={yearsOfExp}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setYearsOfExp(+event.target.value);
                  }}
               />
            </Grid2>
            {position === 'doctor' && (
               <>
                  <Grid2 xs={3}>
                     <TextField
                        label='Specialization'
                        variant='outlined'
                        fullWidth
                        value={specialization}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setSpecialization(event.target.value);
                        }}
                     />
                  </Grid2>
                  <Grid2 xs={3}>
                     <TextField
                        label='Locations (comma split)'
                        variant='outlined'
                        fullWidth
                        value={locations.join(', ')}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setLocations(event.target.value.split(', '));
                        }}
                     />
                  </Grid2>
               </>
            )}
            {position === 'nurse' && (
               <>
                  <Grid2 xs={3}>
                     <TextField
                        label='Rank'
                        variant='outlined'
                        fullWidth
                        value={rank}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setRank(event.target.value);
                        }}
                     />
                  </Grid2>
                  <Grid2 xs={3}>
                     <TextField
                        label='Department'
                        variant='outlined'
                        fullWidth
                        value={department}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setDepartment(event.target.value);
                        }}
                     />
                  </Grid2>
                  <Grid2 xs={3}>
                     <TextField
                        label='Location'
                        variant='outlined'
                        fullWidth
                        value={location}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setLocation(event.target.value);
                        }}
                     />
                  </Grid2>
               </>
            )}
            {position === 'other' && (
               <>
                  <Grid2 xs={3}>
                     <TextField
                        label='Role'
                        variant='outlined'
                        fullWidth
                        value={role}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setRole(event.target.value);
                        }}
                     />
                  </Grid2>
                  <Grid2 xs={3}>
                     <TextField
                        label='Department'
                        variant='outlined'
                        fullWidth
                        value={department}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setDepartment(event.target.value);
                        }}
                     />
                  </Grid2>
                  <Grid2 xs={3}>
                     <TextField
                        label='Location'
                        variant='outlined'
                        fullWidth
                        value={location}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setLocation(event.target.value);
                        }}
                     />
                  </Grid2>
                  <Grid2 xs={3}>
                     <FormControl fullWidth>
                        <InputLabel id='shift-select-label'>Shift</InputLabel>
                        <Select
                           labelId='shift-select-label'
                           id='shift-select'
                           value={shift}
                           label='Shift'
                           onChange={handleChangeShift}
                           sx={{ height: '45px' }}
                        >
                           <MenuItem value='Morning'>Morning</MenuItem>
                           <MenuItem value='Afternoon'>Afternoon</MenuItem>
                           <MenuItem value='Night'>Night</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid2>
               </>
            )}
            <Grid2 xs={6}>
               <Button variant='contained' fullWidth onClick={handleSubmit}>
                  Add New Stuff member
               </Button>
            </Grid2>
         </Grid2>
      </Box>
   );
}
