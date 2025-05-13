/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Documentation {
   title: string;
}

interface Diagnosis {
   code: number;
   title: string;
}

interface Documents {
   title: string;
}

interface Task {
   done: boolean;
   title: string;
}

interface PatientHistoryState {
   documentation: Documentation[];
   diagnosis: Diagnosis[];
   documents: Documents[];
   tasks: Task[];
}

const initialState: PatientHistoryState = {
   documentation: [],
   diagnosis: [],
   documents: [],
   tasks: [],
};

type HistoryType = 'documentation' | 'diagnosis' | 'documents' | 'tasks';

interface AddInfPayload {
   type: HistoryType;
   data: any;
}

export const patientHistorySlice = createSlice({
   name: 'patientHistory',
   initialState,
   reducers: {
      toggleDoneTask: (state, action: PayloadAction<number>) => {
         const index = action.payload;
         if (state.tasks[index]) {
            state.tasks[index].done = !state.tasks[index].done;
         }
      },
      addInfForHistory: (state, action: PayloadAction<AddInfPayload>) => {
         const { type, data } = action.payload;
         state[type].push(data);
      },
   },
});

export const { addInfForHistory, toggleDoneTask } = patientHistorySlice.actions;
export default patientHistorySlice.reducer;
