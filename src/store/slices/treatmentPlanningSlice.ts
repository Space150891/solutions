import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  TreatmentPlanningState, 
  TreatmentPlan, 
  Procedure, 
  Medication, 
  FollowUpAppointment,
  ProcedureCategory,
  AppointmentType 
} from './types/treatmentPlanningTypes';

// Mock data for available procedures
const mockProcedures: Procedure[] = [
  {
    id: 'proc-1',
    name: 'Physical Therapy Session',
    description: 'Individual physical therapy session for mobility improvement',
    duration: 60,
    category: ProcedureCategory.THERAPEUTIC,
    complexity: 'Medium',
    equipment: ['Exercise mat', 'Resistance bands', 'Therapy balls'],
    prerequisites: ['Assessment completed'],
    notes: 'Focus on lower extremity strengthening'
  },
  {
    id: 'proc-2',
    name: 'Cognitive Assessment',
    description: 'Comprehensive cognitive evaluation',
    duration: 90,
    category: ProcedureCategory.DIAGNOSTIC,
    complexity: 'High',
    equipment: ['Assessment tools', 'Computer'],
    prerequisites: ['Patient consent'],
    notes: 'Include memory, attention, and executive function tests'
  },
  {
    id: 'proc-3',
    name: 'Speech Therapy',
    description: 'Speech and language therapy session',
    duration: 45,
    category: ProcedureCategory.THERAPEUTIC,
    complexity: 'Medium',
    equipment: ['Speech therapy materials', 'Mirror'],
    prerequisites: ['Initial evaluation'],
    notes: 'Focus on articulation and language comprehension'
  },
  {
    id: 'proc-4',
    name: 'Occupational Therapy',
    description: 'Occupational therapy for daily living skills',
    duration: 60,
    category: ProcedureCategory.REHABILITATION,
    complexity: 'Medium',
    equipment: ['ADL training materials', 'Adaptive equipment'],
    prerequisites: ['OT assessment'],
    notes: 'Focus on self-care and functional independence'
  },
  {
    id: 'proc-5',
    name: 'Psychological Counseling',
    description: 'Individual counseling session',
    duration: 50,
    category: ProcedureCategory.COUNSELING,
    complexity: 'High',
    equipment: ['Private room', 'Comfortable seating'],
    prerequisites: ['Intake completed'],
    notes: 'Address anxiety and coping strategies'
  },
  {
    id: 'proc-6',
    name: 'Blood Work',
    description: 'Laboratory blood tests',
    duration: 15,
    category: ProcedureCategory.DIAGNOSTIC,
    complexity: 'Low',
    equipment: ['Blood collection kit', 'Centrifuge'],
    prerequisites: ['Fasting if required'],
    notes: 'Complete metabolic panel'
  },
];

// Mock data for available medications
const mockMedications: Medication[] = [
  {
    id: 'med-1',
    name: 'Acetaminophen',
    type: 'Oral',
    dosage: '500mg',
    frequency: 'Every 6 hours as needed',
    duration: '7 days',
    instructions: 'Take with food to avoid stomach upset',
    sideEffects: ['Nausea', 'Liver damage with overdose'],
    contraindications: ['Liver disease', 'Alcohol dependency'],
    notes: 'Maximum 4 grams per day'
  },
  {
    id: 'med-2',
    name: 'Ibuprofen',
    type: 'Oral',
    dosage: '400mg',
    frequency: 'Every 8 hours',
    duration: '5 days',
    instructions: 'Take with food or milk',
    sideEffects: ['Stomach upset', 'Dizziness', 'Headache'],
    contraindications: ['Stomach ulcers', 'Kidney disease'],
    notes: 'Anti-inflammatory for pain relief'
  },
  {
    id: 'med-3',
    name: 'Sertraline',
    type: 'Oral',
    dosage: '50mg',
    frequency: 'Once daily',
    duration: '3 months',
    instructions: 'Take at the same time each day',
    sideEffects: ['Nausea', 'Insomnia', 'Dry mouth'],
    contraindications: ['MAO inhibitor use', 'Pregnancy'],
    notes: 'Antidepressant - may take 4-6 weeks to see effects'
  },
  {
    id: 'med-4',
    name: 'Metformin',
    type: 'Oral',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: 'Ongoing',
    instructions: 'Take with meals',
    sideEffects: ['Diarrhea', 'Nausea', 'Metallic taste'],
    contraindications: ['Kidney disease', 'Liver disease'],
    notes: 'Diabetes management medication'
  },
  {
    id: 'med-5',
    name: 'Vitamin D3',
    type: 'Oral',
    dosage: '1000 IU',
    frequency: 'Once daily',
    duration: '6 months',
    instructions: 'Take with fatty meal for better absorption',
    sideEffects: ['Constipation', 'Kidney stones with overdose'],
    contraindications: ['Hypercalcemia', 'Kidney stones'],
    notes: 'Supplement for bone health'
  },
  {
    id: 'med-6',
    name: 'Albuterol',
    type: 'Inhalation',
    dosage: '90mcg',
    frequency: 'As needed for shortness of breath',
    duration: '1 month',
    instructions: 'Shake well before use, rinse mouth after',
    sideEffects: ['Tremor', 'Nervousness', 'Rapid heartbeat'],
    contraindications: ['Heart arrhythmias', 'Hyperthyroidism'],
    notes: 'Bronchodilator for asthma/COPD'
  },
];

