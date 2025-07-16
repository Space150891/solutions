import { configureStore, combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { appbarSlice } from '../components/app-bar/app-bar.store';
import patientHistoryReducer from './slices/patientHistorySlice';
import treatmentDocumentationReducer from './slices/treatmentDocumentationSlice';
import treatmentPlanningReducer from './slices/treatmentPlanningSlice';
import personnelReducer from './slices/personnelSlice';
import patientReducer from './slices/patientSlice';
import caseManagementReducer from './slices/caseManagementSlice';

const rootReducer = combineReducers({
   appbar: appbarSlice.reducer,
   patientHistory: patientHistoryReducer,
   treatmentDocumentation: treatmentDocumentationReducer,
   treatmentPlanning: treatmentPlanningReducer,
   personnel: personnelReducer,
   patients: patientReducer,
   caseManagement: caseManagementReducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;

export default store;
