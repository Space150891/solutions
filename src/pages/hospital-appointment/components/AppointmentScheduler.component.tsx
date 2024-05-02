import { useState } from 'react';
import AppointmentModal from './Appointment.modal';
import { Dayjs } from 'dayjs';
import { Scheduler } from '@aldabil/react-scheduler';
import { IEvent, MOCK_EVENTS } from '../mock';

export default function AppointmentScheduler({ doctor }) {
   const [date, setDate] = useState<Dayjs | null>(null);
   const [open, setOpen] = useState<boolean>(false);
   const [events, setEvents] = useState<IEvent[]>(MOCK_EVENTS);
   console.log('doctor:', doctor);

   return (
      <>
         <Scheduler
            onCellClick={() => setOpen(true)}
            customEditor={(scheduler) => (
               <AppointmentModal
                  scheduler={scheduler}
                  open={open}
                  setOpen={setOpen}
                  doctor={doctor}
                  setEvents={setEvents}
               />
            )}
            viewerExtraComponent={(fields, event: IEvent) => {
               console.log('field', fields);

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
         {/* <AppointmentModal open={open} setOpen={setOpen} doctor={doctor} /> */}
      </>
   );
}
