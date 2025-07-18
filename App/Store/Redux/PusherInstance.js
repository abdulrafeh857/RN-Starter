import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const PusherInstance = createSlice({
  name: 'PusherInstance',
  initialState: {
    connectionState: 'disconnected'
  },
  reducers: {
    setPusherInstance(state, action) {
      if (action.payload) {
        // Only store serializable data like connection state
        state.connectionState = action.payload.connectionState || 'connected';
      } else {
        state.connectionState = 'disconnected';
      }
    }
  }
});
export const { setPusherInstance } = PusherInstance.actions;
export default PusherInstance.reducer;
