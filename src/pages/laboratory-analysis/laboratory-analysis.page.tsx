import { Box } from '@mui/material';
import LaboratoryForm from './components/laboratory-form.component';
import { useState } from 'react';
import LaboratoryResults from './components/laboratory-results.component';

export default function LaboratoryAnalysis() {
   const [open, setOpen] = useState(false);

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   return (
      <Box>
         {!open && <LaboratoryForm toggleOpen={toggleOpen} />}
         {open && <LaboratoryResults toggleOpen={toggleOpen} />}
      </Box>
   );
}
