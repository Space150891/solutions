import { doctors } from './mock';

import AppointmentScheduler from './components/AppointmentScheduler.component';

export default function HospitalAppointment() {
   return <AppointmentScheduler doctors={doctors} />;
}
