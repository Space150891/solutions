import { Box, Button, Card, Paper, Typography } from '@mui/material';
import { IPages } from '../../types/common.types';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useCallback, useEffect, useState } from 'react';
import { doctorNames } from './mock';

export default function WaitingBoard() {
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
   }, []);

   return (
      <Box component='section' padding={1.25}>
         <Box sx={{ mb: 2.25 }}>
            <Typography variant='h5'>{`${IPages.WAITING_BOARD.toUpperCase()}`}</Typography>
         </Box>
         <Box>
            <Button onClick={addTicket}>Add ticket</Button>
         </Box>
         <Grid2 container columns={7} spacing={3}>
            <Grid2 xs={4}>
               <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h5'>QUEUE</Typography>

                  <Grid2 container spacing={1}>
                     {waitingQueue.map((el) => {
                        return (
                           <Grid2 key={`Q-${el}`} xs={4}>
                              <Box borderRadius={3} overflow='hidden'>
                                 <Paper variant='outlined' sx={{ height: '150px' }}>
                                    <Typography
                                       variant='h6'
                                       textAlign='center'
                                       sx={{ backgroundColor: '#fff05f' }}
                                    >
                                       Ticket №{el + 1}
                                    </Typography>
                                    <Typography
                                       variant='body1'
                                       p={1}
                                       whiteSpace='nowrap'
                                       overflow='hidden'
                                       textOverflow='ellipsis'
                                    >
                                       To:
                                       <br />
                                       Room: {Math.floor(Math.random() * 9)}
                                       <br />
                                       Doctor: {doctorNames[Math.floor(Math.random() * 8)]}
                                       <br />
                                    </Typography>
                                 </Paper>
                              </Box>
                           </Grid2>
                        );
                     })}
                  </Grid2>
               </Box>
            </Grid2>
            <Grid2 xs={3}>
               <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h5'>ACTIVE</Typography>

                  <Grid2 container spacing={1}>
                     {activeTickets.map((el) => {
                        return (
                           <Grid2 key={`A-${el}`} xs={4}>
                              <Box borderRadius={3} overflow='hidden'>
                                 <Paper variant='outlined' sx={{ height: '150px' }}>
                                    <Typography
                                       variant='h6'
                                       textAlign='center'
                                       sx={{ backgroundColor: '#1ccb1c' }}
                                    >
                                       Ticket №{el + 1}
                                    </Typography>
                                    <Typography
                                       variant='body1'
                                       p={1}
                                       whiteSpace='nowrap'
                                       overflow='hidden'
                                       textOverflow='ellipsis'
                                    >
                                       To:
                                       <br />
                                       Room: {Math.floor(Math.random() * 9) + 1}
                                       <br />
                                       Doctor: {doctorNames[Math.floor(Math.random() * 8)]}
                                       <br />
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                       <Button onClick={() => completeTicket(el)} fullWidth>
                                          End Appointment
                                       </Button>
                                    </Box>
                                 </Paper>
                              </Box>
                           </Grid2>
                        );
                     })}
                  </Grid2>
               </Box>
            </Grid2>
         </Grid2>
      </Box>
   );
}
