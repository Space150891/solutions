import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Case, CaseManagementState, InsuranceInfo } from './types/caseManagementTypes';
import { mockCases, mockInsurances } from '../../pages/case-management/mock';

const initialState: CaseManagementState = {
  cases: mockCases,
  currentCase: null,
  insurances: mockInsurances,
  isLoading: false,
  error: null,
  searchQuery: '',
  filterBy: {
    status: null,
    patientId: null,
    insuranceId: null,
  },
};

export const caseManagementSlice = createSlice({
  name: 'caseManagement',
  initialState,
  reducers: {
    // Case management actions
    setCases: (state, action: PayloadAction<Case[]>) => {
      state.cases = action.payload;
    },
    setCurrentCase: (state, action: PayloadAction<Case | null>) => {
      state.currentCase = action.payload;
    },
    addCase: (state, action: PayloadAction<Omit<Case, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newCase: Case = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.cases.push(newCase);
    },
    updateCase: (state, action: PayloadAction<Partial<Case> & { id: string }>) => {
      const index = state.cases.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cases[index] = {
          ...state.cases[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        
        // If this is the current case, update it too
        if (state.currentCase && state.currentCase.id === action.payload.id) {
          state.currentCase = {
            ...state.currentCase,
            ...action.payload,
            updatedAt: new Date().toISOString(),
          };
        }
      }
    },
    deleteCase: (state, action: PayloadAction<string>) => {
      state.cases = state.cases.filter(c => c.id !== action.payload);
      if (state.currentCase && state.currentCase.id === action.payload) {
        state.currentCase = null;
      }
    },
    
    // Insurance management actions
    setInsurances: (state, action: PayloadAction<InsuranceInfo[]>) => {
      state.insurances = action.payload;
    },
    addInsurance: (state, action: PayloadAction<Omit<InsuranceInfo, 'id'>>) => {
      const newInsurance: InsuranceInfo = {
        ...action.payload,
        id: uuidv4(),
      };
      state.insurances.push(newInsurance);
    },
    updateInsurance: (state, action: PayloadAction<Partial<InsuranceInfo> & { id: string }>) => {
      const index = state.insurances.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.insurances[index] = {
          ...state.insurances[index],
          ...action.payload,
        };
        
        // Update insurance info in cases
        state.cases = state.cases.map(c => {
          if (c.insuranceId === action.payload.id) {
            return {
              ...c,
              insuranceInfo: {
                ...state.insurances[index],
                ...action.payload,
              },
            };
          }
          return c;
        });
      }
    },
    deleteInsurance: (state, action: PayloadAction<string>) => {
      state.insurances = state.insurances.filter(i => i.id !== action.payload);
      
      // Remove insurance from cases
      state.cases = state.cases.map(c => {
        if (c.insuranceId === action.payload) {
          return {
            ...c,
            insuranceId: null,
            insuranceInfo: null,
          };
        }
        return c;
      });
    },
    
    // Filter and search actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<CaseManagementState['filterBy']>>) => {
      state.filterBy = {
        ...state.filterBy,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filterBy = {
        status: null,
        patientId: null,
        insuranceId: null,
      };
      state.searchQuery = '';
    },
    
    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCases,
  setCurrentCase,
  addCase,
  updateCase,
  deleteCase,
  setInsurances,
  addInsurance,
  updateInsurance,
  deleteInsurance,
  setSearchQuery,
  setFilter,
  clearFilters,
  setLoading,
  setError,
} = caseManagementSlice.actions;

export default caseManagementSlice.reducer; 