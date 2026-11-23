import { configureStore } from '@reduxjs/toolkit';
import addressesReducer from './addressesSlice';

export const store = configureStore({
  reducer: { addresses: addressesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
