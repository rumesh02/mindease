/**
 * Theme Context
 * Provides dark mode functionality across the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();
const THEME_STORAGE_KEY = '@theme_mode';

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = {
    isDarkMode,
    colors: {
      // Background colors
      background: isDarkMode ? '#111827' : '#f3f4f6',
      surface: isDarkMode ? '#1f2937' : '#ffffff',
      card: isDarkMode ? '#1f2937' : '#ffffff',
      
      // Text colors
      text: isDarkMode ? '#f9fafb' : '#111827',
      textLight: isDarkMode ? '#d1d5db' : '#6b7280',
      textSecondary: isDarkMode ? '#9ca3af' : '#9ca3af',
      
      // Primary colors
      primary: isDarkMode ? '#6366f1' : '#6366f1',
      primaryLight: isDarkMode ? '#818cf8' : '#8b5cf6',
      primaryDark: isDarkMode ? '#4f46e5' : '#4f46e5',
      
      // Accent colors
      accentTeal: isDarkMode ? '#14b8a6' : '#14b8a6',
      accentGreen: isDarkMode ? '#10b981' : '#10b981',
      accentRed: isDarkMode ? '#ef4444' : '#ef4444',
      accentPink: isDarkMode ? '#ec4899' : '#ec4899',
      
      // Border colors
      border: isDarkMode ? '#374151' : '#e5e7eb',
      borderLight: isDarkMode ? '#4b5563' : '#f3f4f6',
      
      // Badge colors
      badgeBackground: isDarkMode ? '#312e81' : '#ede9fe',
      badgeText: isDarkMode ? '#c7d2fe' : '#7c3aed',
      
      // Overlay
      overlay: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)',
      
      // Input
      inputBackground: isDarkMode ? '#374151' : '#f9fafb',
      inputBorder: isDarkMode ? '#4b5563' : '#e5e7eb',
      
      // Status bar
      statusBar: isDarkMode ? '#1f2937' : '#6366f1',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
