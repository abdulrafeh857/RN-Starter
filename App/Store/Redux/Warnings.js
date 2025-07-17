import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const Warnings = createSlice({
  name: 'Warnings',
  initialState: {
    data: {}
  },
  reducers: {
    setWarnings(state, action) {
      if (action.payload) {
        // console.debug('\n\n\n\n\n   REDUX MAP LOC      ',action?.payload);

        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setWarnings } = Warnings.actions;
export default Warnings.reducer;
