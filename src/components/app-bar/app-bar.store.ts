import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { type RootState } from '../../store';
import { type IAppbarSlice } from './types';

const initialState: IAppbarSlice = {
   isDrawer: false,
};

export const appbarSlice = createSlice({
   name: 'appbarSlice',
   initialState,
   reducers: {
      handleDrawer: (state, action: PayloadAction<boolean>) => {
         return {
            ...state,
            isDrawer: action.payload,
         };
      },
   },
});

export const { handleDrawer } = appbarSlice.actions;

export const appbarState = (state: RootState) => state.appbar;
