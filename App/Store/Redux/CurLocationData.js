import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const CurLocationData = createSlice({
  name: 'CurLocationData',
  initialState: {
    data: {}
  },
  reducers: {
    setCurLocationData(state, action) {
      if (action.payload) {
        // console.debug('\n\n\n\n\n   REDUX MAP LOC data location      ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setCurLocationData } = CurLocationData.actions;
export default CurLocationData.reducer;
