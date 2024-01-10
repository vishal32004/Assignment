import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slices/userSlice';
import authReducer from '../Slices/authSlice';
import notificationReducer from '../Slices/notificationSlice';
import { axiosMiddleware } from '../api/middleware';
import adminReducer from '../Slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: adminReducer,
    user: userReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;