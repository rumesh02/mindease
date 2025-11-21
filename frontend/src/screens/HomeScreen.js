/**
 * Home Screen
 * Displays wellness tips as scrollable cards
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTips, loadFavouritesFromStorage } from '../store/tipsSlice';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { allTips, loading } = useSelector((state) => state.tips);
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchTips());
    dispatch(loadFavouritesFromStorage());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchTips());
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 135],
    extrapolate: 'clamp',
  });

  const welcomeOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const welcomeTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const appNameScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const renderTipCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate('TipDetails', { tip: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={[styles.badge, { backgroundColor: theme.colors.badgeBackground }]}>
            <Text style={[styles.badgeText, { color: theme.colors.badgeText }]}>{item.category}</Text>
          </View>
          <View style={[styles.duration, { backgroundColor: theme.colors.background }]}>
            <Feather name="clock" size={12} color={theme.colors.textLight} />
            <Text style={[styles.durationText, { color: theme.colors.textLight }]}>{item.duration}</Text>
          </View>
        </View>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
        <Text style={[styles.cardDescription, { color: theme.colors.textLight }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.difficultyContainer}>
            <Feather name="activity" size={14} color="#6366f1" />
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#6366f1" />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && allTips.length === 0) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={[styles.loadingText, { color: theme.colors.textLight }]}>Loading wellness tips...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.headerContent}>
              <Animated.View style={[styles.appNameContainer, { transform: [{ scale: appNameScale }] }]}>
                <View style={styles.logoCircle}>
                  <Feather name="heart" size={24} color="#fff" />
                </View>
                <Text style={styles.appName}>MindEase</Text>
              </Animated.View>
              
              <Animated.View 
                style={[
                  styles.welcomeSection,
                  { 
                    opacity: welcomeOpacity,
                    transform: [{ translateY: welcomeTranslateY }]
                  }
                ]}
              >
                <Text style={styles.welcomeText}>Welcome back, {user?.username}! 👋</Text>
                <Text style={styles.subtitle}>Discover your daily wellness tips</Text>
              </Animated.View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      <Animated.FlatList
        data={allTips}
        renderItem={renderTipCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={['#6366f1']} />
        }
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 16,
    color: '#6b7280',
    fontSize: 15,
    fontWeight: '500',
  },
  headerContainer: {
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  appNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  welcomeSection: {
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  listContainer: {
    padding: 18,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  cardContent: {
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#7c3aed',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  durationText: {
    marginLeft: 5,
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
    lineHeight: 28,
  },
  cardDescription: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyText: {
    marginLeft: 7,
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