// Mock data for available appointments
const mockAppointments: FollowUpAppointment[] = [
  {
    id: 'appt-1',
    type: AppointmentType.FOLLOW_UP,
    scheduledDate: '2024-02-15T10:00:00',
    duration: 30,
    provider: 'Dr. Sarah Johnson',
    department: 'Primary Care',
    purpose: 'Review treatment progress and adjust plan',
    priority: 'Medium',
    notes: 'Discuss medication adherence and side effects'
  },
  {
    id: 'appt-2',
    type: AppointmentType.ASSESSMENT,
    scheduledDate: '2024-02-20T14:00:00',
    duration: 60,
    provider: 'Dr. Michael Chen',
    department: 'Cardiology',
    purpose: 'Cardiovascular assessment',
    priority: 'High',
    notes: 'Monitor heart function and blood pressure'
  },
  {
    id: 'appt-3',
    type: AppointmentType.THERAPY,
    scheduledDate: '2024-02-18T09:00:00',
    duration: 45,
    provider: 'Lisa Rodriguez, PT',
    department: 'Physical Therapy',
    purpose: 'Continue mobility exercises',
    priority: 'Medium',
    notes: 'Focus on balance and coordination'
  },
  {
    id: 'appt-4',
    type: AppointmentType.CONSULTATION,
    scheduledDate: '2024-02-25T11:00:00',
    duration: 45,
    provider: 'Dr. Emily Davis',
    department: 'Psychiatry',
    purpose: 'Mental health evaluation',
    priority: 'High',
    notes: 'Assess anxiety and depression symptoms'
  },
  {
    id: 'appt-5',
    type: AppointmentType.REVIEW,
    scheduledDate: '2024-03-01T16:00:00',
    duration: 30,
    provider: 'Dr. James Wilson',
    department: 'Endocrinology',
    purpose: 'Diabetes management review',
    priority: 'Medium',
    notes: 'Review blood glucose logs and HbA1c results'
  },
  {
    id: 'appt-6',
    type: AppointmentType.PROCEDURE,
    scheduledDate: '2024-02-22T08:00:00',
    duration: 120,
    provider: 'Dr. Robert Martinez',
    department: 'Radiology',
    purpose: 'MRI scan',
    priority: 'High',
    notes: 'Brain MRI with contrast'
  },
];

const initialState: TreatmentPlanningState = {
  currentPlan: null,
  plans: [],
  availableProcedures: mockProcedures,
  availableMedications: mockMedications,
  availableAppointments: mockAppointments,
  isLoading: false,
  error: null,
  selectedPatient: null,
};

