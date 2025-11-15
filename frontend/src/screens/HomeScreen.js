/**
 * Home Screen
 * Displays wellness tips as scrollable cards
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTips, loadFavouritesFromStorage } from '../store/tipsSlice';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { allTips, loading } = useSelector((state) => state.tips);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTips());
    dispatch(loadFavouritesFromStorage());
  }, []);

  const handleRefresh = () => {
    dispatch(fetchTips());
  };

  const renderTipCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TipDetails', { tip: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <View style={styles.duration}>
            <Feather name="clock" size={12} color="#666" />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading wellness tips...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome back, {user?.username}!</Text>
        <Text style={styles.subtitle}>Discover your daily wellness tips</Text>
      </View>

      <FlatList
        data={allTips}
        renderItem={renderTipCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} colors={['#6366f1']} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  welcomeContainer: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e5e7eb',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyText: {
    marginLeft: 6,
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
