import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const BatchId = createSlice({
  name: 'BatchId',
  initialState: {
    data: ''
  },
  reducers: {
    setBatchId(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   BatchId      ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = null;
      }
    }
  }
});
export const { setBatchId } = BatchId.actions;
export default BatchId.reducer;
