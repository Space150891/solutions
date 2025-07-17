/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   PatientHistoryState,
   AddInfPayload,
   Task,
   HistoryType,
   ReportFilters,
   DiagnosisCode,
   TreatmentDetail,
   Diagnosis,
} from './types/patientHistoryTypes';

// Sample ICD-10 codes for initial state
const sampleDiagnosisCodes: DiagnosisCode[] = [
   { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', category: 'Endocrine' },
   { code: 'I10', description: 'Essential (primary) hypertension', category: 'Circulatory' },
   { code: 'J45.909', description: 'Unspecified asthma, uncomplicated', category: 'Respiratory' },
   { code: 'M54.5', description: 'Low back pain', category: 'Musculoskeletal' },
   { code: 'F41.1', description: 'Generalized anxiety disorder', category: 'Mental Health' },
];

const initialState: PatientHistoryState = {
   documentation: [],
   diagnosis: [],
   diagnosisCodes: sampleDiagnosisCodes,
   treatmentDetails: [],
   documents: [],
   tasks: [],
   socialInfo: [],
   isLoading: false,
   error: null,
};

export const patientHistorySlice = createSlice({
   name: 'patientHistory',
   initialState,
   reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      },
      setError: (state, action: PayloadAction<string | null>) => {
         state.error = action.payload;
      },
      toggleDoneTask: (state, action: PayloadAction<string>) => {
         const taskId = action.payload;
         const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

         if (taskIndex !== -1) {
            state.tasks[taskIndex].done = !state.tasks[taskIndex].done;
         }
      },
      addInfForHistory: (state, action: PayloadAction<AddInfPayload>) => {
         const { type, data } = action.payload;

         (state[type] as any[]).push(data);
      },
      updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
         const { id, updates } = action.payload;
         const taskIndex = state.tasks.findIndex((task) => task.id === id);

         if (taskIndex !== -1) {
            state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
         }
      },
      removeInfFromHistory: (state, action: PayloadAction<{ type: HistoryType; id: string }>) => {
         const { type, id } = action.payload;
         if (Array.isArray(state[type])) {
            // @ts-expect-error - We know this is an array of objects with id
            state[type] = state[type].filter((item) => item.id !== id);
         }
      },
      updateDiagnosis: (state, action: PayloadAction<{ id: string; updates: Partial<Diagnosis> }>) => {
         const { id, updates } = action.payload;
         const index = state.diagnosis.findIndex((item) => item.id === id);
         
         if (index !== -1) {
            state.diagnosis[index] = { ...state.diagnosis[index], ...updates };
         }
      },
      updateTreatmentDetail: (state, action: PayloadAction<{ id: string; updates: Partial<TreatmentDetail> }>) => {
         const { id, updates } = action.payload;
         const index = state.treatmentDetails.findIndex((item) => item.id === id);
         
         if (index !== -1) {
            state.treatmentDetails[index] = { ...state.treatmentDetails[index], ...updates };
         }
      },
      addDiagnosisCode: (state, action: PayloadAction<DiagnosisCode>) => {
         // Check if code already exists
         const exists = state.diagnosisCodes.some(code => code.code === action.payload.code);
         if (!exists) {
            state.diagnosisCodes.push(action.payload);
         }
      },
      removeDiagnosisCode: (state, action: PayloadAction<string>) => {
         state.diagnosisCodes = state.diagnosisCodes.filter(code => code.code !== action.payload);
      },
      linkDocumentToDiagnosis: (state, action: PayloadAction<{ documentId: string; diagnosisId: string }>) => {
         const { documentId, diagnosisId } = action.payload;
         const docIndex = state.documents.findIndex(doc => doc.id === documentId);
         
         if (docIndex !== -1) {
            state.documents[docIndex].relatedDiagnosis = diagnosisId;
         }
      },
      linkDocumentToTreatment: (state, action: PayloadAction<{ documentId: string; treatmentId: string }>) => {
         const { documentId, treatmentId } = action.payload;
         const docIndex = state.documents.findIndex(doc => doc.id === documentId);
         
         if (docIndex !== -1) {
            state.documents[docIndex].relatedTreatment = treatmentId;
         }
      },
   },
});

export const { 
   setLoading, 
   setError, 
   toggleDoneTask, 
   addInfForHistory, 
   updateTask, 
   removeInfFromHistory,
   updateDiagnosis,
   updateTreatmentDetail,
   addDiagnosisCode,
   removeDiagnosisCode,
   linkDocumentToDiagnosis,
   linkDocumentToTreatment,
} = patientHistorySlice.actions;

export default patientHistorySlice.reducer;
