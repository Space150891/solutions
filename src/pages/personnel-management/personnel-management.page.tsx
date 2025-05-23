import { useState, useMemo } from 'react';
import { useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddPersonnel from './components/add-personnel.component';
import {
   IManagedDoctor,
   IManagedNurse,
   IManagedOther,
} from './mock';

// Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addDoctor, addNurse, addOther, removePersonnel, setSearchQuery } from '../../store/slices/personnelSlice';
import { PageLayout } from '../../components/page-layout/page-layout.component';
import { DataCard } from '../../components/data-card/data-card.component';
import { Modal } from '../../components/modal/modal.component';
import { StatCard, EmptyState, GridLayout } from '../../components/common/layout-components';

type TabValue = 'doctors' | 'nurses' | 'others';

export default function PersonnelManagement() {
   const theme = useTheme();
   const dispatch = useAppDispatch();
   const { doctors, nurses, others, searchQuery } = useAppSelector(state => state.personnel);
   const [tabValue, setTabValue] = useState<TabValue>('doctors');
   const [dialogOpen, setDialogOpen] = useState(false);

   const filteredPersonnel = useMemo(() => {
      if (!searchQuery) {
         return { doctors, nurses, others };
      }
      const query = searchQuery.toLowerCase();

      const filteredDoctors = doctors.filter(doc =>
         doc.firstName.toLowerCase().includes(query) ||
         doc.lastName.toLowerCase().includes(query) ||
         doc.specialization.toLowerCase().includes(query)
      );

      const filteredNurses = nurses.filter(nurse =>
         nurse.firstName.toLowerCase().includes(query) ||
         nurse.lastName.toLowerCase().includes(query) ||
         nurse.rank.toLowerCase().includes(query) ||
         nurse.department.toLowerCase().includes(query)
      );

      const filteredOthers = others.filter(other =>
         other.firstName.toLowerCase().includes(query) ||
         other.lastName.toLowerCase().includes(query) ||
         other.role.toLowerCase().includes(query) ||
         other.department.toLowerCase().includes(query)
      );

      return { doctors: filteredDoctors, nurses: filteredNurses, others: filteredOthers };
   }, [doctors, nurses, others, searchQuery]);

   const totalPersonnel = doctors.length + nurses.length + others.length;

   const handleTabChange = (newValue: string) => {
      setTabValue(newValue as TabValue);
   };

   const handleOpenDialog = () => {
      setDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setDialogOpen(false);
   };

   const handleDelete = (id: string, type: TabValue) => {
      dispatch(removePersonnel({ id, type }));
   };

   const handleAddPersonnel = (position: string, employee: IManagedDoctor | IManagedNurse | IManagedOther) => {
      if (position === 'doctor') {
         dispatch(addDoctor(employee as IManagedDoctor));
      } else if (position === 'nurse') {
         dispatch(addNurse(employee as IManagedNurse));
      } else if (position === 'other') {
         dispatch(addOther(employee as IManagedOther));
      }
      handleCloseDialog();
   };

   const renderPersonnelCard = (data: IManagedDoctor | IManagedNurse | IManagedOther, type: TabValue) => {
      // Determine icon and subtitle based on type
      const icon = type === 'doctors'
         ? <MedicalServicesIcon fontSize="small" color="primary" />
         : type === 'nurses'
            ? <LocalHospitalIcon fontSize="small" color="secondary" />
            : <WorkIcon fontSize="small" color="warning" />;

      const subtitle = type === 'doctors' ? 'Doctor' : type === 'nurses' ? 'Nurse' : 'Staff';

      // Determine fields based on type
      const commonFields = [
         { label: 'Hire Date', value: data.hireDate }
      ];

      let specificFields: Array<{ label: string, value: string | number }> = [];

      if (type === 'doctors') {
         specificFields = [
            { label: 'Specialization', value: (data as IManagedDoctor).specialization }
         ];
      } else if (type === 'nurses') {
         specificFields = [
            { label: 'Rank', value: (data as IManagedNurse).rank },
            { label: 'Department', value: (data as IManagedNurse).department }
         ];
      } else {
         specificFields = [
            { label: 'Role', value: (data as IManagedOther).role },
            { label: 'Department', value: (data as IManagedOther).department },
            { label: 'Shift', value: (data as IManagedOther).shift }
         ];
      }

      const fields = [...specificFields, ...commonFields];

      // Determine chips
      const chips = [
         {
            label: `$${data.salary.toLocaleString()}/year`,
            color: type === 'doctors' ? 'primary' : type === 'nurses' ? 'secondary' : 'warning' as 'primary' | 'secondary' | 'warning'
         },
         { label: `${data.yearsOfExperience} yrs exp` }
      ];

      // Determine border color
      const borderColor = type === 'doctors'
         ? theme.palette.primary.main
         : type === 'nurses'
            ? theme.palette.secondary.main
            : theme.palette.warning.main;

      return (
         <DataCard
            title={`${data.firstName} ${data.lastName}`}
            subtitle={subtitle}
            avatar={{
               src: `/assets/${data.gender === 'Male' ? 'doctor_m.png' : 'doctor_f.png'}`,
               outlined: true,
               outlineColor: borderColor
            }}
            gender={data.gender}
            icon={icon}
            fields={fields}
            chips={chips}
            actions={[
               {
                  label: 'Edit',
                  icon: <EditIcon fontSize="small" />,
                  onClick: () => console.log('Edit', data.id),
               },
               {
                  label: 'Delete',
                  icon: <DeleteIcon fontSize="small" />,
                  onClick: () => handleDelete(data.id, type),
                  color: theme.palette.error.main,
               },
            ]}
         />
      );
   };

   return (
      <PageLayout
         title="Personnel Management"
         subtitle="Manage doctors, nurses and other hospital staff"
         searchQuery={searchQuery}
         onSearchChange={(query) => dispatch(setSearchQuery(query))}
         onAddClick={handleOpenDialog}
         addButtonText="Add Personnel"
         addButtonIcon={<PersonAddIcon />}
         tabValue={tabValue}
         tabOptions={[
            {
               icon: <MedicalServicesIcon />,
               label: `Doctors (${filteredPersonnel.doctors.length})`,
               value: 'doctors'
            },
            {
               icon: <LocalHospitalIcon />,
               label: `Nurses (${filteredPersonnel.nurses.length})`,
               value: 'nurses'
            },
            {
               icon: <WorkIcon />,
               label: `Others (${filteredPersonnel.others.length})`,
               value: 'others'
            }
         ]}
         onTabChange={handleTabChange}
         statsCards={
            <>
               <Grid2 xs={12} sm={6} md={3}>
                  <StatCard
                     title="Total Personnel"
                     value={totalPersonnel}
                     icon={<PeopleIcon sx={{ fontSize: 36 }} />}
                  />
               </Grid2>
               <Grid2 xs={12} sm={6} md={3}>
                  <StatCard
                     title="Doctors"
                     value={doctors.length}
                     icon={<MedicalServicesIcon sx={{ fontSize: 36 }} />}
                  />
               </Grid2>
               <Grid2 xs={12} sm={6} md={3}>
                  <StatCard
                     title="Nurses"
                     value={nurses.length}
                     icon={<LocalHospitalIcon sx={{ fontSize: 36 }} />}
                  />
               </Grid2>
               <Grid2 xs={12} sm={6} md={3}>
                  <StatCard
                     title="Other Staff"
                     value={others.length}
                     icon={<WorkIcon sx={{ fontSize: 36 }} />}
                  />
               </Grid2>
            </>
         }
      >
         {tabValue === 'doctors' && (
            <GridLayout
               items={filteredPersonnel.doctors}
               renderItem={(doctor) => renderPersonnelCard(doctor, 'doctors')}
               emptyState={
                  <EmptyState
                     message="No doctors found"
                     icon={<PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />}
                     searchQuery={searchQuery}
                  />
               }
            />
         )}

         {tabValue === 'nurses' && (
            <GridLayout
               items={filteredPersonnel.nurses}
               renderItem={(nurse) => renderPersonnelCard(nurse, 'nurses')}
               emptyState={
                  <EmptyState
                     message="No nurses found"
                     icon={<PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />}
                     searchQuery={searchQuery}
                  />
               }
            />
         )}

         {tabValue === 'others' && (
            <GridLayout
               items={filteredPersonnel.others}
               renderItem={(other) => renderPersonnelCard(other, 'others')}
               emptyState={
                  <EmptyState
                     message="No other staff found"
                     icon={<PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />}
                     searchQuery={searchQuery}
                  />
               }
            />
         )}

         <Modal
            open={dialogOpen}
            onClose={handleCloseDialog}
            title="Add New Personnel"
            icon={<PersonAddIcon />}
         >
            <AddPersonnel addPersonnel={handleAddPersonnel} />
         </Modal>
      </PageLayout>
   );
}