/**
 * Favourites Screen
 * Displays user's saved favourite tips
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFromFavourites } from '../store/tipsSlice';
import { Feather } from '@expo/vector-icons';

export default function FavouritesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.tips);
  const { user } = useSelector((state) => state.auth);

  const handleRemoveFavourite = (tip) => {
    Alert.alert(
      'Remove Favourite',
      'Are you sure you want to remove this from favourites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFromFavourites({ tipId: tip.id, userId: user.id }));
          },
        },
      ]
    );
  };

  const renderFavouriteCard = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => navigation.navigate('Home', {
          screen: 'TipDetails',
          params: { tip: item },
        })}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.metaContainer}>
            <Feather name="clock" size={12} color="#666" />
            <Text style={styles.metaText}>{item.duration}</Text>
            <Feather name="activity" size={12} color="#666" style={styles.metaIcon} />
            <Text style={styles.metaText}>{item.difficulty}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavourite(item)}
      >
        <Feather name="x" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={80} color="#d1d5db" />
      <Text style={styles.emptyTitle}>No Favourites Yet</Text>
      <Text style={styles.emptyText}>
        Start exploring wellness tips and save your favourites here
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.exploreButtonText}>Explore Tips</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favourites</Text>
        <Text style={styles.subtitle}>
          {favourites.length} {favourites.length === 1 ? 'tip' : 'tips'} saved
        </Text>
      </View>

      <FlatList
        data={favourites}
        renderItem={renderFavouriteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          favourites.length === 0 && styles.listContainerEmpty,
        ]}
        ListEmptyComponent={renderEmptyState}
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
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 25,
  },
  title: {
    fontSize: 28,
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
  listContainerEmpty: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#6366f1',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginLeft: 10,
  },
  metaText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fee2e2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
