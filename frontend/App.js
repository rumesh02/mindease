/**
 * MindEase - Health & Wellness App
 * Main App Entry Point
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { loadUserFromStorage } from './src/store/authSlice';

export default function App() {
  useEffect(() => {
    // Load user data from AsyncStorage on app start
    store.dispatch(loadUserFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppNavigator />
    </Provider>
  );
}
