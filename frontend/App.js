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
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

function AppContent() {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'auto'} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  useEffect(() => {
    // Load user data from AsyncStorage on app start
    store.dispatch(loadUserFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}
