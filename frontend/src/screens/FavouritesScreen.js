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
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFromFavourites } from '../store/tipsSlice';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ec4899', '#f43f5e', '#ef4444']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>My Favourites ❤️</Text>
        <Text style={styles.subtitle}>
          {favourites.length} {favourites.length === 1 ? 'tip' : 'tips'} saved
        </Text>
      </LinearGradient>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 6,
    fontWeight: '500',
  },
  listContainer: {
    padding: 18,
    paddingTop: 20,
  },
  listContainerEmpty: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 14,
  },
  cardImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: '#fce7f3',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#ec4899',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 19,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginLeft: 12,
  },
  metaText: {
    marginLeft: 5,
    color: '#6b7280',
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fee2e2',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    fontWeight: '500',
  },
  exploreButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
