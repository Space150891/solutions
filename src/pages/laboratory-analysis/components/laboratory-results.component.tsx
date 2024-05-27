import { Box, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'bloodWork',
      headerName: 'Blood work',
      width: 150,
   },
   {
      field: 'patientTestResults',
      headerName: 'Patient test results',
      width: 200,
   },
   {
      field: 'normalRange',
      headerName: 'Normal range',
      width: 200,
   },
   {
      field: 'interpretationOfTheTests',
      headerName: 'Interpretation Of The Tests: elevated, normal, low',
      description: 'This column is not sortable.',
      sortable: false,
      width: 600,
   },
];

const rows = [
   {
      id: 1,
      bloodWork: 'Ferritin',
      patientTestResults: '10 µg/l',
      normalRange: '18-350 µg/l',
      interpretationOfTheTests: 'low',
   },
   {
      id: 2,
      bloodWork: 'Hemoglobin',
      patientTestResults: '72 g/l',
      normalRange: '138-172 g/l',
      interpretationOfTheTests: 'low',
   },
   {
      id: 3,
      bloodWork: 'Red blood cell count',
      patientTestResults: '3.35 x 10^12/l',
      normalRange: '4.4-5.8 x 10^12/l',
      interpretationOfTheTests: 'low',
   },
   {
      id: 4,
      bloodWork: 'Hematocrit',
      patientTestResults: '25.8%',
      normalRange: '41-50%',
      interpretationOfTheTests: 'low',
   },
   {
      id: 5,
      bloodWork: 'Mean corpuscular volume',
      patientTestResults: '77 fl',
      normalRange: '78-102 fl',
      interpretationOfTheTests: 'low',
   },
   {
      id: 6,
      bloodWork: 'Mean corpuscular hemoglobin',
      patientTestResults: '24.6 pg',
      normalRange: '27-33 pg',
      interpretationOfTheTests: 'low',
   },
   {
      id: 7,
      bloodWork: 'Mean corpuscular hemoglobin concentration',
      patientTestResults: '318 g/l',
      normalRange: '320-360 g/l',
      interpretationOfTheTests: 'low',
   },
   {
      id: 8,
      bloodWork: 'Red blood cell distribution',
      patientTestResults: '15.4%',
      normalRange: '11.7-14.2%',
      interpretationOfTheTests: 'elevated',
   },
];

export default function LaboratoryResults({ toggleOpen }: { toggleOpen: () => void }) {
   return (
      <Box
         display='flex'
         flexDirection='column'
         width='100%'
         justifyContent='center'
         alignItems='stretch'
         height='calc(100svh - 60px)'
         p={5}
      >
         <Box display='flex' justifyContent='flex-end' width='100%'>
            <Button color='error' onClick={toggleOpen}>
               Close
            </Button>
         </Box>
         <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
      </Box>
   );
}
