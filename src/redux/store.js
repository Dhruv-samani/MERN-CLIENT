import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./features/authSlice"
import profileSlice from './features/profileSlice';
import TourSlice from './features/tourSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    profile: profileSlice,
    tour: TourSlice,
  },
});
