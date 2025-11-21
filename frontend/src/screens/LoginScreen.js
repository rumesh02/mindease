/**
 * Login Screen
 * User authentication screen with form validation
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/authSlice';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      dispatch(clearError());
    }
  }, [error]);

  const handleLogin = async (values) => {
    dispatch(login(values));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={styles.iconContainer}
            >
              <Feather name="heart" size={50} color="#fff" />
            </LinearGradient>
            <Text style={styles.title}>MindEase</Text>
            <Text style={styles.subtitle}>Your wellness companion 🧘‍♀️</Text>
          </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color="#6366f1" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#6366f1" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerLink}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111827',
    marginTop: 24,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#6b7280',
    marginTop: 10,
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    marginBottom: 10,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: '#f3f4f6',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#6366f1',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: '#6b7280',
    fontSize: 15,
    fontWeight: '500',
  },
  registerLink: {
    color: '#6366f1',
    fontSize: 15,
    fontWeight: '800',
  },
});
