import { useState } from 'react';
import AppointmentModal from './Appointment.modal';
import { Scheduler } from '@aldabil/react-scheduler';
import { IEvent, MOCK_EVENTS } from '../mock';
import { IPatientDoctor } from '../../patient-list/types';
import { Button, ButtonGroup } from '@mui/material';

export default function AppointmentScheduler({ doctors }: { doctors: IPatientDoctor[] }) {
   const [open, setOpen] = useState<boolean>(false);
   const [events, setEvents] = useState<IEvent[]>(MOCK_EVENTS);
   const [selectedDoctor, setSelectedDoctor] = useState<IPatientDoctor>(doctors[0]);

   console.log('doctor:', doctors);

   return (
      <>
         <ButtonGroup variant='text' aria-label='Basic button group'>
            {doctors.map((doctor) => {
               return (
                  <Button
                     onClick={() => {
                        setSelectedDoctor(doctor);
                     }}
                     {...(selectedDoctor.doctor_id === doctor.doctor_id ? { variant: 'contained' } : {})}
                  >
                     {doctor.first_name} {doctor.last_name}
                  </Button>
               );
            })}
         </ButtonGroup>
         <Scheduler
            onCellClick={() => setOpen(true)}
            customEditor={(scheduler) => (
               <AppointmentModal
                  scheduler={scheduler}
                  open={open}
                  setOpen={setOpen}
                  doctor={selectedDoctor}
                  setEvents={setEvents}
               />
            )}
            viewerExtraComponent={(_fields, event: IEvent) => {
               return (
                  <div>
                     <p>Appointment</p>
                     <p>At {event.location || '[not provided]'}</p>
                     <p>Patient's mobile {event.phone_number || '[not provided]'}</p>
                     <p>
                        Additional Info:
                        <br /> {event.addition_info || 'No additional info'}
                     </p>
                  </div>
               );
            }}
            events={events}
         />
      </>
   );
}
