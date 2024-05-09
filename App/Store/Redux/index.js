/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import Users from './Users';

export const store = configureStore({
  reducer: { Users }
});
