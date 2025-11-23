/**
 * Nutrition Screen
 * Allows users to search for food items and view nutritional information
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { fetchNutritionInfo } from '../services/api';

export default function NutritionScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a food item to search');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    const result = await fetchNutritionInfo(searchQuery);

    if (result.success && result.data.length > 0) {
      setNutritionData(result.data);
      setError(null);
    } else {
      setNutritionData([]);
      setError('No nutrition information found. Try a different food item.');
    }

    setLoading(false);
  };

  const renderNutritionCard = (item, index) => {
    // Helper function to safely format numbers
    const formatValue = (value, decimals = 1) => {
      return value != null ? Number(value).toFixed(decimals) : '0';
    };

    return (
      <View key={index} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.cardHeader}>
          <Feather name="info" size={24} color="#6366f1" />
          <Text style={[styles.foodName, { color: theme.colors.text }]}>
            {item.name?.charAt(0).toUpperCase() + item.name?.slice(1) || 'Unknown'}
          </Text>
        </View>

        <View style={styles.servingInfo}>
          <Text style={[styles.servingText, { color: theme.colors.textLight }]}>
            Serving: {formatValue(item.serving_size_g, 0)}g
          </Text>
        </View>

        <View style={styles.macrosContainer}>
          <View style={[styles.macroCard, { backgroundColor: '#fce7f3' }]}>
            <Feather name="activity" size={20} color="#ec4899" />
            <Text style={styles.macroValue}>{formatValue(item.carbohydrates_total_g)}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>

          <View style={[styles.macroCard, { backgroundColor: '#dcfce7' }]}>
            <Feather name="circle" size={20} color="#22c55e" />
            <Text style={styles.macroValue}>{formatValue(item.fat_total_g)}g</Text>
            <Text style={styles.macroLabel}>Fat</Text>
          </View>

          <View style={[styles.macroCard, { backgroundColor: '#fef3c7' }]}>
            <Feather name="sun" size={20} color="#f59e0b" />
            <Text style={styles.macroValue}>{formatValue(item.sugar_g)}g</Text>
            <Text style={styles.macroLabel}>Sugar</Text>
          </View>

          <View style={[styles.macroCard, { backgroundColor: '#dbeafe' }]}>
            <Feather name="layers" size={20} color="#3b82f6" />
            <Text style={styles.macroValue}>{formatValue(item.fiber_g)}g</Text>
            <Text style={styles.macroLabel}>Fiber</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Serving Size</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatValue(item.serving_size_g, 0)}g</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Sodium</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatValue(item.sodium_mg, 0)}mg</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Potassium</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatValue(item.potassium_mg, 0)}mg</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Cholesterol</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatValue(item.cholesterol_mg, 0)}mg</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textLight }]}>Saturated Fat</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{formatValue(item.fat_saturated_g)}g</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Feather name="pie-chart" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Nutrition Tracker</Text>
          <Text style={styles.headerSubtitle}>Search for any food item</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.surface }]}>
            <Feather name="search" size={20} color={theme.colors.textLight} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="e.g., apple, chicken breast, rice..."
              placeholderTextColor={theme.colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>

          <TouchableOpacity
            style={[styles.searchButton, loading && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? ['#9ca3af', '#6b7280'] : ['#6366f1', '#8b5cf6']}
              style={styles.searchButtonGradient}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Feather name="search" size={20} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={[styles.loadingText, { color: theme.colors.textLight }]}>
                Fetching nutrition data...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.centerContainer}>
              <Feather name="alert-circle" size={48} color="#ef4444" />
              <Text style={[styles.errorText, { color: theme.colors.text }]}>{error}</Text>
              <Text style={[styles.errorHint, { color: theme.colors.textLight }]}>
                Try searching for common foods like "banana", "rice", or "chicken"
              </Text>
            </View>
          ) : nutritionData.length > 0 ? (
            <>
              <View style={styles.resultsHeader}>
                <Feather name="check-circle" size={20} color="#22c55e" />
                <Text style={[styles.resultsHeaderText, { color: theme.colors.text }]}>
                  Found {nutritionData.length} result{nutritionData.length > 1 ? 's' : ''}
                </Text>
              </View>
              {nutritionData.map(renderNutritionCard)}
            </>
          ) : hasSearched ? (
            <View style={styles.centerContainer}>
              <Feather name="inbox" size={48} color={theme.colors.textLight} />
              <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
                No results found
              </Text>
            </View>
          ) : (
            <View style={styles.centerContainer}>
              <Feather name="compass" size={64} color={theme.colors.textLight} />
              <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
                Search for nutritional information
              </Text>
              <Text style={[styles.welcomeSubtext, { color: theme.colors.textLight }]}>
                Get detailed nutrition facts for any food item
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 4,
  },
  keyboardView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  resultsHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  errorHint: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
  },
  welcomeSubtext: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  foodName: {
    fontSize: 22,
    fontWeight: '700',
  },
  servingInfo: {
    marginBottom: 20,
  },
  servingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  macroCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4b5563',
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
