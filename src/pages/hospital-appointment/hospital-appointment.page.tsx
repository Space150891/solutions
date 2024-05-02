import { styled } from '@mui/material';

import { doctors } from './mock';

import { useCallback, useEffect, useState } from 'react';
import { IPatientDoctor } from '../patient-list/types';
import AppointmentScheduler from './components/AppointmentScheduler.component';

export default function HospitalAppointment() {
   const [filteredList, setFilteredList] = useState<IPatientDoctor[]>([]);
   const [specialization, setSpecialization] = useState<string | null>(null);
   const [fullName, setFullName] = useState<string | null>(null);

   const applyFilters = useCallback(
      (array: IPatientDoctor[]): IPatientDoctor[] => {
         return array.filter((doc) => {
            const fullNameMatches = fullName ? `${doc.first_name} ${doc.last_name}` === fullName : true;
            const specializationMatches = specialization ? doc.specialization === specialization : true;
            return fullNameMatches && specializationMatches;
         });
      },
      [fullName, specialization],
   );

   useEffect(() => {
      if (doctors) setFilteredList(doctors);
   }, []);

   useEffect(() => {
      setFilteredList(applyFilters(doctors));
   }, [applyFilters]);

   const listOfDoctorNames = doctors.map((doc) => `${doc.first_name} ${doc.last_name}`);

   return <AppointmentScheduler doctor={doctors[0]} />;
}
