import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Chip,
  Badge,
  Divider,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  LocalHospital,
  Medication,
  Event,
  Delete,
  Edit,
  Assignment,
} from '@mui/icons-material';
import { useAppDispatch } from '../../../store/hooks';
import {
  removeProcedureFromCurrentPlan,
  removeMedicationFromCurrentPlan,
  removeAppointmentFromCurrentPlan,
} from '../../../store/slices/treatmentPlanningSlice';
import { TreatmentPlan, Procedure, Medication as MedicationType, FollowUpAppointment } from '../../../store/slices/types/treatmentPlanningTypes';

interface TreatmentPlanCardProps {
  plan: TreatmentPlan;
  onEdit: () => void;
}

const TreatmentPlanCard: React.FC<TreatmentPlanCardProps> = ({
  plan,
  onEdit,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return theme.palette.warning.main;
      case 'Active':
        return theme.palette.success.main;
      case 'Completed':
        return theme.palette.info.main;
      case 'Cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Card
      sx={{
        height: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        title={plan.title}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Patient: {plan.patientName}
            </Typography>
            <Chip
              label={plan.status}
              size="small"
              sx={{
                backgroundColor: alpha(getStatusColor(plan.status), 0.1),
                color: getStatusColor(plan.status),
                fontWeight: 'bold',
              }}
            />
          </Box>
        }
        action={
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <Box>
          {/* Plan Description */}
          {plan.description && (
            <ListItem>
              <ListItemIcon>
                <Assignment color="action" />
              </ListItemIcon>
              <ListItemText primary={plan.description} />
            </ListItem>
          )}

          {/* Goals */}
          {plan.goals && plan.goals.length > 0 && (
            <ListItem>
              <ListItemIcon>
                <Assignment color="action" />
              </ListItemIcon>
              <ListItemText primary="Treatment Goals" />
            </ListItem>
          )}
          {plan.goals && plan.goals.length > 0 && (
            <List dense>
              {plan.goals.map((goal, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <Assignment color="action" />
                  </ListItemIcon>
                  <ListItemText primary={goal} />
                </ListItem>
              ))}
            </List>
          )}

          {/* Procedures Section */}
          <ListItem>
            <ListItemIcon>
              <LocalHospital color="primary" />
            </ListItemIcon>
            <ListItemText primary="Procedures" />
          </ListItem>
          {plan.procedures.length > 0 && (
            <List dense>
              {plan.procedures.map((procedure, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <LocalHospital color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={procedure.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => dispatch(removeProcedureFromCurrentPlan(procedure.id))}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          {plan.procedures.length === 0 && (
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Drag procedures here
              </Typography>
            </Paper>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Medications Section */}
          <ListItem>
            <ListItemIcon>
              <Medication color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Medications" />
          </ListItem>
          {plan.medications.length > 0 && (
            <List dense>
              {plan.medications.map((medication, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <Medication color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={medication.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => dispatch(removeMedicationFromCurrentPlan(medication.id))}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          {plan.medications.length === 0 && (
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                border: `1px dashed ${alpha(theme.palette.secondary.main, 0.3)}`,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Drag medications here
              </Typography>
            </Paper>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Appointments Section */}
          <ListItem>
            <ListItemIcon>
              <Event color="success" />
            </ListItemIcon>
            <ListItemText primary="Follow-up Appointments" />
          </ListItem>
          {plan.followUpAppointments.length > 0 && (
            <List dense>
              {plan.followUpAppointments.map((appointment, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <Event color="success" />
                  </ListItemIcon>
                  <ListItemText primary={appointment.type} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => dispatch(removeAppointmentFromCurrentPlan(appointment.id))}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          {plan.followUpAppointments.length === 0 && (
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: alpha(theme.palette.success.main, 0.05),
                border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Drag appointments here
              </Typography>
            </Paper>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TreatmentPlanCard; 