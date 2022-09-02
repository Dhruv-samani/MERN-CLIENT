import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from "./features/authSlice"
import TourSlice from './features/tourSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourSlice,
  },
});
