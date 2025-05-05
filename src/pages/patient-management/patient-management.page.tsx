import { Box, Button } from '@mui/material';
import PatientGrid from './components/patient-grid.component';
import { IManagePatient, managedPatients } from './mock';
import { useState } from 'react';
import AddPatient from './components/add-patient.component';
export default function PatientManagement() {
   const [open, setOpen] = useState(false);
   const [patients, setPatients] = useState(managedPatients);

   const addPatient = (newPatient: IManagePatient) => {
      setPatients((prev) => [...prev, newPatient]);
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
         {open && <AddPatient toggleOpen={toggleOpen} addPatient={addPatient} nextId={patients.length} />}
         {!open && <PatientGrid patients={patients} />}
      </Box>
   );
}
