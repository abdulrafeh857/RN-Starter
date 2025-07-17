import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const GenStatus = createSlice({
  name: 'GenStatus',
  initialState: {
    data: {}
  },
  reducers: {
    setGenStatus(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   REDUX MAP LOC GenStatus     ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = false;
      }
    }
  }
});
export const { setGenStatus } = GenStatus.actions;
export default GenStatus.reducer;
