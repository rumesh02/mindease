/**
 * Redux Store Configuration
 * Central state management for the app
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tipsReducer from './tipsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tips: tipsReducer,
  },
});

export default store;
