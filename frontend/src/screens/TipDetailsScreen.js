/**
 * Tip Details Screen
 * Shows full details of a wellness tip with favourite functionality
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, removeFromFavourites } from '../store/tipsSlice';
import { Feather } from '@expo/vector-icons';

export default function TipDetailsScreen({ route }) {
  const { tip } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.tips);

  const isFavourite = favourites.some((fav) => fav.id === tip.id);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites({ tipId: tip.id, userId: user.id }));
      Alert.alert('Removed', 'Removed from favourites');
    } else {
      dispatch(addToFavourites({ userId: user.id, tipId: tip.id, tipData: tip }));
      Alert.alert('Added', 'Added to favourites');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: tip.image }} style={styles.headerImage} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{tip.category}</Text>
            </View>
            <View style={styles.metaContainer}>
              <Feather name="clock" size={14} color="#666" />
              <Text style={styles.metaText}>{tip.duration}</Text>
              <Feather name="activity" size={14} color="#666" style={styles.metaIcon} />
              <Text style={styles.metaText}>{tip.difficulty}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.favouriteButton, isFavourite && styles.favouriteButtonActive]}
            onPress={handleToggleFavourite}
          >
            <Feather
              name={isFavourite ? 'heart' : 'heart'}
              size={24}
              color={isFavourite ? '#fff' : '#6366f1'}
              fill={isFavourite ? '#fff' : 'none'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.description}>{tip.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Full Details</Text>
        <Text style={styles.fullContent}>{tip.fullContent}</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Feather name="check-circle" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Mark as Completed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#e5e7eb',
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  headerLeft: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: '#7c3aed',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginLeft: 16,
  },
  metaText: {
    marginLeft: 6,
    color: '#6b7280',
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  favouriteButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  favouriteButtonActive: {
    backgroundColor: '#6366f1',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 38,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 17,
    color: '#6b7280',
    lineHeight: 26,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  fullContent: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 26,
    marginBottom: 28,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
});
