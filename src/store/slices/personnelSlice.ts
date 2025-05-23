import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonnelState } from './types/personnelTypes';
import { IManagedDoctor, IManagedNurse, IManagedOther } from '../../pages/personnel-management/mock';
import { managedDoctors, managedNurses, managedOthers } from '../../pages/personnel-management/mock';

const initialState: PersonnelState = {
    doctors: managedDoctors,
    nurses: managedNurses,
    others: managedOthers,
    searchQuery: '',
    isLoading: false,
    error: null
};

export const personnelSlice = createSlice({
    name: 'personnel',
    initialState,
    reducers: {
        addDoctor: (state, action: PayloadAction<IManagedDoctor>) => {
            state.doctors.push(action.payload);
        },
        addNurse: (state, action: PayloadAction<IManagedNurse>) => {
            state.nurses.push(action.payload);
        },
        addOther: (state, action: PayloadAction<IManagedOther>) => {
            state.others.push(action.payload);
        },
        removePersonnel: (state, action: PayloadAction<{id: string, type: 'doctors' | 'nurses' | 'others'}>) => {
            const { id, type } = action.payload;
            if (type === 'doctors') {
                state.doctors = state.doctors.filter(person => person.id !== id);
            } else if (type === 'nurses') {
                state.nurses = state.nurses.filter(person => person.id !== id);
            } else if (type === 'others') {
                state.others = state.others.filter(person => person.id !== id);
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
    addDoctor,
    addNurse,
    addOther,
    removePersonnel,
    setSearchQuery,
    setLoading,
    setError
} = personnelSlice.actions;

export default personnelSlice.reducer;
