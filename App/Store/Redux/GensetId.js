import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const GensetId = createSlice({
  name: 'GensetId',
  initialState: {
    data: ''
  },
  reducers: {
    setGensetId(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   GensetId payload     ', action?.payload);
        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setGensetId } = GensetId.actions;
export default GensetId.reducer;
