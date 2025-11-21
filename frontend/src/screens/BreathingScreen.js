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
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const INHALE_DURATION = 5000; // 5 seconds
const EXHALE_DURATION = 5000; // 5 seconds
const HOLD_DURATION = 2000; // 2 seconds

export default function BreathingScreen() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [countdown, setCountdown] = useState(5);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

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

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.phaseText}>{getPhaseText()}</Text>
          <Text style={styles.instructionText}>{getPhaseInstruction()}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={() => setIsActive(!isActive)}
        >
          <Feather name={isActive ? 'pause' : 'play'} size={24} color="#fff" />
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        {isActive && (
          <TouchableOpacity style={styles.stopButton} onPress={() => setIsActive(false)}>
            <Feather name="square" size={20} color="#ef4444" />
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Feather name="info" size={20} color="#6366f1" />
          <Text style={styles.infoText}>
            This exercise uses a 5-5-5 pattern: Inhale for 5 seconds, hold for 2, and exhale for 5
            seconds. Practice for at least 5 minutes daily for best results.
          </Text>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Benefits:</Text>
          <View style={styles.benefit}>
            <Feather name="check" size={16} color="#10b981" />
            <Text style={styles.benefitText}>Reduces stress and anxiety</Text>
          </View>
          <View style={styles.benefit}>
            <Feather name="check" size={16} color="#10b981" />
            <Text style={styles.benefitText}>Lowers heart rate and blood pressure</Text>
          </View>
          <View style={styles.benefit}>
            <Feather name="check" size={16} color="#10b981" />
            <Text style={styles.benefitText}>Improves focus and mental clarity</Text>
          </View>
        </View>
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
});
