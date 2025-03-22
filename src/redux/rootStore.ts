import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Auth/AuthSlice";

const rootStore = configureStore({
  reducer: {
    user: userReducer
  }
})

export type IRootState = ReturnType<typeof rootStore.getState>
export default rootStore;
