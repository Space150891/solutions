import { useState } from 'react';
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { IPages } from '../../types/common.types';
import { patients } from './mock';
import { PatientList } from './components/patient-list.component';
import { PatientVitalsCard } from './components/patient-vitals-card.component';
import { VitalMonitoringChart } from './components/vital-monitoring-chart.component';
import { PatientAlerts } from './components/patient-alerts.component';

export default function VitalMonitoringPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  return (
    <Box component="section" padding={1.25}>
      <Box sx={{ mb: 2.25 }}>
        <Typography variant="h5">{`${IPages.VITAL_MONITORING?.toUpperCase() || 'VITAL MONITORING'}`}</Typography>
        <Typography variant="body2" color="text.secondary">
          Real-time patient vital signs monitoring dashboard
        </Typography>
      </Box>

      <Grid2 container spacing={2}>
        {/* Left sidebar - Patient list */}
        <Grid2 xs={12} md={3}>
          <PatientList
            selectedPatientId={selectedPatientId}
            onSelectPatient={setSelectedPatientId}
          />
        </Grid2>

        {/* Main content area */}
        <Grid2 xs={12} md={9} container spacing={2}>
          {/* Patient vital signs card */}
          <Grid2 xs={12} md={6}>
            <PatientVitalsCard patient={selectedPatient} />
          </Grid2>

          {/* Patient alerts */}
          <Grid2 xs={12} md={6}>
            <PatientAlerts patient={selectedPatient} />
          </Grid2>

          {/* Vital monitoring charts */}
          <Grid2 xs={12}>
            <VitalMonitoringChart
              patientId={selectedPatientId}
              patientName={selectedPatient.name}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
}