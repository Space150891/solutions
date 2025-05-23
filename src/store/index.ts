import { configureStore, combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { appbarSlice } from '../components/app-bar/app-bar.store';
import patientHistoryReducer from './slices/patientHistorySlice';
import treatmentDocumentationReducer from './slices/treatmentDocumentationSlice';
import personnelReducer from './slices/personnelSlice';
import patientReducer from './slices/patientSlice';

const rootReducer = combineReducers({
   appbar: appbarSlice.reducer,
   patientHistory: patientHistoryReducer,
   treatmentDocumentation: treatmentDocumentationReducer,
   personnel: personnelReducer,
   patients: patientReducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
