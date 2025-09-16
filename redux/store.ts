import { configureStore } from '@reduxjs/toolkit';
import listSlice from './listSlice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    list: listSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()