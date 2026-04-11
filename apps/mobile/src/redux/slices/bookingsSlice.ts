import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingsState } from '../../types';

const initialState: BookingsState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectBooking: (state, action: PayloadAction<any>) => {
      state.selectedBooking = action.payload;
    },
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
    addBooking: (state, action: PayloadAction<any>) => {
      state.bookings.unshift(action.payload);
    },
    updateBooking: (state, action: PayloadAction<any>) => {
      const index = state.bookings.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  selectBooking,
  clearSelectedBooking,
  addBooking,
  updateBooking,
  removeBooking,
  clearError,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;
