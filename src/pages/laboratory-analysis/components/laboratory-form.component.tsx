import { Add, Bloodtype } from '@mui/icons-material';
import {
   Avatar,
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   IconButton,
   TextField,
   Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';

export default function LaboratoryForm({ toggleOpen }: { toggleOpen: () => void }) {
   const [tests, setTests] = useState(1);

   const addTest = () => {
      setTests((prev) => ++prev);
   };

   return (
      <Box
         display='flex'
         width='100%'
         justifyContent='center'
         alignItems='center'
         height='calc(100svh - 60px)'
         p={5}
      >
         <Card sx={{ minWidth: '400px' }}>
            <CardHeader
               avatar={
                  <Avatar sx={{ backgroundColor: 'transparent' }} aria-label='analysis'>
                     <Bloodtype color='info' fontSize='large' />
                  </Avatar>
               }
               action={
                  <IconButton aria-label='settings' onClick={addTest}>
                     <Add color='info' />
                  </IconButton>
               }
               title='Analysis'
               titleTypographyProps={{ variant: 'h4' }}
               subheader='Enter patients data'
            />
            <CardContent>
               <Box
                  display='flex'
                  flexDirection='column'
                  gap={2}
                  maxHeight='600px'
                  overflow='auto'
                  sx={{
                     '::-webkit-scrollbar': {
                        width: '7px',
                     },
                     '::-webkit-scrollbar-track': {
                        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
                     },
                     '::-webkit-scrollbar-thumb': {
                        borderLeft: '4px solid rgba(0, 0, 0, 0)',
                        backgroundClip: 'padding-box',
                        backgroundColor: 'rgba(0,0,0,.1)',
                        borderRadius: '10px',
                     },
                  }}
               >
                  {tests > 0 &&
                     Array.from({ length: tests }, (_, index) => (
                        <Grid2 key={index} xs={1}>
                           <Box display='flex' width='100%' flexDirection='column'>
                              <Box display='flex' alignItems='center' gap={1}>
                                 <Avatar
                                    sx={{ width: 24, height: 24, fontSize: '0.95rem' }}
                                    alt={`test_${index}`}
                                 >
                                    {index + 1}
                                 </Avatar>
                                 <Typography variant='h6'>Test</Typography>
                              </Box>
                              <TextField fullWidth label='Test name' variant='standard' />
                              <TextField fullWidth label='Value' variant='standard' />
                              <TextField fullWidth label='Unit' variant='standard' />
                              <TextField fullWidth label='Normal reference range' variant='standard' />
                           </Box>
                        </Grid2>
                     ))}
               </Box>
            </CardContent>
            <CardActions>
               <Button fullWidth size='small' color='primary' onClick={toggleOpen}>
                  Send
               </Button>
            </CardActions>
         </Card>
      </Box>
   );
}
