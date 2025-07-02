import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreatmentItem, TreatmentPhase, TreatmentPlan, sampleTreatmentPlan } from '../../pages/treatment-planning/mock';

// Define the state structure
export interface TreatmentPlanningState {
  currentPlan: TreatmentPlan | null;
  savedPlans: TreatmentPlan[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: TreatmentPlanningState = {
  currentPlan: null,
  savedPlans: [sampleTreatmentPlan],
  isLoading: false,
  error: null
};

// Create the slice
export const treatmentPlanningSlice = createSlice({
  name: 'treatmentPlanning',
  initialState,
  reducers: {
    // Set the current treatment plan
    setCurrentPlan: (state, action: PayloadAction<TreatmentPlan>) => {
      state.currentPlan = action.payload;
    },
    
    // Create a new empty treatment plan
    createPlan: (state, action: PayloadAction<TreatmentPlan>) => {
      state.currentPlan = action.payload;
    },
    
    // Add a new phase to the current plan
    addPhase: (state, action: PayloadAction<TreatmentPhase>) => {
      if (state.currentPlan) {
        state.currentPlan.phases.push(action.payload);
        state.currentPlan.updatedAt = new Date().toISOString();
      }
    },
    
    // Update a phase in the current plan
    updatePhase: (state, action: PayloadAction<{ phaseId: string, updates: Partial<TreatmentPhase> }>) => {
      if (state.currentPlan) {
        const { phaseId, updates } = action.payload;
        const phaseIndex = state.currentPlan.phases.findIndex(phase => phase.id === phaseId);
        
        if (phaseIndex !== -1) {
          state.currentPlan.phases[phaseIndex] = { 
            ...state.currentPlan.phases[phaseIndex], 
            ...updates 
          };
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },
    
    // Remove a phase from the current plan
    removePhase: (state, action: PayloadAction<string>) => {
      if (state.currentPlan) {
        const phaseId = action.payload;
        state.currentPlan.phases = state.currentPlan.phases.filter(phase => phase.id !== phaseId);
        state.currentPlan.updatedAt = new Date().toISOString();
      }
    },
    
    // Add a treatment item to a phase
    addTreatmentItem: (state, action: PayloadAction<{ phaseId: string, item: TreatmentItem, index?: number }>) => {
      if (state.currentPlan) {
        const { phaseId, item, index } = action.payload;
        const phaseIndex = state.currentPlan.phases.findIndex(phase => phase.id === phaseId);
        
        if (phaseIndex !== -1) {
          if (index !== undefined) {
            // Insert at specific index for drag and drop operations
            state.currentPlan.phases[phaseIndex].items.splice(index, 0, item);
          } else {
            // Default to push at the end
            state.currentPlan.phases[phaseIndex].items.push(item);
          }
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },
    
    // Remove a treatment item from a phase
    removeTreatmentItem: (state, action: PayloadAction<{ phaseId: string, itemId: string }>) => {
      if (state.currentPlan) {
        const { phaseId, itemId } = action.payload;
        const phaseIndex = state.currentPlan.phases.findIndex(phase => phase.id === phaseId);
        
        if (phaseIndex !== -1) {
          state.currentPlan.phases[phaseIndex].items = 
            state.currentPlan.phases[phaseIndex].items.filter(item => item.id !== itemId);
          state.currentPlan.updatedAt = new Date().toISOString();
        }
      }
    },
    
    // Save the current treatment plan
    savePlan: (state) => {
      if (state.currentPlan) {
        const existingIndex = state.savedPlans.findIndex(plan => plan.id === state.currentPlan?.id);
        
        if (existingIndex !== -1) {
          // Update existing plan
          state.savedPlans[existingIndex] = { ...state.currentPlan };
        } else {
          // Add new plan
          state.savedPlans.push({ ...state.currentPlan });
        }
      }
    },
    
    // Update plan details
    updatePlanDetails: (state, action: PayloadAction<Partial<TreatmentPlan>>) => {
      if (state.currentPlan) {
        state.currentPlan = {
          ...state.currentPlan,
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// Export actions
export const { 
  setCurrentPlan, 
  createPlan, 
  addPhase, 
  updatePhase, 
  removePhase,
  addTreatmentItem, 
  removeTreatmentItem, 
  savePlan, 
  updatePlanDetails,
  setLoading, 
  setError 
} = treatmentPlanningSlice.actions;

// Export reducer
export default treatmentPlanningSlice.reducer;
