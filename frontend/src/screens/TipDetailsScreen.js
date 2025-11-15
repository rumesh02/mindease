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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#e5e7eb',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginLeft: 15,
  },
  metaText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  favouriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favouriteButtonActive: {
    backgroundColor: '#6366f1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  fullContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 25,
  },
  actionButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