export const treatmentPlanningSlice = createSlice({
  name: 'treatmentPlanning',
  initialState,
  reducers: {
    // Treatment Plan Actions
    createTreatmentPlan: (state, action: PayloadAction<Partial<TreatmentPlan>>) => {
      const newPlan: TreatmentPlan = {
        id: `plan-${Date.now()}`,
        patientId: action.payload.patientId || '',
        patientName: action.payload.patientName || '',
        createdBy: action.payload.createdBy || 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'Draft',
        title: action.payload.title || 'New Treatment Plan',
        description: action.payload.description || '',
        startDate: action.payload.startDate || new Date().toISOString().split('T')[0],
        endDate: action.payload.endDate || '',
        procedures: [],
        medications: [],
        followUpAppointments: [],
        goals: [],
        notes: action.payload.notes || '',
      };
      state.currentPlan = newPlan;
      state.plans.push(newPlan);
    },

    setCurrentPlan: (state, action: PayloadAction<TreatmentPlan | null>) => {
      state.currentPlan = action.payload;
    },

    updateTreatmentPlan: (state, action: PayloadAction<Partial<TreatmentPlan>>) => {
      if (state.currentPlan) {
        const updatedPlan = { ...state.currentPlan, ...action.payload, updatedAt: new Date().toISOString() };
        state.currentPlan = updatedPlan;
        
        const index = state.plans.findIndex(plan => plan.id === state.currentPlan!.id);
        if (index !== -1) {
          state.plans[index] = updatedPlan;
        }
      }
    },

    // Procedure Actions
    addProcedureToCurrentPlan: (state, action: PayloadAction<Procedure>) => {
      if (state.currentPlan) {
        const procedureExists = state.currentPlan.procedures.find(p => p.id === action.payload.id);
        if (!procedureExists) {
          state.currentPlan.procedures.push(action.payload);
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },

    removeProcedureFromCurrentPlan: (state, action: PayloadAction<string>) => {
      if (state.currentPlan) {
        state.currentPlan.procedures = state.currentPlan.procedures.filter(p => p.id !== action.payload);
        state.currentPlan.updatedAt = new Date().toISOString();
      }
    },

    updateProcedureInCurrentPlan: (state, action: PayloadAction<{ id: string; updates: Partial<Procedure> }>) => {
      if (state.currentPlan) {
        const index = state.currentPlan.procedures.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.currentPlan.procedures[index] = { ...state.currentPlan.procedures[index], ...action.payload.updates };
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },

    // Medication Actions
    addMedicationToCurrentPlan: (state, action: PayloadAction<Medication>) => {
      if (state.currentPlan) {
        const medicationExists = state.currentPlan.medications.find(m => m.id === action.payload.id);
        if (!medicationExists) {
          state.currentPlan.medications.push(action.payload);
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },

    removeMedicationFromCurrentPlan: (state, action: PayloadAction<string>) => {
      if (state.currentPlan) {
        state.currentPlan.medications = state.currentPlan.medications.filter(m => m.id !== action.payload);
        state.currentPlan.updatedAt = new Date().toISOString();
      }
    },

    updateMedicationInCurrentPlan: (state, action: PayloadAction<{ id: string; updates: Partial<Medication> }>) => {
      if (state.currentPlan) {
        const index = state.currentPlan.medications.findIndex(m => m.id === action.payload.id);
        if (index !== -1) {
          state.currentPlan.medications[index] = { ...state.currentPlan.medications[index], ...action.payload.updates };
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },

    // Appointment Actions
    addAppointmentToCurrentPlan: (state, action: PayloadAction<FollowUpAppointment>) => {
      if (state.currentPlan) {
        const appointmentExists = state.currentPlan.followUpAppointments.find(a => a.id === action.payload.id);
        if (!appointmentExists) {
          state.currentPlan.followUpAppointments.push(action.payload);
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },

    removeAppointmentFromCurrentPlan: (state, action: PayloadAction<string>) => {
      if (state.currentPlan) {
        state.currentPlan.followUpAppointments = state.currentPlan.followUpAppointments.filter(a => a.id !== action.payload);
        state.currentPlan.updatedAt = new Date().toISOString();
      }
    },

    updateAppointmentInCurrentPlan: (state, action: PayloadAction<{ id: string; updates: Partial<FollowUpAppointment> }>) => {
      if (state.currentPlan) {
        const index = state.currentPlan.followUpAppointments.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.currentPlan.followUpAppointments[index] = { ...state.currentPlan.followUpAppointments[index], ...action.payload.updates };
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },

    // Patient Actions
    setSelectedPatient: (state, action: PayloadAction<{ id: string; name: string; dob: string; age: string } | null>) => {
      state.selectedPatient = action.payload;
    },

    // Utility Actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    resetTreatmentPlanning: () => initialState,
  },
});

export const {
  createTreatmentPlan,
  setCurrentPlan,
  updateTreatmentPlan,
  addProcedureToCurrentPlan,
  removeProcedureFromCurrentPlan,
  updateProcedureInCurrentPlan,
  addMedicationToCurrentPlan,
  removeMedicationFromCurrentPlan,
  updateMedicationInCurrentPlan,
  addAppointmentToCurrentPlan,
  removeAppointmentFromCurrentPlan,
  updateAppointmentInCurrentPlan,
  setSelectedPatient,
  setLoading,
  setError,
  clearError,
  resetTreatmentPlanning,
} = treatmentPlanningSlice.actions;

export default treatmentPlanningSlice.reducer;
