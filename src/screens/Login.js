// src/screens/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_API_KEY = 'AIzaSyCOiGd5NoRwoBr6Hn6EDZl7ISjdMsSP5LM';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });

  const validate = () => {
    const tempErrors = {};
    if (!email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      tempErrors.email = 'Invalid email format';
    if (!password) tempErrors.password = 'Password is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // handle error codes
        const msg = data.error.message;
        if (msg === 'EMAIL_NOT_FOUND') {
          Alert.alert('User Not Found', 'No account found with this email.');
        } else if (msg === 'INVALID_PASSWORD') {
          Alert.alert('Incorrect Password', 'Password is incorrect.');
        } else {
          Alert.alert('Login Failed', msg);
        }
        return;
      }

      // success! save token, name and email
      const { idToken, email: userEmail, displayName = '' } = data;
      await AsyncStorage.setItem('userToken', idToken);
      await AsyncStorage.setItem('userEmail', userEmail);
      await AsyncStorage.setItem('userName', displayName);

      Alert.alert('Welcome', `Hello, ${displayName || 'User'}!`);
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabNavigator' }],
      });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>

          <InputField
            label="Email"
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            onBlur={() => handleBlur('email')}
            keyboardType="email-address"
            error={errors.email}
            touched={touched.email}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => handleBlur('password')}
            secureTextEntry
            error={errors.password}
            touched={touched.password}
          />

          <Button title="Login" onPress={handleLogin} style={styles.button} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: { marginTop: 16 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: { fontSize: 14, color: '#666' },
  footerLink: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default Login;
