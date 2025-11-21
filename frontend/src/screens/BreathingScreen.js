/**
 * Breathing Exercise Screen
 * Interactive breathing exercise with animation and timer
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';

const INHALE_DURATION = 5000; // 5 seconds
const EXHALE_DURATION = 5000; // 5 seconds
const HOLD_DURATION = 2000; // 2 seconds
const STORAGE_KEY = '@breathing_records';

export default function BreathingScreen() {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [countdown, setCountdown] = useState(5);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [records, setRecords] = useState([]);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  // Load records on mount
  useEffect(() => {
    loadRecords();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isActive && sessionStartTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, sessionStartTime]);

  useEffect(() => {
    let interval;
    let phaseTimer;

    if (isActive) {
      startBreathingCycle();
    } else {
      // Reset to initial state
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      setPhase('ready');
    }

    return () => {
      if (interval) clearInterval(interval);
      if (phaseTimer) clearTimeout(phaseTimer);
    };
  }, [isActive]);

  const startBreathingCycle = () => {
    // Inhale phase
    setPhase('inhale');
    setCountdown(5);
    animateInhale();

    const inhaleTimer = setTimeout(() => {
      // Hold phase
      setPhase('hold');
      setCountdown(2);

      const holdTimer = setTimeout(() => {
        // Exhale phase
        setPhase('exhale');
        setCountdown(5);
        animateExhale();

        const exhaleTimer = setTimeout(() => {
          // Restart cycle
          if (isActive) {
            startBreathingCycle();
          }
        }, EXHALE_DURATION);
      }, HOLD_DURATION);
    }, INHALE_DURATION);
  };

  const animateInhale = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: INHALE_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: INHALE_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateExhale = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: EXHALE_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.5,
        duration: EXHALE_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready to Begin';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Slowly inhale through your nose';
      case 'hold':
        return 'Hold your breath gently';
      case 'exhale':
        return 'Slowly exhale through your mouth';
      default:
        return 'Tap the button below to start';
    }
  };

  const loadRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedRecords) {
        setRecords(JSON.parse(storedRecords));
      }
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const saveRecord = async (duration) => {
    try {
      const newRecord = {
        id: Date.now().toString(),
        duration,
        date: new Date().toISOString(),
      };
      const updatedRecords = [newRecord, ...records].slice(0, 10); // Keep last 10 records
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
    } catch (error) {
      console.error('Error saving record:', error);
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setSessionStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleStop = () => {
    setIsActive(false);
    if (sessionStartTime) {
      const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
      if (duration > 0) {
        saveRecord(duration);
        Alert.alert(
          'Session Complete',
          `Great job! You practiced for ${formatTime(duration)}.`,
          [{ text: 'OK' }]
        );
      }
    }
    setSessionStartTime(null);
    setElapsedTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['#14b8a6', '#06b6d4', '#0ea5e9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Breathing Exercise 🌬️</Text>
        <Text style={styles.subtitle}>Find your calm with guided breathing</Text>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.breathingContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <View style={styles.circleInner}>
            <Feather name="wind" size={60} color="#fff" />
          </View>
        </Animated.View>

        <View style={styles.instructionContainer}>
          <Text style={[styles.phaseText, { color: theme.colors.text }]}>{getPhaseText()}</Text>
          <Text style={[styles.instructionText, { color: theme.colors.textLight }]}>{getPhaseInstruction()}</Text>
          {isActive && (
            <View style={[styles.timerContainer, { backgroundColor: theme.colors.surface }]}>
              <Feather name="clock" size={20} color="#14b8a6" />
              <Text style={[styles.timerText, { color: theme.colors.text }]}>{formatTime(elapsedTime)}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={isActive ? () => setIsActive(false) : handleStart}
        >
          <Feather name={isActive ? 'pause' : 'play'} size={24} color="#fff" />
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        {isActive && (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Feather name="square" size={20} color="#ef4444" />
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
          <Feather name="info" size={20} color="#6366f1" />
          <Text style={[styles.infoText, { color: theme.colors.textLight }]}>
            This exercise uses a 5-5-5 pattern: Inhale for 5 seconds, hold for 2, and exhale for 5
            seconds. Practice for at least 5 minutes daily for best results.
          </Text>
        </View>

        <View style={[styles.benefitsContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.benefitsTitle, { color: theme.colors.text }]}>Benefits:</Text>
          <View style={styles.benefit}>
            <Feather name="check" size={16} color="#10b981" />
            <Text style={[styles.benefitText, { color: theme.colors.textLight }]}>Reduces stress and anxiety</Text>
          </View>
          <View style={styles.benefit}>
            <Feather name="check" size={16} color="#10b981" />
            <Text style={[styles.benefitText, { color: theme.colors.textLight }]}>Lowers heart rate and blood pressure</Text>
          </View>
          <View style={styles.benefit}>
            <Feather name="check" size={16} color="#10b981" />
            <Text style={[styles.benefitText, { color: theme.colors.textLight }]}>Improves focus and mental clarity</Text>
          </View>
        </View>

        {records.length > 0 && (
          <View style={[styles.recordsContainer, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.recordsHeader}>
              <Feather name="bar-chart" size={20} color="#14b8a6" />
              <Text style={[styles.recordsTitle, { color: theme.colors.text }]}>Recent Sessions</Text>
            </View>
            {records.map((record) => (
              <View key={record.id} style={[styles.recordItem, { borderBottomColor: theme.colors.border, backgroundColor: theme.colors.background }]}>
                <View style={styles.recordLeft}>
                  <Feather name="activity" size={18} color="#14b8a6" />
                  <View style={styles.recordInfo}>
                    <Text style={[styles.recordDuration, { color: theme.colors.text }]}>{formatTime(record.duration)}</Text>
                    <Text style={[styles.recordDate, { color: theme.colors.textLight }]}>{formatDate(record.date)}</Text>
                  </View>
                </View>
                <View style={styles.recordBadge}>
                  <Text style={styles.recordBadgeText}>✓</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  breathingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#14b8a6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    elevation: 12,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  circleInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  instructionContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  phaseText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  instructionText: {
    fontSize: 17,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  timerText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#14b8a6',
    marginLeft: 10,
    letterSpacing: 1,
  },
  controls: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    backgroundColor: '#14b8a6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonActive: {
    backgroundColor: '#0d9488',
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '800',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
    backgroundColor: '#fff',
  },
  stopButtonText: {
    color: '#ef4444',
    fontSize: 17,
    fontWeight: '800',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  infoContainer: {
    padding: 24,
  },
  infoCard: {
    backgroundColor: '#dbeafe',
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    marginBottom: 20,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 22,
    fontWeight: '600',
  },
  benefitsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#4b5563',
    fontWeight: '600',
  },
  recordsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  recordsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#14b8a6',
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordInfo: {
    marginLeft: 12,
  },
  recordDuration: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  recordDate: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '600',
  },
  recordBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordBadgeText: {
    fontSize: 16,
    color: '#10b981',
  },
});
