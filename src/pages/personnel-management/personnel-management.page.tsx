import { Box, Button } from '@mui/material';
import { useState } from 'react';
import PersonnelGrid from './components/personnel-grid.component';
import AddPersonnel from './components/add-personnel.component';
import {
   IManagedDoctor,
   IManagedNurse,
   IManagedOther,
   managedDoctors,
   managedNurses,
   managedOthers,
} from './mock';

export default function PersonnelManagement() {
   const [open, setOpen] = useState(false);
   const [doctors, setDoctors] = useState(managedDoctors);
   const [nurses, setNurses] = useState(managedNurses);
   const [others, setOthers] = useState(managedOthers);

   const addDoctor = (employee: IManagedDoctor) => {
      setDoctors((prev) => [...prev, employee]);
   };
   const addNurse = (employee: IManagedNurse) => {
      setNurses((prev) => [...prev, employee]);
   };
   const addOther = (employee: IManagedOther) => {
      setOthers((prev) => [...prev, employee]);
   };

   const addPersonnel = (position: string, employee: IManagedDoctor | IManagedNurse | IManagedOther) => {
      if (position === 'doctor') {
         addDoctor(employee as IManagedDoctor);
      } else if (position === 'nurse') {
         addNurse(employee as IManagedNurse);
      } else if (position === 'other') {
         addOther(employee as IManagedOther);
      }
   };

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   return (
      <Box>
         <Box p={1} sx={{ display: 'flex' }} justifyContent={'flex-end'}>
            <Button variant='contained' onClick={toggleOpen}>
               {open ? 'Back' : 'Add new patient'}
            </Button>
         </Box>
         {open && <AddPersonnel addPersonnel={addPersonnel} />}
         {!open && <PersonnelGrid doctors={doctors} nurses={nurses} others={others} />}
      </Box>
   );
}
