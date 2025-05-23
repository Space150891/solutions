import { useState, useMemo } from 'react';
import { useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IManagePatient } from './mock';
import AddPatient from './components/add-patient.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPatient, removePatient, setSearchQuery } from '../../store/slices/patientSlice';
import { PageLayout } from '../../components/page-layout/page-layout.component';
import { DataCard } from '../../components/data-card/data-card.component';
import { Modal } from '../../components/modal/modal.component';
import { StatCard, EmptyState, GridLayout } from '../../components/common/layout-components';

// Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PatientManagement() {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const { patients, searchQuery } = useAppSelector(state => state.patients);
   const [dialogOpen, setDialogOpen] = useState(false);

   // Filter patients based on search query
   const filteredPatients = useMemo(() => {
      if (!searchQuery) {
         return patients;
      }

      const query = searchQuery.toLowerCase();
      return patients.filter(patient =>
         patient.first_name.toLowerCase().includes(query) ||
         patient.last_name.toLowerCase().includes(query) ||
         patient.email.toLowerCase().includes(query) ||
         patient.phone_number.toLowerCase().includes(query)
      );
   }, [patients, searchQuery]);

   // Handler functions
   const handleOpenDialog = () => {
      setDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setDialogOpen(false);
   };

   const handleAddPatient = (newPatient: IManagePatient) => {
      dispatch(addPatient(newPatient));
      handleCloseDialog();
   };

   const handleDeletePatient = (id: string | number) => {
      dispatch(removePatient(id));
   };

   const handleSearchChange = (query: string) => {
      dispatch(setSearchQuery(query));
   };

   return (
      <PageLayout
         title="Patient Management"
         subtitle="Manage hospital patients and their information"
         searchQuery={searchQuery}
         onSearchChange={handleSearchChange}
         onAddClick={handleOpenDialog}
         addButtonText="Add Patient"
         addButtonIcon={<PersonAddIcon />}
         statsCards={
            <>
               <Grid2 xs={12} sm={6} md={4}>
                  <StatCard
                     title="Total Patients"
                     value={patients.length}
                     icon={<PeopleIcon sx={{ fontSize: 36 }} />}
                  />
               </Grid2>
            </>
         }
      >
         <GridLayout
            items={filteredPatients as IManagePatient[]}
            renderItem={(patient: IManagePatient) => (
               <DataCard
                  title={`${patient.first_name} ${patient.last_name}`}
                  subtitle="Patient"
                  avatar={{
                     outlined: true,
                     outlineColor: theme.palette.primary.main,
                  }}
                  gender={patient.gender as 'Male' | 'Female'}
                  icon={<PersonIcon fontSize="small" color="primary" />}
                  fields={[
                     { label: 'Date of Birth', value: patient.date_of_birth },
                     { label: 'Email', value: patient.email },
                     { label: 'Phone', value: patient.phone_number },
                     { label: 'EB', value: patient.eb },
                     { label: 'Preferences', value: patient.preferences },
                  ]}
                  actions={[
                     {
                        label: 'Edit',
                        icon: <EditIcon fontSize="small" />,
                        onClick: () => console.log('Edit', patient.id),
                     },
                     {
                        label: 'Delete',
                        icon: <DeleteIcon fontSize="small" />,
                        onClick: () => handleDeletePatient(patient.id),
                        color: theme.palette.error.main,
                     },
                  ]}
               />
            )}
            emptyState={
               <EmptyState
                  message="No patients found"
                  icon={<PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />}
                  searchQuery={searchQuery}
               />
            }
            xs={12}
            sm={6}
            md={4}
            lg={3}
         />

         <Modal
            open={dialogOpen}
            onClose={handleCloseDialog}
            title="Add New Patient"
            icon={<PersonAddIcon />}
         >
            <AddPatient
               toggleOpen={handleCloseDialog}
               addPatient={handleAddPatient}
               nextId={patients.length}
            />
         </Modal>
      </PageLayout>
   );
}
