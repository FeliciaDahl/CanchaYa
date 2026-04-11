import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourtsState } from '../../types';

const initialState: CourtsState = {
  courts: [],
  selectedCourt: null,
  loading: false,
  error: null,
  userLocation: null,
};

const courtsSlice = createSlice({
  name: 'courts',
  initialState,
  reducers: {
    fetchCourtStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCourtSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.courts = action.payload;
    },
    fetchCourtFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectCourt: (state, action: PayloadAction<any>) => {
      state.selectedCourt = action.payload;
    },
    clearSelectedCourt: (state) => {
      state.selectedCourt = null;
    },
    setUserLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.userLocation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCourtStart,
  fetchCourtSuccess,
  fetchCourtFailure,
  selectCourt,
  clearSelectedCourt,
  setUserLocation,
  clearError,
} = courtsSlice.actions;

export default courtsSlice.reducer;
