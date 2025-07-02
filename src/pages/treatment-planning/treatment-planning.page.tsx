import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  MenuItem, 
  Grid, 
  IconButton,
  Fab,
  Tooltip,
  Divider,
  Paper,
  useTheme,
  alpha 
} from '@mui/material';
import { 
  Add as AddIcon, 
  Save as SaveIcon,
  ContentCopy as CopyIcon,
  Delete as DeleteIcon,
  MedicalServices as MedicalServicesIcon,
  Medication as MedicationIcon,
  EventNote as EventNoteIcon,
  DragIndicator as DragIndicatorIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createPlan,
  addPhase,
  updatePhase,
  removePhase,
  addTreatmentItem,
  removeTreatmentItem,
  savePlan,
  updatePlanDetails
} from '../../store/slices/treatmentPlanningSlice';
import {
  TreatmentPhase,
  TreatmentItem,
  samplePatients,
  sampleDoctors,
  availableProcedures,
  availableMedications,
  availableFollowUps,
  createEmptyTreatmentPlan
} from './mock';
import { PhaseColumn } from './components/phase-column.component';
import { TreatmentItemPanel } from './components/treatment-item-panel.component';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { IPages } from '../../types/common.types';

export default function TreatmentPlanningPage() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currentPlan, savedPlans: _savedPlans } = useAppSelector(state => state.treatmentPlanning);
  
  // Local state
  const [selectedPatient, setSelectedPatient] = useState(samplePatients[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(sampleDoctors[0].id);
  const [planTitle, setPlanTitle] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  
  // Initialize with an empty plan if no plan is loaded
  useEffect(() => {
    if (!currentPlan) {
      handleCreateNewPlan();
    } else {
      setPlanTitle(currentPlan.title);
      setPlanDescription(currentPlan.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan]);

  // Create new plan
  const handleCreateNewPlan = () => {
    const patient = samplePatients.find(p => p.id === selectedPatient);
    const doctor = sampleDoctors.find(d => d.id === selectedDoctor);
    
    if (patient && doctor) {
      const newPlan = createEmptyTreatmentPlan(
        patient.id,
        patient.name,
        doctor.id,
        doctor.name
      );
      dispatch(createPlan(newPlan));
      setPlanTitle(newPlan.title);
      setPlanDescription(newPlan.description);
    }
  };

  // Save current plan
  const [saveConfirmation, setSaveConfirmation] = useState(false);
  
  const handleSavePlan = () => {
    if (currentPlan) {
      dispatch(updatePlanDetails({
        title: planTitle,
        description: planDescription
      }));
      dispatch(savePlan());
      
      // Show confirmation
      setSaveConfirmation(true);
      setTimeout(() => {
        setSaveConfirmation(false);
      }, 3000);
    }
  };

  // Add a new phase
  const handleAddPhase = () => {
    if (currentPlan) {
      const newPhase: TreatmentPhase = {
        id: uuidv4(),
        title: `Phase ${currentPlan.phases.length + 1}`,
        description: 'New treatment phase',
        order: currentPlan.phases.length + 1,
        items: []
      };
      dispatch(addPhase(newPhase));
    }
  };

  // Track drag state for animation
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    // Change cursor during drag with smooth transition
    document.body.style.transition = 'cursor 0.1s ease';
    document.body.style.cursor = 'grabbing';
    // Add class to body for global drag styles
    document.body.classList.add('dragging');
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };
  
  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    // Reset cursor with smooth transition
    document.body.style.cursor = 'default';
    // Remove drag class from body
    document.body.classList.remove('dragging');
    // Re-enable text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    
    const { source, destination, draggableId } = result;
    
    // Dropped outside a valid drop zone
    if (!destination) return;
    
    // Handle dropping from available items into a phase
    if (source.droppableId.startsWith('available-') && destination.droppableId.startsWith('phase-')) {
      const category = source.droppableId.replace('available-', '');
      const phaseId = destination.droppableId.replace('phase-', '');
      let itemToAdd: TreatmentItem | undefined;
      
      try {
        // Find the item in the appropriate category
        switch (category) {
          case 'procedures': {
            const foundProcedure = availableProcedures.find(item => item.id === draggableId);
            if (foundProcedure) itemToAdd = { ...foundProcedure };
            break;
          }
          case 'medications': {
            const foundMedication = availableMedications.find(item => item.id === draggableId);
            if (foundMedication) itemToAdd = { ...foundMedication };
            break;
          }
          case 'followUps': {
            const foundFollowUp = availableFollowUps.find(item => item.id === draggableId);
            if (foundFollowUp) itemToAdd = { ...foundFollowUp };
            break;
          }
          default:
            console.warn('Unknown category:', category);
        }
        
        // Add the item with a new ID to ensure uniqueness
        if (itemToAdd) {
          dispatch(addTreatmentItem({
            phaseId,
            item: {
              ...itemToAdd,
              id: uuidv4() // Generate a new ID for the added item
            },
            index: destination.index
          }));
        }
      } catch (error) {
        console.error('Error adding treatment item:', error);
      }
    }
    
    // Handle moving items between phases
    if (source.droppableId.startsWith('phase-') && destination.droppableId.startsWith('phase-') && 
        source.droppableId !== destination.droppableId) {
      
      const sourcePhaseId = source.droppableId.replace('phase-', '');
      const destPhaseId = destination.droppableId.replace('phase-', '');
      
      const sourcePhase = currentPlan?.phases.find(phase => phase.id === sourcePhaseId);
      if (!sourcePhase) return;
      
      // Get the item being moved
      const itemToMove = sourcePhase.items[source.index];
      
      // Remove from source phase
      dispatch(removeTreatmentItem({
        phaseId: sourcePhaseId,
        itemId: itemToMove.id
      }));
      
      // Add to destination phase with the same ID
      dispatch(addTreatmentItem({
        phaseId: destPhaseId,
        item: {
          ...itemToMove
        },
        index: destination.index
      }));
    }
    
    // Handle reordering within the same phase
    if (source.droppableId.startsWith('phase-') && 
        source.droppableId === destination.droppableId && 
        source.index !== destination.index) {
      
      const phaseId = source.droppableId.replace('phase-', '');
      const phase = currentPlan?.phases.find(phase => phase.id === phaseId);
      
      if (phase) {
        const newItems = Array.from(phase.items);
        const [movedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, movedItem);
        
        dispatch(updatePhase({
          phaseId,
          updates: {
            items: newItems
          }
        }));
      }
    }
  };

  // Toggle plan editing mode
  const _toggleEditMode = () => {
    setIsEditingPlan(!isEditingPlan);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header section */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' }
      }}>
        <Typography variant="h4" component="h1" color="primary">
          {IPages.TREATMENT_PLANNING}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            onClick={handleCreateNewPlan}
          >
            New Plan
          </Button>
          
          <Button 
            variant="contained"
            startIcon={saveConfirmation ? <CheckIcon /> : <SaveIcon />}
            onClick={handleSavePlan}
            color={saveConfirmation ? "success" : "primary"}
          >
            {saveConfirmation ? "Saved!" : "Save Plan"}
          </Button>
        </Box>
      </Box>

      {/* Plan details section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Plan Title"
                fullWidth
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={planDescription}
                onChange={(e) => setPlanDescription(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Patient"
                    fullWidth
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    margin="normal"
                    variant="outlined"
                  >
                    {samplePatients.map((patient) => (
                      <MenuItem key={patient.id} value={patient.id}>
                        {patient.name} - {patient.condition}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Doctor"
                    fullWidth
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    margin="normal"
                    variant="outlined"
                  >
                    {sampleDoctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    p: 2,
                    borderRadius: 1
                  }}>
                    {currentPlan && (
                      <>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Created: {new Date(currentPlan.createdAt).toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Updated: {new Date(currentPlan.updatedAt).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            Phases: {currentPlan.phases.length}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main plan builder section */}
      <DragDropContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          flexDirection: { xs: 'column', lg: 'row' },
          // Smooth global transitions during drag
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isDragging ? 0.98 : 1,
          // Performance optimizations
          backfaceVisibility: 'hidden',
          perspective: 1000,
          willChange: isDragging ? 'transform' : 'auto',
        }}>
          {/* Treatment items panel */}
          <Box sx={{ 
            width: { xs: '100%', lg: '300px' },
            flexShrink: 0,
            position: 'sticky',
            top: 16,
            alignSelf: 'flex-start',
            // Smooth transitions for the panel
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isDragging ? 'scale(0.995)' : 'scale(1)',
          }}>
            <TreatmentItemPanel 
              procedures={availableProcedures}
              medications={availableMedications}
              followUps={availableFollowUps}
            />
          </Box>
          
          {/* Treatment phases area */}
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex',
            flexDirection: 'column',
            pb: 2,
            // Performance optimization
            contain: 'layout style paint',
          }}>
            {/* Phases container - PRIMARY scroll container */}
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              overflowX: 'auto',
              overflowY: 'hidden', // Prevent vertical scroll here
              pb: 3,
              pt: 1,
              px: 1,
              height: 'calc(100vh - 320px)', // Fixed height to prevent nesting
              // Enhanced scrollbar with smooth appearance
              '&::-webkit-scrollbar': {
                height: 12,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: alpha(theme.palette.primary.main, 0.3),
                borderRadius: 6,
                border: `2px solid transparent`,
                backgroundClip: 'padding-box',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                }
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: alpha(theme.palette.divider, 0.05),
                borderRadius: 6,
                margin: '0 10px'
              },
              // Smooth scroll behavior
              scrollBehavior: 'smooth',
              // Performance optimizations
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}>
              {currentPlan?.phases.map((phase, index) => (
                <Box
                  key={phase.id}
                  sx={{
                    // Smooth entrance animation for phases
                    animation: `fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
                    '@keyframes fadeInUp': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <PhaseColumn 
                    phase={phase}
                    onRemove={() => dispatch(removePhase(phase.id))}
                    onUpdate={(updates) => dispatch(updatePhase({ phaseId: phase.id, updates }))}
                    onRemoveItem={(itemId) => dispatch(removeTreatmentItem({ phaseId: phase.id, itemId }))}
                  />
                </Box>
              ))}
              
              {/* Add phase button */}
              <Box sx={{ 
                minWidth: '450px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                border: `2px dashed ${theme.palette.divider}`,
                borderRadius: 2,
                p: 2,
                height: 'fit-content',
                // Smooth hover effect
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                }
              }}>
                <Tooltip title="Add a new treatment phase" arrow>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddPhase}
                    sx={{
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      }
                    }}
                  >
                    Add Phase
                  </Button>
                </Tooltip>
              </Box>
            </Box>
            
            {/* Summary and statistics */}
            {currentPlan && currentPlan.phases.length > 0 && (
              <Paper 
                elevation={0} 
                sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6">Treatment Summary</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1
                    }}>
                      <MedicalServicesIcon color="primary" />
                      <Typography>
                        {currentPlan.phases.reduce((sum, phase) => 
                          sum + phase.items.filter(item => item.category === 'procedure').length, 0)} Procedures
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1
                    }}>
                      <MedicationIcon color="primary" />
                      <Typography>
                        {currentPlan.phases.reduce((sum, phase) => 
                          sum + phase.items.filter(item => item.category === 'medication').length, 0)} Medications
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1
                    }}>
                      <EventNoteIcon color="primary" />
                      <Typography>
                        {currentPlan.phases.reduce((sum, phase) => 
                          sum + phase.items.filter(item => item.category === 'followUp').length, 0)} Follow-ups
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography variant="h6">
                    Estimated Total Cost: ${currentPlan.phases.reduce((sum, phase) => 
                      sum + phase.items.reduce((phaseSum, item) => phaseSum + item.cost, 0), 0).toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </DragDropContext>
    </Box>
  );
}
