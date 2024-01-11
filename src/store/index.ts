import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cameraReducer from './cameraSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    camera: cameraReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
