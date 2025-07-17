import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DashboardDetails = createSlice({
  name: 'DashboardDetails',
  initialState: {
    data: {}
  },
  reducers: {
    setDashboardDetails(state, action) {
      if (action.payload) {
        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setDashboardDetails } = DashboardDetails.actions;
export default DashboardDetails.reducer;
