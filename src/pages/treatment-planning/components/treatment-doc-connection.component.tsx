import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Description,
  Person,
  CalendarToday,
  Assignment,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setSelectedPatient } from '../../../store/slices/treatmentPlanningSlice';
import { paths } from '../../../routes/paths';

interface TreatmentDocConnectionProps {
  onPatientFromDocumentation?: (patient: { id: string; name: string; dob: string; age: string }) => void;
}

const TreatmentDocConnection: React.FC<TreatmentDocConnectionProps> = ({
  onPatientFromDocumentation,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get treatment documentation data
  const treatmentDoc = useAppSelector((state) => state.treatmentDocumentation);
  const { selectedPatient } = useAppSelector((state) => state.treatmentPlanning);

  // Sync patient from treatment documentation if available
  useEffect(() => {
    if (treatmentDoc.patient && treatmentDoc.dob && treatmentDoc.age && !selectedPatient) {
      const patientData = {
        id: `doc-${Date.now()}`, // Generate ID for documentation patient
        name: treatmentDoc.patient,
        dob: treatmentDoc.dob,
        age: treatmentDoc.age,
      };
      
      dispatch(setSelectedPatient(patientData));
      onPatientFromDocumentation?.(patientData);
    }
  }, [treatmentDoc.patient, treatmentDoc.dob, treatmentDoc.age, selectedPatient, dispatch, onPatientFromDocumentation]);

  // Check if there's treatment documentation data
  const hasDocumentationData = treatmentDoc.patient || treatmentDoc.documentName;

  const handleNavigateToDocumentation = () => {
    navigate(paths.treatmentDocumentation);
  };

  if (!hasDocumentationData) {
    return (
      <Alert severity="info" sx={{ mb: 2 }}>
        <AlertTitle>Treatment Documentation</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          No treatment documentation found. You can create a treatment plan independently or link it to existing documentation.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Description />}
          onClick={handleNavigateToDocumentation}
          size="small"
        >
          Go to Treatment Documentation
        </Button>
      </Alert>
    );
  }

  return (
    <Card sx={{ mb: 2, border: '1px solid', borderColor: 'primary.light' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LinkIcon color="primary" />
          <Typography variant="h6" color="primary">
            Connected to Treatment Documentation
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Document Information */}
          {treatmentDoc.documentName && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Document
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Description color="action" />
                <Typography variant="body1">
                  {treatmentDoc.documentName}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Patient Information */}
          {treatmentDoc.patient && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Patient Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Person color="action" />
                <Typography variant="body1">
                  {treatmentDoc.patient}
                </Typography>
              </Box>
              {treatmentDoc.age && (
                <Typography variant="body2" color="text.secondary">
                  Age: {treatmentDoc.age}
                  {treatmentDoc.dob && ` • DOB: ${new Date(treatmentDoc.dob).toLocaleDateString()}`}
                </Typography>
              )}
            </Box>
          )}

          {/* Treatment Information */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Treatment Details
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {treatmentDoc.treatmentType && (
                <Chip
                  label={`Type: ${treatmentDoc.treatmentType}`}
                  size="small"
                  variant="outlined"
                />
              )}
              {treatmentDoc.treatmentStatus && (
                <Chip
                  label={`Status: ${treatmentDoc.treatmentStatus}`}
                  size="small"
                  variant="outlined"
                />
              )}
              {treatmentDoc.primaryDiagnosis && (
                <Chip
                  label={`Diagnosis: ${treatmentDoc.primaryDiagnosis}`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          {/* Evaluation Information */}
          {treatmentDoc.evaluationDate && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Evaluation Date
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="action" />
                <Typography variant="body1">
                  {new Date(treatmentDoc.evaluationDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          )}

          <Divider />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<Description />}
              onClick={handleNavigateToDocumentation}
              size="small"
            >
              View Documentation
            </Button>
            <Button
              variant="contained"
              startIcon={<Assignment />}
              onClick={() => {
                // Auto-populate treatment plan with documentation data
                console.log('Auto-populating treatment plan with documentation data');
              }}
              size="small"
            >
              Use Documentation Data
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TreatmentDocConnection; 