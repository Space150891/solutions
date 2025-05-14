import { Box, Button, Paper, Typography, useTheme, alpha } from '@mui/material';
import { IPages } from '../../types/common.types';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { doctorNames } from './mock';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function WaitingBoard() {
   const theme = useTheme();
   const [waitingQueue, setWaitingQueue] = useState<number[]>(generateRandomArray(10));
   const [activeTickets, setActiveTickets] = useState<number[]>([]);
   const [lastIndex, setLastIndex] = useState<number>(0);

   function generateRandomArray(maxLength: number): number[] {
      const length = Math.floor(Math.random() * (maxLength + 10)) + 10;
      return Array.from({ length }, (_, idx) => idx);
   }

   const activateTickets = (wait: number[], active: number[]) => {
      let updatedWaitingQueue: number[] = [...wait];
      const updatedActiveTickets: number[] = [...active];

      while (updatedActiveTickets.length < 5 && updatedWaitingQueue.length > 0) {
         const nextTicket: number = updatedWaitingQueue[0];
         if (nextTicket !== undefined) {
            updatedActiveTickets.push(nextTicket);
            updatedWaitingQueue = updatedWaitingQueue.slice(1);
         }
      }

      setActiveTickets(updatedActiveTickets);
      setWaitingQueue(updatedWaitingQueue);
   };

   const completeTicket = (ticketId: number) => {
      setActiveTickets((prev) => prev.filter((t) => t !== ticketId));
   };

   const addTicket = () => {
      setWaitingQueue((prev) => [...prev, lastIndex]);
      setLastIndex((prev) => ++prev);
   };

   useEffect(() => {
      if (activeTickets.length < 5 && waitingQueue.length > 0) {
         setTimeout(() => {
            activateTickets(waitingQueue, activeTickets);
         }, 1540);
      }
   }, [activeTickets, waitingQueue]);

   useEffect(() => {
      setLastIndex(waitingQueue.length);
   }, [waitingQueue.length]);

   return (
      <Box component='section' sx={{ p: 3, height: '100%' }}>
         <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h4' fontWeight="medium">{IPages.WAITING_BOARD}</Typography>
            <Button
               variant="contained"
               startIcon={<AddIcon />}
               onClick={addTicket}
               sx={{
                  borderRadius: 2,
                  textTransform: 'none',
               }}
            >
               Add New Ticket
            </Button>
         </Box>

         <Grid2 container spacing={4}>
            <Grid2 xs={12} md={7}>
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  height: '100%'
               }}>
                  <Typography
                     variant='h6'
                     sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        width: 'fit-content'
                     }}
                  >
                     Waiting Queue ({waitingQueue.length})
                  </Typography>

                  <Grid2 container spacing={2}>
                     {waitingQueue.map((el) => (
                        <Grid2 key={`Q-${el}`} xs={12} sm={6} md={4}>
                           <Paper
                              elevation={0}
                              sx={{
                                 height: '100%',
                                 borderRadius: 3,
                                 border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                 bgcolor: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.warning.main, 0.1)
                                    : alpha(theme.palette.warning.light, 0.1),
                                 transition: 'transform 0.2s ease-in-out',
                                 '&:hover': {
                                    transform: 'translateY(-2px)',
                                 }
                              }}
                           >
                              <Box sx={{ p: 2 }}>
                                 <Typography
                                    variant='h5'
                                    fontWeight="medium"
                                    sx={{
                                       mb: 2,
                                       color: theme.palette.mode === 'dark'
                                          ? theme.palette.warning.light
                                          : theme.palette.warning.dark
                                    }}
                                 >
                                    Ticket #{el + 1}
                                 </Typography>
                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant='body2' color="text.secondary">
                                       Room: {Math.floor(Math.random() * 9) + 1}
                                    </Typography>
                                    <Typography
                                       variant='body1'
                                       sx={{
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                       }}
                                    >
                                       Dr. {doctorNames[Math.floor(Math.random() * 8)]}
                                    </Typography>
                                 </Box>
                              </Box>
                           </Paper>
                        </Grid2>
                     ))}
                  </Grid2>
               </Box>
            </Grid2>

            <Grid2 xs={12} md={5}>
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  height: '100%'
               }}>
                  <Typography
                     variant='h6'
                     sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        width: 'fit-content'
                     }}
                  >
                     Active Appointments ({activeTickets.length})
                  </Typography>

                  <Grid2 container spacing={2}>
                     {activeTickets.map((el) => (
                        <Grid2 key={`A-${el}`} xs={12} sm={6}>
                           <Paper
                              elevation={0}
                              sx={{
                                 height: '100%',
                                 borderRadius: 3,
                                 border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                 bgcolor: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.success.main, 0.1)
                                    : alpha(theme.palette.success.light, 0.1),
                                 transition: 'transform 0.2s ease-in-out',
                                 '&:hover': {
                                    transform: 'translateY(-2px)',
                                 }
                              }}
                           >
                              <Box sx={{ p: 2 }}>
                                 <Typography
                                    variant='h5'
                                    fontWeight="medium"
                                    sx={{
                                       mb: 2,
                                       color: theme.palette.mode === 'dark'
                                          ? theme.palette.success.light
                                          : theme.palette.success.dark
                                    }}
                                 >
                                    Ticket #{el + 1}
                                 </Typography>
                                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant='body2' color="text.secondary">
                                       Room: {Math.floor(Math.random() * 9) + 1}
                                    </Typography>
                                    <Typography
                                       variant='body1'
                                       sx={{
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          mb: 2
                                       }}
                                    >
                                       Dr. {doctorNames[Math.floor(Math.random() * 8)]}
                                    </Typography>
                                    <Button
                                       variant="outlined"
                                       color="success"
                                       startIcon={<CheckCircleOutlineIcon />}
                                       onClick={() => completeTicket(el)}
                                       sx={{
                                          borderRadius: 2,
                                          textTransform: 'none',
                                       }}
                                    >
                                       Complete Appointment
                                    </Button>
                                 </Box>
                              </Box>
                           </Paper>
                        </Grid2>
                     ))}
                  </Grid2>
               </Box>
            </Grid2>
         </Grid2>
      </Box>
   );
}
