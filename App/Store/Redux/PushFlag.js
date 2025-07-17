import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PushFlag = createSlice({
  name: 'PushFlag',
  initialState: {
    data: false
  },
  reducers: {
    setPushFlag(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   REDUX MAP LOC      ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = false;
      }
    }
  }
});
export const { setPushFlag } = PushFlag.actions;
export default PushFlag.reducer;
