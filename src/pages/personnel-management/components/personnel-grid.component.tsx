import {
   Box,
   Card,
   CardActions,
   CardContent,
   Collapse,
   IconButton,
   IconButtonProps,
   ToggleButton,
   ToggleButtonGroup,
   Typography,
   styled,
} from '@mui/material';
import { IManagedDoctor, IManagedNurse, IManagedOther } from '../mock';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';

type PersonnelGridProps = {
   doctors: IManagedDoctor[];
   nurses: IManagedNurse[];
   others: IManagedOther[];
};
interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
   }),
}));

export default function PersonnelGrid({ doctors, nurses, others }: PersonnelGridProps) {
   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
   const [display, setDisplay] = useState('doctors');

   const handleExpandClick = (id: string | number) => {
      setExpanded((prevState) => ({
         ...prevState,
         [id]: !prevState[id],
      }));
   };

   const handleChange = (event: React.MouseEvent<HTMLElement>, newDisplay: string) => {
      setDisplay(newDisplay);
   };

   return (
      <Box>
         <Box paddingLeft={3}>
            <ToggleButtonGroup exclusive value={display} onChange={handleChange} color='primary'>
               <ToggleButton value='doctors'>Doctors</ToggleButton>
               <ToggleButton value='nurses'>Nurses</ToggleButton>
               <ToggleButton value='others'>Others</ToggleButton>
            </ToggleButtonGroup>
         </Box>
         <Box>
            <Grid2 container spacing={1} m={0} p={2}>
               {display === 'doctors' &&
                  doctors.map((doctor: IManagedDoctor) => {
                     return (
                        <Grid2 xs={3} key={doctor.id}>
                           <Box sx={{ width: '100%' }}>
                              <Card>
                                 <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                       {doctor.gender}
                                    </Typography>
                                    <Typography
                                       variant='h5'
                                       component='div'
                                       sx={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                       }}
                                    >
                                       {doctor.first_name} {doctor.last_name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                       Hired at: {doctor.hire_date}
                                    </Typography>
                                    <Typography variant='body2'>Doctor, {doctor.specialization}</Typography>
                                 </CardContent>
                                 <CardActions disableSpacing>
                                    <ExpandMore
                                       expand={expanded[doctor.id] || false}
                                       onClick={() => handleExpandClick(doctor.id)}
                                       aria-expanded={expanded[doctor.id] || false}
                                       aria-label='show more'
                                    >
                                       <ExpandMoreIcon />
                                    </ExpandMore>
                                 </CardActions>
                                 <Collapse in={expanded[doctor.id]} timeout='auto' unmountOnExit>
                                    <CardContent>
                                       <Typography>
                                          Locations:{' '}
                                          {doctor.locations.map(
                                             (location, i) =>
                                                location + (i + 1 === doctor.locations.length ? '' : ', '),
                                          )}
                                       </Typography>
                                       <Typography>
                                          Salary: ${doctor.salary}
                                          <Typography variant='caption'>/year</Typography>
                                       </Typography>
                                       <Typography>
                                          Years of experience: {doctor.years_of_experience}
                                       </Typography>
                                    </CardContent>
                                 </Collapse>
                              </Card>
                           </Box>
                        </Grid2>
                     );
                  })}
               {display === 'nurses' &&
                  nurses.map((nurse: IManagedNurse) => {
                     return (
                        <Grid2 xs={3} key={nurse.id}>
                           <Box sx={{ width: '100%' }}>
                              <Card>
                                 <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                       {nurse.gender}
                                    </Typography>
                                    <Typography
                                       variant='h5'
                                       component='div'
                                       sx={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                       }}
                                    >
                                       {nurse.first_name} {nurse.last_name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                       Hired at: {nurse.hire_date}
                                    </Typography>
                                    <Typography variant='body2'>Nurse, {nurse.rank}</Typography>
                                    <Typography variant='body2'>Department: {nurse.department}</Typography>
                                 </CardContent>
                                 <CardActions disableSpacing>
                                    <ExpandMore
                                       expand={expanded[nurse.id] || false}
                                       onClick={() => handleExpandClick(nurse.id)}
                                       aria-expanded={expanded[nurse.id] || false}
                                       aria-label='show more'
                                    >
                                       <ExpandMoreIcon />
                                    </ExpandMore>
                                 </CardActions>
                                 <Collapse in={expanded[nurse.id]} timeout='auto' unmountOnExit>
                                    <CardContent>
                                       <Typography>Locations: {nurse.location}</Typography>
                                       <Typography>
                                          Salary: ${nurse.salary}
                                          <Typography variant='caption'>/year</Typography>
                                       </Typography>
                                       <Typography>
                                          Years of experience: {nurse.years_of_experience}
                                       </Typography>
                                    </CardContent>
                                 </Collapse>
                              </Card>
                           </Box>
                        </Grid2>
                     );
                  })}
               {display === 'others' &&
                  others.map((other: IManagedOther) => {
                     return (
                        <Grid2 xs={3} key={other.id}>
                           <Box sx={{ width: '100%' }}>
                              <Card>
                                 <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                       {other.gender}
                                    </Typography>
                                    <Typography
                                       variant='h5'
                                       component='div'
                                       sx={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                       }}
                                    >
                                       {other.first_name} {other.last_name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                       Hired at: {other.hire_date}
                                    </Typography>
                                    <Typography variant='body2'>Stuff, {other.role}</Typography>
                                    <Typography variant='body2'>Department: {other.department}</Typography>
                                    <Typography>Shift: {other.shift}</Typography>
                                 </CardContent>
                                 <CardActions disableSpacing>
                                    <ExpandMore
                                       expand={expanded[other.id] || false}
                                       onClick={() => handleExpandClick(other.id)}
                                       aria-expanded={expanded[other.id] || false}
                                       aria-label='show more'
                                    >
                                       <ExpandMoreIcon />
                                    </ExpandMore>
                                 </CardActions>
                                 <Collapse in={expanded[other.id]} timeout='auto' unmountOnExit>
                                    <CardContent>
                                       <Typography>Locations: {other.location}</Typography>
                                       <Typography>
                                          Salary: ${other.salary}
                                          <Typography variant='caption'>/year</Typography>
                                       </Typography>
                                       <Typography>
                                          Years of experience: {other.years_of_experience}
                                       </Typography>
                                    </CardContent>
                                 </Collapse>
                              </Card>
                           </Box>
                        </Grid2>
                     );
                  })}
            </Grid2>
         </Box>
      </Box>
   );
}
