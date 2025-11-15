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
} from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathing Exercise</Text>
        <Text style={styles.subtitle}>Find your calm with guided breathing</Text>
      </View>

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
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  breathingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circleInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  phaseText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
  },
  buttonActive: {
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  stopButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#e0e7ff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: '#4338ca',
    lineHeight: 20,
  },
  benefitsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
});
