import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';

export type TInitialState = {
  isLoading: boolean,
  users: TUser[]
}

const initialState: TInitialState = {
  isLoading: false,
  users: [],
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error);
  }
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, {payload}) => {
      state.users = state.users.map(user => {
        if (user.id === payload.id) {
          return payload
        }
        return user
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.users = payload;
      });
  },
  selectors: {
    getUsersSelector: (state) => state.users,
    getIsLoading: (state) => state.isLoading
  }
});

export const { getUsersSelector, getIsLoading } = usersSlice.selectors;
export const { updateUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
