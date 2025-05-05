import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({ route }) => {
  const { userData, setUserData } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ name: false, email: false });

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
  }, [userData]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name is required");
      setTouched(prev => ({ ...prev, name: true }));
      return;
    }

    try {
      const updatedUser = { name, email };
      await AsyncStorage.setItem(email, JSON.stringify(updatedUser));
      await AsyncStorage.setItem('user', JSON.stringify({ email })); 

      setUserData(updatedUser); 

      Alert.alert("Success", "Profile updated");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving user data", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.body}>
        <InputField
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          error={error}
          touched={touched.name}
        />

        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          editable={false}
          keyboardType="email-address"
          error=""
          touched={false}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 80,
    backgroundColor: '#2e86de',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#2e86de',
    padding: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfile;
