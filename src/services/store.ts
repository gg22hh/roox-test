import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { usersReducer } from "./slices/Users";

const rootReducer = combineReducers({
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;