/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   PatientHistoryState,
   AddInfPayload,
   Task,
   HistoryType,
} from './types/patientHistoryTypes';

const initialState: PatientHistoryState = {
   documentation: [],
   diagnosis: [],
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
      clearHistory: (_state) => {
         return initialState;
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
   clearHistory,
} = patientHistorySlice.actions;

export default patientHistorySlice.reducer;
