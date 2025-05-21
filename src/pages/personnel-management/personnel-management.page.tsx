import {
   Box,
   Typography,
   TextField,
   InputAdornment,
   Button,
   Card,
   CardContent,
   CardActions,
   Avatar,
   Chip,
   Dialog,
   DialogTitle,
   DialogContent,
   IconButton,
   Tabs,
   Tab,
   Paper,
   Menu,
   MenuItem,
   useTheme,
} from '@mui/material';
import { useState, useMemo } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddPersonnel from './components/add-personnel.component';
import {
   IManagedDoctor,
   IManagedNurse,
   IManagedOther,
   managedDoctors,
   managedNurses,
   managedOthers,
} from './mock';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

// Define the tab values as a union type for better type safety
type TabValue = 'doctors' | 'nurses' | 'others';

export default function PersonnelManagement() {
   const theme = useTheme();
   const [tabValue, setTabValue] = useState<TabValue>('doctors');
   const [doctors, setDoctors] = useState(managedDoctors);
   const [nurses, setNurses] = useState(managedNurses);
   const [others, setOthers] = useState(managedOthers);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');

   // Filter personnel based on search query
   const filteredPersonnel = useMemo(() => {
      if (!searchQuery) {
         return { doctors, nurses, others };
      }

      const query = searchQuery.toLowerCase();

      const filteredDoctors = doctors.filter(doc =>
         doc.first_name.toLowerCase().includes(query) ||
         doc.last_name.toLowerCase().includes(query) ||
         doc.specialization.toLowerCase().includes(query)
      );

      const filteredNurses = nurses.filter(nurse =>
         nurse.first_name.toLowerCase().includes(query) ||
         nurse.last_name.toLowerCase().includes(query) ||
         nurse.rank.toLowerCase().includes(query) ||
         nurse.department.toLowerCase().includes(query)
      );

      const filteredOthers = others.filter(other =>
         other.first_name.toLowerCase().includes(query) ||
         other.last_name.toLowerCase().includes(query) ||
         other.role.toLowerCase().includes(query) ||
         other.department.toLowerCase().includes(query)
      );

      return { doctors: filteredDoctors, nurses: filteredNurses, others: filteredOthers };
   }, [doctors, nurses, others, searchQuery]);

   // Calculate totals for stats
   const totalPersonnel = doctors.length + nurses.length + others.length;

   // Handler functions
   const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
      setTabValue(newValue);
   };

   const handleOpenDialog = () => {
      setDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setDialogOpen(false);
   };

   const handleDelete = (id: string, type: TabValue) => {
      if (type === 'doctors') {
         setDoctors(doctors.filter(doc => doc.id !== id));
      } else if (type === 'nurses') {
         setNurses(nurses.filter(nurse => nurse.id !== id));
      } else {
         setOthers(others.filter(other => other.id !== id));
      }
   };

   const handleAddPersonnel = (position: string, employee: IManagedDoctor | IManagedNurse | IManagedOther) => {
      if (position === 'doctor') {
         setDoctors(prev => [...prev, employee as IManagedDoctor]);
      } else if (position === 'nurse') {
         setNurses(prev => [...prev, employee as IManagedNurse]);
      } else if (position === 'other') {
         setOthers(prev => [...prev, employee as IManagedOther]);
      }
      handleCloseDialog();
   };

   // Component for stats cards
   const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
      <Card sx={{ height: '100%' }}>
         <CardContent sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
         }}>
            <Box sx={{
               width: 60,
               height: 60,
               borderRadius: 2,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: theme.palette.mode === 'light'
                  ? theme.palette.primary.light
                  : theme.palette.primary.dark,
               color: theme.palette.primary.contrastText,
               mr: 2
            }}>
               {icon}
            </Box>
            <Box>
               <Typography variant="h4" component="div">
                  {value}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                  {title}
               </Typography>
            </Box>
         </CardContent>
      </Card>
   );

   // Empty state component
   const EmptyState = ({ message }: { message: string }) => (
      <Box sx={{ textAlign: 'center', py: 8 }}>
         <PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
         <Typography variant="h6" color="text.secondary">
            {message}
         </Typography>
         <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            {searchQuery ? "Try adjusting your search or add new personnel." : "Add some personnel to get started."}
         </Typography>
      </Box>
   );

   // Personnel card component
   const PersonnelCard = ({
      data,
      type
   }: {
      data: IManagedDoctor | IManagedNurse | IManagedOther;
      type: TabValue;
   }) => {
      const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

      const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
         setMenuAnchorEl(event.currentTarget);
      };

      const handleMenuClose = () => {
         setMenuAnchorEl(null);
      };

      const avatarSrc = `/assets/${data.gender === 'Male' ? 'doctor_m.png' : 'doctor_f.png'}`;

      return (
         <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                     src={avatarSrc}
                     sx={{
                        width: 56,
                        height: 56,
                        mr: 2,
                        border: `2px solid ${type === 'doctors'
                           ? theme.palette.primary.main
                           : type === 'nurses'
                              ? theme.palette.secondary.main
                              : theme.palette.warning.main
                           }`
                     }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                     <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                        {data.first_name} {data.last_name}
                     </Typography>
                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {type === 'doctors' && <MedicalServicesIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />}
                        {type === 'nurses' && <LocalHospitalIcon fontSize="small" color="secondary" sx={{ mr: 0.5 }} />}
                        {type === 'others' && <WorkIcon fontSize="small" color="warning" sx={{ mr: 0.5 }} />}
                        <Typography variant="body2" color="text.secondary">
                           {type === 'doctors' ? 'Doctor' : type === 'nurses' ? 'Nurse' : 'Staff'}
                        </Typography>
                        <Box component="span" sx={{ mx: 0.5 }}>•</Box>
                        {data.gender === 'Male' ?
                           <MaleIcon fontSize="small" color="info" /> :
                           <FemaleIcon fontSize="small" color="secondary" />
                        }
                     </Box>
                  </Box>
                  <IconButton
                     onClick={handleMenuOpen}
                     size="small"
                     aria-label="more options"
                  >
                     <MoreVertIcon />
                  </IconButton>
               </Box>

               {type === 'doctors' && (
                  <Box sx={{ mb: 1 }}>
                     <Typography variant="caption" color="text.secondary" display="block">
                        Specialization
                     </Typography>
                     <Typography variant="body2" fontWeight="medium">
                        {(data as IManagedDoctor).specialization}
                     </Typography>
                  </Box>
               )}

               {type === 'nurses' && (
                  <>
                     <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                           Rank
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                           {(data as IManagedNurse).rank}
                        </Typography>
                     </Box>
                     <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                           Department
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                           {(data as IManagedNurse).department}
                        </Typography>
                     </Box>
                  </>
               )}

               {type === 'others' && (
                  <>
                     <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                           Role
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                           {(data as IManagedOther).role}
                        </Typography>
                     </Box>
                     <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                           Department
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                           {(data as IManagedOther).department}
                        </Typography>
                     </Box>
                     <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                           Shift
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                           {(data as IManagedOther).shift}
                        </Typography>
                     </Box>
                  </>
               )}

               <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                     Hire Date
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                     {data.hire_date}
                  </Typography>
               </Box>
            </CardContent>

            <CardActions sx={{ mt: 'auto', p: 2, pt: 0 }}>
               <Chip
                  label={`$${data.salary.toLocaleString()}/year`}
                  size="small"
                  color={type === 'doctors' ? 'primary' : type === 'nurses' ? 'secondary' : 'warning'}
                  variant="outlined"
                  sx={{ mr: 1 }}
               />
               <Chip
                  label={`${data.years_of_experience} yrs exp`}
                  size="small"
                  variant="outlined"
               />
            </CardActions>

            {/* Card-specific Menu */}
            <Menu
               anchorEl={menuAnchorEl}
               open={Boolean(menuAnchorEl)}
               onClose={handleMenuClose}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
            >
               <MenuItem onClick={handleMenuClose}>
                  <EditIcon fontSize="small" sx={{ mr: 1 }} />
                  Edit
               </MenuItem>
               <MenuItem onClick={() => {
                  handleDelete(data.id, type);
                  handleMenuClose();
               }} sx={{ color: theme.palette.error.main }}>
                  <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                  Delete
               </MenuItem>
            </Menu>
         </Card>
      );
   };

   return (
      <Box sx={{ p: 3, position: 'relative' }}>
         {/* Header section */}
         <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            mb: 4
         }}>
            <Box sx={{ mb: { xs: 2, md: 0 } }}>
               <Typography variant="h4" component="h1" gutterBottom>
                  Personnel Management
               </Typography>
               <Typography variant="subtitle1" color="text.secondary">
                  Manage doctors, nurses and other hospital staff
               </Typography>
            </Box>

            <Box sx={{
               display: 'flex',
               gap: 2,
               flexWrap: 'wrap',
               justifyContent: { xs: 'space-between', sm: 'flex-end' }
            }}>
               <TextField
                  placeholder="Search personnel..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <SearchIcon />
                        </InputAdornment>
                     ),
                     endAdornment: searchQuery ? (
                        <InputAdornment position="end">
                           <IconButton size="small" onClick={() => setSearchQuery('')}>
                              <CloseIcon fontSize="small" />
                           </IconButton>
                        </InputAdornment>
                     ) : null
                  }}
               />

               <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={handleOpenDialog}
               >
                  Add Personnel
               </Button>
            </Box>
         </Box>

         {/* Stats section */}
         <Box sx={{ mb: 4 }}>
            <Grid2 container spacing={2}>
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
            </Grid2>
         </Box>

         {/* Tabs section */}
         <Paper sx={{ mb: 3 }}>
            <Tabs
               value={tabValue}
               onChange={handleTabChange}
               indicatorColor="primary"
               textColor="primary"
            >
               <Tab
                  icon={<MedicalServicesIcon />}
                  iconPosition="start"
                  label={`Doctors (${filteredPersonnel.doctors.length})`}
                  value="doctors"
               />
               <Tab
                  icon={<LocalHospitalIcon />}
                  iconPosition="start"
                  label={`Nurses (${filteredPersonnel.nurses.length})`}
                  value="nurses"
               />
               <Tab
                  icon={<WorkIcon />}
                  iconPosition="start"
                  label={`Others (${filteredPersonnel.others.length})`}
                  value="others"
               />
            </Tabs>
         </Paper>

         {/* Content section */}
         {tabValue === 'doctors' && (
            filteredPersonnel.doctors.length > 0 ? (
               <Grid2 container spacing={2}>
                  {filteredPersonnel.doctors.map(doctor => (
                     <Grid2 xs={12} sm={6} md={4} lg={3} key={doctor.id}>
                        <PersonnelCard data={doctor} type="doctors" />
                     </Grid2>
                  ))}
               </Grid2>
            ) : (
               <EmptyState message="No doctors found" />
            )
         )}

         {tabValue === 'nurses' && (
            filteredPersonnel.nurses.length > 0 ? (
               <Grid2 container spacing={2}>
                  {filteredPersonnel.nurses.map(nurse => (
                     <Grid2 xs={12} sm={6} md={4} lg={3} key={nurse.id}>
                        <PersonnelCard data={nurse} type="nurses" />
                     </Grid2>
                  ))}
               </Grid2>
            ) : (
               <EmptyState message="No nurses found" />
            )
         )}

         {tabValue === 'others' && (
            filteredPersonnel.others.length > 0 ? (
               <Grid2 container spacing={2}>
                  {filteredPersonnel.others.map(other => (
                     <Grid2 xs={12} sm={6} md={4} lg={3} key={other.id}>
                        <PersonnelCard data={other} type="others" />
                     </Grid2>
                  ))}
               </Grid2>
            ) : (
               <EmptyState message="No other staff found" />
            )
         )}

         {/* Add Personnel Dialog */}
         <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
         >
            <DialogTitle sx={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               borderBottom: `1px solid ${theme.palette.divider}`
            }}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonAddIcon sx={{ mr: 1 }} />
                  Add New Personnel
               </Box>
               <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleCloseDialog}
                  aria-label="close"
               >
                  <CloseIcon />
               </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
               <AddPersonnel addPersonnel={handleAddPersonnel} />
            </DialogContent>
         </Dialog>
      </Box>
   );
}