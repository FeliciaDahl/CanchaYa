import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courtsReducer from './slices/courtsSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courts: courtsReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
