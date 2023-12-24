import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import authReducer from "../Slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;