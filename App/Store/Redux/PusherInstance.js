import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PusherInstance = createSlice({
  name: 'PusherInstance',
  initialState: {
    data: {}
  },
  reducers: {
    setPusherInstance(state, action) {
      if (action.payload) {
        // console.debug('\n\n\n\n\n   REDUX MAP LOC      ',action?.payload);

        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setPusherInstance } = PusherInstance.actions;
export default PusherInstance.reducer;
