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
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage

const FIREBASE_API_KEY = 'AIzaSyCOiGd5NoRwoBr6Hn6EDZl7ISjdMsSP5LM';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({}); // Track errors

  // Validation function
  const validate = () => {
    const tempErrors = {}; // Temporary error holder
    if (!name.trim()) tempErrors.name = 'Name is required';
    if (!email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Invalid email format';
    if (!password) tempErrors.password = 'Password is required';
    else if (password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) tempErrors.confirmPassword = 'Please confirm password';
    else if (confirmPassword !== password)
      tempErrors.confirmPassword = 'Passwords do not match';
    
    // If there are no errors, return true
    setErrors(tempErrors); // Update errors state
    return Object.keys(tempErrors).length === 0;
  };

  // Handle signup process
  const handleSignup = async () => {
    if (!validate()) return; // If validation fails, stop

    try {
      // Step 1: Create account
      const signUpRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
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

      const signUpData = await signUpRes.json();

      if (signUpData.error) {
        const errorCode = signUpData.error.message;
        if (errorCode === 'EMAIL_EXISTS') {
          Alert.alert('Account Exists', 'This email is already registered.');
        } else if (errorCode === 'INVALID_EMAIL') {
          Alert.alert('Invalid Email', 'Please enter a valid email.');
        } else if (errorCode === 'WEAK_PASSWORD') {
          Alert.alert('Weak Password', 'Password should be at least 6 characters.');
        } else {
          Alert.alert('Signup Error', errorCode);
        }
        return;
      }

      const idToken = signUpData.idToken;

      // Step 2: Save user's display name
      const updateRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken,
            displayName: name.trim(),
            returnSecureToken: true,
          }),
        }
      );

      const updateData = await updateRes.json();

      if (updateData.error) {
        Alert.alert('Name Save Error', updateData.error.message);
        return;
      }

      // Step 3: Save user data in AsyncStorage
      await AsyncStorage.setItem('userToken', idToken); // Save Firebase token
      await AsyncStorage.setItem('userName', name.trim()); // Save display name
      await AsyncStorage.setItem('userEmail', email.trim()); // Save email

      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Login');
    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>

          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            error={errors.name} // Pass error message to InputField
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email} // Pass error message to InputField
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password} // Pass error message to InputField
          />

          <InputField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword} // Pass error message to InputField
          />

          <Button title="Create Account" onPress={handleSignup} style={styles.button} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text
            style={styles.footerLink}
            onPress={() => navigation.replace('Login')}
          >
            Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  button: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    color: '#2e86de',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default Signup;
