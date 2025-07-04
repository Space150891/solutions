import React, { forwardRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Icon,
  useTheme,
  alpha,
} from '@mui/material';
import {
  DragIndicator,
  LocalHospital,
  Medication,
  Event,
  Schedule,
  AccessTime,
  Person,
  Assignment,
} from '@mui/icons-material';
import { Procedure, Medication as MedicationType, FollowUpAppointment } from '../../../store/slices/types/treatmentPlanningTypes';

interface DraggableItemProps {
  item: Procedure | MedicationType | FollowUpAppointment;
  type: 'procedure' | 'medication' | 'appointment';
  isDragging: boolean;
  style?: React.CSSProperties;
}

const DraggableItem = forwardRef<HTMLDivElement, DraggableItemProps>(
  ({ item, type, isDragging, style, ...props }, ref) => {
    const theme = useTheme();

    // Function to get color based on type
    const getTypeColor = (type: string) => {
      switch (type) {
        case 'procedure':
          return theme.palette.primary.main;
        case 'medication':
          return theme.palette.secondary.main;
        case 'appointment':
          return theme.palette.success.main;
        default:
          return theme.palette.grey[500];
      }
    };

    // Function to get icon based on type
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'procedure':
          return <LocalHospital />;
        case 'medication':
          return <Medication />;
        case 'appointment':
          return <Event />;
        default:
          return <Assignment />;
      }
    };

    // Function to get complexity color for procedures
    const getComplexityColor = (complexity: string) => {
      switch (complexity) {
        case 'Low':
          return theme.palette.success.main;
        case 'Medium':
          return theme.palette.warning.main;
        case 'High':
          return theme.palette.error.main;
        default:
          return theme.palette.grey[500];
      }
    };

    // Function to get priority color for appointments
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'Low':
          return theme.palette.success.main;
        case 'Medium':
          return theme.palette.warning.main;
        case 'High':
          return theme.palette.error.main;
        case 'Urgent':
          return theme.palette.error.dark;
        default:
          return theme.palette.grey[500];
      }
    };

    // Render procedure specific content
    const renderProcedureContent = (procedure: Procedure) => (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            {procedure.name}
          </Typography>
          <Chip
            label={procedure.complexity}
            size="small"
            sx={{
              backgroundColor: alpha(getComplexityColor(procedure.complexity), 0.1),
              color: getComplexityColor(procedure.complexity),
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {procedure.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AccessTime fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {procedure.duration} mins
          </Typography>
          <Chip
            label={procedure.category}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.7rem' }}
          />
        </Box>
      </>
    );

    // Render medication specific content
    const renderMedicationContent = (medication: MedicationType) => (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            {medication.name}
          </Typography>
          <Chip
            label={medication.type}
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              color: theme.palette.secondary.main,
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {medication.dosage} - {medication.frequency}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Schedule fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            Duration: {medication.duration}
          </Typography>
        </Box>
      </>
    );

    // Render appointment specific content
    const renderAppointmentContent = (appointment: FollowUpAppointment) => (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            {appointment.type}
          </Typography>
          <Chip
            label={appointment.priority}
            size="small"
            sx={{
              backgroundColor: alpha(getPriorityColor(appointment.priority), 0.1),
              color: getPriorityColor(appointment.priority),
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {appointment.purpose}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Person fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {appointment.provider}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {appointment.duration} mins
          </Typography>
        </Box>
      </>
    );

    // Render content based on type
    const renderContent = () => {
      switch (type) {
        case 'procedure':
          return renderProcedureContent(item as Procedure);
        case 'medication':
          return renderMedicationContent(item as MedicationType);
        case 'appointment':
          return renderAppointmentContent(item as FollowUpAppointment);
        default:
          return null;
      }
    };

    return (
      <Card
        ref={ref}
        sx={{
          mb: 1,
          cursor: 'grab',
          transition: 'all 0.2s ease-in-out',
          transform: isDragging ? 'rotate(5deg)' : 'none',
          opacity: isDragging ? 0.8 : 1,
          boxShadow: isDragging
            ? `0 8px 16px ${alpha(theme.palette.common.black, 0.2)}`
            : theme.shadows[1],
          border: `1px solid ${alpha(getTypeColor(type), 0.3)}`,
          backgroundColor: isDragging
            ? alpha(getTypeColor(type), 0.05)
            : 'background.paper',
          '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)',
          },
          '&:active': {
            cursor: 'grabbing',
          },
        }}
        style={style}
        {...props}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: alpha(getTypeColor(type), 0.1),
                color: getTypeColor(type),
                flexShrink: 0,
              }}
            >
              {getTypeIcon(type)}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {renderContent()}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                color: 'text.secondary',
                flexShrink: 0,
              }}
            >
              <DragIndicator fontSize="small" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

DraggableItem.displayName = 'DraggableItem';

export default DraggableItem; 