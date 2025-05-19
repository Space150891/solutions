import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreatmentDocumentationState, DevelopmentalHistory } from './types/treatmentDocumentationTypes';

const initialDevelopmentalHistory: DevelopmentalHistory = {
   milestonesInTime: false,
   crawl: '',
   satUp: '',
   stood: '',
   walked: '',
   fedSelf: '',
   toileted: '',
   dressSelf: '',
   singleWords: '',
   combinedWords: '',
};

const initialState: TreatmentDocumentationState = {
   // General Information
   documentName: '',
   patient: '',
   dob: '',
   age: '',
   nativeLanguage: '',
   evaluationDate: '',
   duration: 0,
   primaryDiagnosis: '',
   secondaryDiagnosis: '',
   doctor: '',

   // Treatment Information
   treatmentType: '',
   treatmentStatus: '',
   referralSource: '',
   categories: '',

   // History
   significantHistory: '',
   medicalHistory: '',
   medications: '',
   accident: '',
   disease: '',
   developmentalHistory: initialDevelopmentalHistory,
   educationalStatus: '',

   // Behavioral Observation
   attendingSkills: 'adequate',
   coop: 'with some pro',
   awarenessOfOthers: 'poor',
   prognosisForICF: 'unfavorable',
   responseRate: 'appropriate',
   socialInteractions: 'withdrawn',
   reliabilityOfScores: 'questionable',
   levelOfActivity: 'active',
   communicativeIntent: 'present',
   awarenessOfEnvironmentalEvents: 'moderately',
};

export const treatmentDocumentationSlice = createSlice({
   name: 'treatmentDocumentation',
   initialState,
   reducers: {
      setGeneralInfo: (
         state,
         action: PayloadAction<{
            field: keyof Omit<TreatmentDocumentationState, 'developmentalHistory'>;
            value: string | number;
         }>,
      ) => {
         const { field, value } = action.payload;
         if (typeof state[field] === 'number') {
            (state[field] as unknown) = Number(value);
         } else {
            (state[field] as unknown) = String(value);
         }
      },

      updateDevelopmentalHistory: (
         state,
         action: PayloadAction<{
            field: keyof DevelopmentalHistory;
            value: string | boolean;
         }>,
      ) => {
         const { field, value } = action.payload;
         if (typeof state.developmentalHistory[field] === 'boolean') {
            (state.developmentalHistory[field] as unknown) = Boolean(value);
         } else {
            (state.developmentalHistory[field] as unknown) = String(value);
         }
      },

      resetTreatmentDocumentation: () => initialState,
   },
});

export const { setGeneralInfo, updateDevelopmentalHistory, resetTreatmentDocumentation } =
   treatmentDocumentationSlice.actions;

export default treatmentDocumentationSlice.reducer;
