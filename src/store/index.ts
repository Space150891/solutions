import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { appbarSlice } from '../components/app-bar/app-bar.store';

const rootReducer = combineReducers({
   appbar: appbarSlice.reducer,
   // causes: persistReducer(causesPersistConfig, causesSlice.reducer),
   // common: commonSlice.reducer,
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
