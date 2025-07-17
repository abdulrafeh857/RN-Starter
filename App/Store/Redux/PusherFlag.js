import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PusherFlag = createSlice({
  name: 'PusherFlag',
  initialState: {
    data: false
  },
  reducers: {
    setPusherFlag(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   REDUX MAP LOC      ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = false;
      }
    }
  }
});
export const { setPusherFlag } = PusherFlag.actions;
export default PusherFlag.reducer;
