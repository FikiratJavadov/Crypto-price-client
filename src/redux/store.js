import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
