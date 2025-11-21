/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.tips);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  const MenuItem = ({ icon, title, value, onPress, color = '#333' }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Feather name={icon} size={20} color={color} />
        <Text style={[styles.menuItemTitle, { color }]}>{title}</Text>
      </View>
      {value ? (
        <Text style={styles.menuItemValue}>{value}</Text>
      ) : (
        <Feather name="chevron-right" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.avatarContainer}>
            <Feather name="user" size={50} color="#fff" />
          </View>
          <Text style={styles.username}>{user?.username} 👋</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Feather name="heart" size={24} color="#6366f1" />
          <Text style={styles.statNumber}>{favourites.length}</Text>
          <Text style={styles.statLabel}>Favourites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Feather name="activity" size={24} color="#10b981" />
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Feather name="award" size={24} color="#f59e0b" />
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Streak Days</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuContainer}>
          <MenuItem icon="user" title="Edit Profile" />
          <MenuItem icon="bell" title="Notifications" />
          <MenuItem icon="lock" title="Privacy & Security" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuContainer}>
          <MenuItem icon="moon" title="Dark Mode" value="Off" />
          <MenuItem icon="volume-2" title="Sound Effects" value="On" />
          <MenuItem icon="globe" title="Language" value="English" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuContainer}>
          <MenuItem icon="help-circle" title="Help & FAQ" />
          <MenuItem icon="info" title="About MindEase" />
          <MenuItem icon="mail" title="Contact Support" />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  username: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  email: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -35,
    borderRadius: 20,
    padding: 24,
    elevation: 6,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 6,
    fontWeight: '600',
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '600',
  },
  menuItemValue: {
    fontSize: 15,
    color: '#9ca3af',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fecaca',
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ef4444',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  version: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 32,
    marginBottom: 48,
    fontWeight: '600',
  },
});
