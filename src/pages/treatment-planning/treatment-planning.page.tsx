import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createTreatmentPlan,
  setCurrentPlan,
  updateTreatmentPlan,
  addProcedureToCurrentPlan,
  addMedicationToCurrentPlan,
  addAppointmentToCurrentPlan,
  removeProcedureFromCurrentPlan,
  removeMedicationFromCurrentPlan,
  removeAppointmentFromCurrentPlan,
  setSelectedPatient,
} from '../../store/slices/treatmentPlanningSlice';
import { Procedure, Medication as MedicationType, FollowUpAppointment, TreatmentPlan } from '../../store/slices/types/treatmentPlanningTypes';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// Components
import TreatmentPlanCard from './components/treatment-plan-card.component';
import DraggableItem from './components/draggable-item.component';
import PatientSelector from './components/patient-selector.component';
import TreatmentDocConnection from './components/treatment-doc-connection.component';

const TreatmentPlanningPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Redux state
  const {
    currentPlan,
    availableProcedures,
    availableMedications,
    availableAppointments,
    selectedPatient,
    isLoading,
    error,
  } = useAppSelector((state) => state.treatmentPlanning);

  // Local state
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [newPlanDialogOpen, setNewPlanDialogOpen] = useState(false);
  const [editPlanDialogOpen, setEditPlanDialogOpen] = useState(false);
  const [patientSelectorOpen, setPatientSelectorOpen] = useState(false);

  // Form state for new plan
  const [newPlanForm, setNewPlanForm] = useState({
    title: '',
    description: '',
    startDate: dayjs(),
    endDate: dayjs().add(1, 'month'),
    goals: '',
  });

  // Initialize with empty plan if none exists
  useEffect(() => {
    if (!currentPlan) {
      handleCreateNewPlan();
    }
  }, []);

  // Handle creating new plan
  const handleCreateNewPlan = useCallback(() => {
    const newPlan: Partial<TreatmentPlan> = {
      title: newPlanForm.title || 'New Treatment Plan',
      description: newPlanForm.description,
      patientId: selectedPatient?.id || '',
      patientName: selectedPatient?.name || 'No Patient Selected',
      startDate: newPlanForm.startDate.format('YYYY-MM-DD'),
      endDate: newPlanForm.endDate.format('YYYY-MM-DD'),
      goals: newPlanForm.goals ? [newPlanForm.goals] : [],
    };

    dispatch(createTreatmentPlan(newPlan));
    setNewPlanDialogOpen(false);
    setNewPlanForm({
      title: '',
      description: '',
      startDate: dayjs(),
      endDate: dayjs().add(1, 'month'),
      goals: '',
    });
  }, [dispatch, newPlanForm, selectedPatient]);

  // Handle adding items to plan
  const handleAddProcedure = (procedure: Procedure) => {
    if (currentPlan) {
      dispatch(addProcedureToCurrentPlan(procedure));
    }
  };

  const handleAddMedication = (medication: MedicationType) => {
    if (currentPlan) {
      dispatch(addMedicationToCurrentPlan(medication));
    }
  };

  const handleAddAppointment = (appointment: FollowUpAppointment) => {
    if (currentPlan) {
      dispatch(addAppointmentToCurrentPlan(appointment));
    }
  };

  // Handle save plan
  const handleSavePlan = () => {
    if (currentPlan) {
      dispatch(updateTreatmentPlan({ status: 'Active' }));
      // Here you would typically save to backend
      console.log('Plan saved:', currentPlan);
    }
  };

  // Render available items sidebar
  const renderSidebar = () => (
    <Box 
      sx={{ 
        width: 450, 
        height: '100%', 
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sidebar Header */}
      <Box 
        sx={{ 
          p: 3, 
          bgcolor: theme.palette.mode === 'dark' 
            ? 'primary.dark' 
            : 'primary.main',
          color: 'primary.contrastText',
          textAlign: 'center',
          boxShadow: theme.palette.mode === 'dark' ? 4 : 2,
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        }}
      >
        <MedicalServicesIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Medical Library
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Click items below to add them to your treatment plan
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
      
      {/* Procedures */}
      <Card sx={{ 
        mb: 4, 
        elevation: theme.palette.mode === 'dark' ? 6 : 3, 
        borderRadius: 3, 
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
        border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.grey[700]}` : 'none',
      }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.2rem' }}>
              🏥 Medical Procedures
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Evidence-based therapeutic interventions
            </Typography>
          }
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${availableProcedures.length} available`}
                color="primary"
                variant="filled"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          }
          sx={{ 
            pb: 1, 
            bgcolor: theme.palette.mode === 'dark' 
              ? `${theme.palette.primary.dark}20` 
              : 'primary.light',
            '& .MuiCardHeader-content': { flex: 1 }
          }}
        />
        <CardContent sx={{ maxHeight: 400, overflowY: 'auto', p: 0 }}>
          <List sx={{ py: 0 }}>
            {availableProcedures.map((procedure, index) => (
              <ListItem
                key={procedure.id}
                button
                onClick={() => handleAddProcedure(procedure)}
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: index < availableProcedures.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' 
                      ? `${theme.palette.primary.dark}30` 
                      : 'primary.light',
                    transform: 'translateX(8px)',
                    boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 48 }}>
                  <Box
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'primary.dark' 
                        : 'primary.main',
                      color: 'primary.contrastText',
                      borderRadius: 2,
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LocalHospitalIcon fontSize="small" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {procedure.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        {procedure.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={procedure.complexity}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          ⏱️ {procedure.duration} mins
                        </Typography>
                        {procedure.equipment && (
                          <Typography variant="caption" color="text.secondary">
                            🔧 {procedure.equipment.join(', ')}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  }
                />
                <IconButton
                  size="medium"
                  sx={{
                    bgcolor: 'success.main',
                    color: 'success.contrastText',
                    ml: 2,
                    '&:hover': {
                      bgcolor: 'success.dark',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Medications */}
      <Card sx={{ 
        mb: 4, 
        elevation: theme.palette.mode === 'dark' ? 6 : 3, 
        borderRadius: 3, 
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
        border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.grey[700]}` : 'none',
      }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main', fontSize: '1.2rem' }}>
              💊 Medications & Prescriptions
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              FDA-approved pharmaceutical treatments
            </Typography>
          }
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${availableMedications.length} available`}
                color="secondary"
                variant="filled"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          }
          sx={{ 
            pb: 1, 
            bgcolor: theme.palette.mode === 'dark' 
              ? `${theme.palette.secondary.dark}20` 
              : 'secondary.light',
            '& .MuiCardHeader-content': { flex: 1 }
          }}
        />
        <CardContent sx={{ maxHeight: 400, overflowY: 'auto', p: 0 }}>
          <List sx={{ py: 0 }}>
            {availableMedications.map((medication, index) => (
              <ListItem
                key={medication.id}
                button
                onClick={() => handleAddMedication(medication)}
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: index < availableMedications.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' 
                      ? `${theme.palette.secondary.dark}30` 
                      : 'secondary.light',
                    transform: 'translateX(8px)',
                    boxShadow: `inset 4px 0 0 ${theme.palette.secondary.main}`,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 48 }}>
                  <Box
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'secondary.dark' 
                        : 'secondary.main',
                      color: 'secondary.contrastText',
                      borderRadius: 2,
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MedicationIcon fontSize="small" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {medication.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        {medication.instructions}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={medication.type}
                          size="small"
                          variant="outlined"
                          color="secondary"
                          sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          💊 {medication.dosage}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          📅 {medication.frequency}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ⏳ {medication.duration}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <IconButton
                  size="medium"
                  sx={{
                    bgcolor: 'success.main',
                    color: 'success.contrastText',
                    ml: 2,
                    '&:hover': {
                      bgcolor: 'success.dark',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Appointments */}
      <Card sx={{ 
        elevation: theme.palette.mode === 'dark' ? 6 : 3, 
        borderRadius: 3, 
        overflow: 'hidden',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
        border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.grey[700]}` : 'none',
      }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main', fontSize: '1.2rem' }}>
              📅 Follow-up Appointments
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Scheduled care coordination sessions
            </Typography>
          }
          action={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${availableAppointments.length} available`}
                color="success"
                variant="filled"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          }
          sx={{ 
            pb: 1, 
            bgcolor: theme.palette.mode === 'dark' 
              ? `${theme.palette.success.dark}20` 
              : 'success.light',
            '& .MuiCardHeader-content': { flex: 1 }
          }}
        />
        <CardContent sx={{ maxHeight: 400, overflowY: 'auto', p: 0 }}>
          <List sx={{ py: 0 }}>
            {availableAppointments.map((appointment, index) => (
              <ListItem
                key={appointment.id}
                button
                onClick={() => handleAddAppointment(appointment)}
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: index < availableAppointments.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' 
                      ? `${theme.palette.success.dark}30` 
                      : 'success.light',
                    transform: 'translateX(8px)',
                    boxShadow: `inset 4px 0 0 ${theme.palette.success.main}`,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 48 }}>
                  <Box
                    sx={{
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'success.dark' 
                        : 'success.main',
                      color: 'success.contrastText',
                      borderRadius: 2,
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <EventIcon fontSize="small" />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {appointment.type}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        {appointment.purpose}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={appointment.priority}
                          size="small"
                          variant="outlined"
                          color="success"
                          sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          👨‍⚕️ {appointment.provider}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          ⏱️ {appointment.duration} mins
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          🏥 {appointment.department}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <IconButton
                  size="medium"
                  sx={{
                    bgcolor: 'success.main',
                    color: 'success.contrastText',
                    ml: 2,
                    '&:hover': {
                      bgcolor: 'success.dark',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      
      </Box>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {/* Header */}
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              zIndex: theme.zIndex.drawer + 1,
              bgcolor: 'background.paper',
              borderBottom: `1px solid ${theme.palette.divider}`,
              color: 'text.primary',
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => navigate(-1)}
                aria-label="back"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <MedicalServicesIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Treatment Planning
                </Typography>
                {selectedPatient && (
                  <Chip
                    icon={<PersonIcon />}
                    label={selectedPatient.name}
                    sx={{ ml: 2 }}
                    onClick={() => setPatientSelectorOpen(true)}
                  />
                )}
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="outlined"
                startIcon={<PersonIcon />}
                onClick={() => setPatientSelectorOpen(true)}
                sx={{ mr: 1 }}
              >
                {selectedPatient ? 'Change Patient' : 'Select Patient'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setNewPlanDialogOpen(true)}
                sx={{ mr: 1 }}
              >
                New Plan
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSavePlan}
                disabled={!currentPlan}
              >
                Save Plan
              </Button>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            sx={{
              width: sidebarOpen ? 450 : 0,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 450,
                boxSizing: 'border-box',
                mt: 8,
                height: 'calc(100vh - 64px)',
                border: 'none',
                boxShadow: theme.palette.mode === 'dark' ? 6 : 3,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
              },
            }}
          >
            {renderSidebar()}
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ml: sidebarOpen && !isMobile ? 0 : 0,
            }}
          >
            {/* Treatment Documentation Connection */}
            <Box sx={{ mb: 3 }}>
              <TreatmentDocConnection
                onPatientFromDocumentation={(patient) => {
                  console.log('Patient data received from documentation:', patient);
                }}
              />
            </Box>

            {currentPlan ? (
              <TreatmentPlanCard
                plan={currentPlan}
                onEdit={() => setEditPlanDialogOpen(true)}
              />
            ) : (
              <Paper
                sx={{
                  p: 6,
                  textAlign: 'center',
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'background.paper',
                  borderRadius: 3,
                  border: `2px dashed ${theme.palette.divider}`,
                  boxShadow: theme.palette.mode === 'dark' ? 4 : 'none',
                }}
              >
                <MedicalServicesIcon
                  sx={{
                    fontSize: 80,
                    color: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.light',
                    mb: 2,
                  }}
                />
                <Typography variant="h4" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                  No Treatment Plan Selected
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                  Create a new treatment plan to get started with building comprehensive care plans for your patients.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setNewPlanDialogOpen(true)}
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Create New Treatment Plan
                </Button>
              </Paper>
            )}
          </Box>


        </Box>

        {/* New Plan Dialog */}
        <Dialog
          open={newPlanDialogOpen}
          onClose={() => setNewPlanDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Create New Treatment Plan</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Plan Title"
                  value={newPlanForm.title}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={newPlanForm.description}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  value={newPlanForm.startDate}
                  onChange={(date) => setNewPlanForm({ ...newPlanForm, startDate: date || dayjs() })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  value={newPlanForm.endDate}
                  onChange={(date) => setNewPlanForm({ ...newPlanForm, endDate: date || dayjs() })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Treatment Goals"
                  multiline
                  rows={2}
                  value={newPlanForm.goals}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, goals: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewPlanDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateNewPlan} variant="contained">
              Create Plan
            </Button>
          </DialogActions>
        </Dialog>

        {/* Patient Selector Dialog */}
        <PatientSelector
          open={patientSelectorOpen}
          onClose={() => setPatientSelectorOpen(false)}
          onSelectPatient={(patient) => {
            dispatch(setSelectedPatient(patient));
            setPatientSelectorOpen(false);
          }}
        />
            </LocalizationProvider>
  );
};

export default TreatmentPlanningPage; 