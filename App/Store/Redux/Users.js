import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '@Redux'
import { fetchUsers as fetch, USER_DATA } from '@Api/Users'
