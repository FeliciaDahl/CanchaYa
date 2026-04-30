import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourtsState } from '../../types';

const initialState: CourtsState = {
  courts: [],
  selectedCourt: null,
  loading: false,
  error: null,
  userLocation: null,
};

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    fetchFacilitiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFacilitiesSuccess: (state, action: PayloadAction<any[]>) => {
      state.courts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFacilitiesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedFacility: (state, action: PayloadAction<any>) => {
      state.selectedCourt = action.payload;
    },
    setUserLocation: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.userLocation = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchFacilitiesStart,
  fetchFacilitiesSuccess,
  fetchFacilitiesFailure,
  setSelectedFacility,
  setUserLocation,
  clearError,
} = facilitiesSlice.actions;

export default facilitiesSlice.reducer;
