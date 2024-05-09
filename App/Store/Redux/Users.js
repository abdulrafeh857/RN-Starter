/* eslint-disable semi */
import { createSlice } from '@reduxjs/toolkit';
const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    data: false
  },
  reducers: {
    setLoginSlice(state, action) {
      if (action.payload) {
        console.debug('\n\n\n setLoginSlice PAYLOAD', action.payload);
        state.data = action.payload;
      } else {
        state.data = false;
      }
    }
  }
});
export const { setLoginSlice } = LoginSlice.actions;
export default LoginSlice.reducer;
