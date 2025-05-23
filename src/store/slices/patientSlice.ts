import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IManagePatient } from '../../pages/patient-management/mock';
import { managedPatients } from '../../pages/patient-management/mock';

export interface PatientState {
    patients: IManagePatient[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: PatientState = {
    patients: managedPatients,
    searchQuery: '',
    isLoading: false,
    error: null
};

export const patientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        addPatient: (state, action: PayloadAction<IManagePatient>) => {
            state.patients.push(action.payload);
        },
        removePatient: (state, action: PayloadAction<number | string>) => {
            state.patients = state.patients.filter(patient => patient.id !== action.payload);
        },
        updatePatient: (state, action: PayloadAction<IManagePatient>) => {
            const index = state.patients.findIndex(patient => patient.id === action.payload.id);
            if (index !== -1) {
                state.patients[index] = action.payload;
            }
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const {
    addPatient,
    removePatient,
    updatePatient,
    setSearchQuery,
    setLoading,
    setError
} = patientSlice.actions;

export default patientSlice.reducer;
