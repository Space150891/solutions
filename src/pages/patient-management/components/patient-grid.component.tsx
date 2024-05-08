import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   Collapse,
   IconButton,
   IconButtonProps,
   Typography,
   styled,
} from '@mui/material';
import { IManagePatient } from '../mock';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useState } from 'react';

type PatientGridProps = {
   patients: IManagePatient[];
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

export default function PatientGrid({ patients }: PatientGridProps) {
   const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

   const handleExpandClick = (id: string | number) => {
      setExpanded((prevState) => ({
         ...prevState,
         [id]: !prevState[id],
      }));
   };

   return (
      <Box>
         <Grid2 container spacing={1} m={0} p={2}>
            {patients.map((patient: IManagePatient) => {
               return (
                  <Grid2 xs={3} key={patient.id}>
                     <Box sx={{ width: '100%' }}>
                        <Card>
                           <CardContent>
                              <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                 {patient.gender}
                              </Typography>
                              <Typography
                                 variant='h5'
                                 component='div'
                                 sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                              >
                                 {patient.first_name} {patient.last_name}
                              </Typography>
                              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                 {patient.date_of_birth}
                              </Typography>
                              <Typography variant='body2'>Patient</Typography>
                           </CardContent>
                           <CardActions disableSpacing>
                              <ExpandMore
                                 expand={expanded[patient.id] || false}
                                 onClick={() => handleExpandClick(patient.id)}
                                 aria-expanded={expanded[patient.id] || false}
                                 aria-label='show more'
                              >
                                 <ExpandMoreIcon />
                              </ExpandMore>
                           </CardActions>
                           <Collapse in={expanded[patient.id]} timeout='auto' unmountOnExit>
                              <CardContent>
                                 <Typography>Email: {patient.email}</Typography>
                                 <Typography>Phone: {patient.phone_number}</Typography>
                              </CardContent>
                           </Collapse>
                        </Card>
                     </Box>
                  </Grid2>
               );
            })}
         </Grid2>
      </Box>
   );
}
