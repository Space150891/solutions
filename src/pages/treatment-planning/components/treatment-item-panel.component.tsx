import React from 'react';
import { 
  Card, 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  useTheme,
  Paper,
  alpha
} from '@mui/material';
import { 
  MedicalServices as MedicalServicesIcon,
  Medication as MedicationIcon,
  EventNote as EventNoteIcon 
} from '@mui/icons-material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TreatmentItem } from '../mock';
import { TreatmentItemCard } from './treatment-item-card.component';

interface TreatmentItemPanelProps {
  procedures: TreatmentItem[];
  medications: TreatmentItem[];
  followUps: TreatmentItem[];
}

export const TreatmentItemPanel: React.FC<TreatmentItemPanelProps> = ({
  procedures,
  medications,
  followUps
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <Box sx={{ bgcolor: 'background.paper', borderBottom: 0 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none'
            },
            '& .MuiTab-root': {
              minHeight: '52px',
              textTransform: 'none',
              fontWeight: 500,
              py: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              px: 2,
              backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.4) : alpha(theme.palette.background.default, 0.9),
              borderBottom: '3px solid transparent',
              '&.Mui-selected': {
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            },
            '& .MuiTab-iconWrapper': {
              marginRight: 1.5,
              marginBottom: '0 !important'
            }
          }}
        >
          <Tab 
            icon={<Box sx={{ 
              bgcolor: '#1976d2',
              color: 'white',
              borderRadius: '4px',
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px'
            }}>
              <MedicalServicesIcon fontSize="small" />
            </Box>} 
            label="Procedures" 
            iconPosition="start" 
            sx={{ 
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              borderBottom: `3px solid ${theme.palette.primary.main}`,
              opacity: tabValue === 0 ? 1 : 0.7
            }}
          />
          <Tab 
            icon={<Box sx={{ 
              bgcolor: '#0288d1',
              color: 'white',
              borderRadius: '4px',
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px'
            }}>
              <MedicationIcon fontSize="small" />
            </Box>} 
            label="Medications" 
            iconPosition="start"
            sx={{ 
              borderLeft: tabValue === 1 ? `4px solid ${theme.palette.info.main}` : '4px solid transparent',
              borderBottom: `3px solid ${theme.palette.info.main}`,
              opacity: tabValue === 1 ? 1 : 0.7
            }}
          />
          <Tab 
            icon={<Box sx={{ 
              bgcolor: '#ed6c02',
              color: 'white',
              borderRadius: '4px',
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px'
            }}>
              <EventNoteIcon fontSize="small" />
            </Box>} 
            label="Follow-ups" 
            iconPosition="start"
            sx={{ 
              borderLeft: tabValue === 2 ? `4px solid ${theme.palette.warning.main}` : '4px solid transparent',
              borderBottom: `3px solid ${theme.palette.warning.main}`,
              opacity: tabValue === 2 ? 1 : 0.7
            }}
          />
        </Tabs>
      </Box>
      
      {/* Procedures Tab */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 0}
        sx={{
          height: 'calc(100vh - 240px)',
          overflow: 'auto',
          p: 1,
        }}
      >
        <Droppable droppableId="available-procedures" isDropDisabled>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {procedures.map((procedure, index) => (
                <Draggable key={procedure.id} draggableId={procedure.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ 
                        mb: 1,
                        // Smooth transform transitions
                        transition: snapshot.isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
                        transform: 'translateZ(0)', // Hardware acceleration
                        willChange: snapshot.isDragging ? 'transform' : 'auto',
                        // Prevent layout shift during drag
                        position: 'relative',
                        zIndex: snapshot.isDragging ? 1000 : 1,
                        // Fix positioning to reduce drag offset
                        top: 0,
                        left: 0,
                      }}
                    >
                      <TreatmentItemCard 
                        item={procedure} 
                        isDraggable 
                        isDragging={snapshot.isDragging}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
      
      {/* Medications Tab */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 1}
        sx={{
          height: 'calc(100vh - 240px)',
          overflow: 'auto',
          p: 1,
        }}
      >
        <Droppable droppableId="available-medications" isDropDisabled>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {medications.map((medication, index) => (
                <Draggable key={medication.id} draggableId={medication.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ 
                        mb: 1,
                        // Smooth transform transitions
                        transition: snapshot.isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
                        transform: 'translateZ(0)', // Hardware acceleration
                        willChange: snapshot.isDragging ? 'transform' : 'auto',
                        // Prevent layout shift during drag
                        position: 'relative',
                        zIndex: snapshot.isDragging ? 1000 : 1,
                        // Fix positioning to reduce drag offset
                        top: 0,
                        left: 0,
                      }}
                    >
                      <TreatmentItemCard 
                        item={medication} 
                        isDraggable 
                        isDragging={snapshot.isDragging}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
      
      {/* Follow-ups Tab */}
      <Box
        role="tabpanel"
        hidden={tabValue !== 2}
        sx={{
          height: 'calc(100vh - 240px)',
          overflow: 'auto',
          p: 1,
        }}
      >
        <Droppable droppableId="available-followUps" isDropDisabled>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {followUps.map((followUp, index) => (
                <Draggable key={followUp.id} draggableId={followUp.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{ 
                        mb: 1,
                        // Smooth transform transitions
                        transition: snapshot.isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
                        transform: 'translateZ(0)', // Hardware acceleration
                        willChange: snapshot.isDragging ? 'transform' : 'auto',
                        // Prevent layout shift during drag
                        position: 'relative',
                        zIndex: snapshot.isDragging ? 1000 : 1,
                        // Fix positioning to reduce drag offset
                        top: 0,
                        left: 0,
                      }}
                    >
                      <TreatmentItemCard 
                        item={followUp} 
                        isDraggable 
                        isDragging={snapshot.isDragging}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </Card>
  );
};
