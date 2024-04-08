import { Box } from '@mui/material';

export default function PatientListPage() {
   const tableSetup = [
      {
         id: 1,
         heading: 'User ID',
      },
      {
         id: 2,
         heading: 'First Name',
      },
      {
         id: 3,
         heading: 'Last Name',
      },
      {
         id: 4,
         heading: 'Birth Date',
      },
      {
         id: 5,
         heading: 'Gender',
      },
      {
         id: 6,
         heading: 'City',
      },
      {
         id: 7,
         heading: 'Doctor / Specialization',
      },
   ];
   return <Box>Patient List Page</Box>;
}
