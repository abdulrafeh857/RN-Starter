import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DriverId = createSlice({
  name: 'DriverId',
  initialState: {
    data: ''
  },
  reducers: {
    setDriverId(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   DriverId Payload     ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setDriverId } = DriverId.actions;
export default DriverId.reducer;
