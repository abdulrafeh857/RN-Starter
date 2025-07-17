import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const IsLoggedIn = createSlice({
  name: 'IsLoggedIn',
  initialState: {
    data: false
  },
  reducers: {
    setIsLoggedIn(state, action) {
      if (action.payload) {
        console.debug('\n\n\n\n\n   REDUX MAP LOC      ', action?.payload);

        state.data = action.payload;
      } else {
        state.data = false;
      }
    }
  }
});
export const { setIsLoggedIn } = IsLoggedIn.actions;
export default IsLoggedIn.reducer;
