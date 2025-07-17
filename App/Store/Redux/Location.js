import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const Location = createSlice({
  name: 'Location',
  initialState: {
    data: {}
  },
  reducers: {
    setLocation(state, action) {
      if (action.payload) {
        // console.debug('\n\n\n\n\n   REDUX MAP LOC      ',action?.payload);

        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setLocation } = Location.actions;
export default Location.reducer;
