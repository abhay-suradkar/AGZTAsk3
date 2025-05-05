import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserData({ name: name || 'No Name', email });
        } else {
          setError('No logged-in user found.');
        }
      } catch (e) {
        console.error('Error reading profile data:', e);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.multiRemove(['userToken','userEmail','userName']);
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2e86de" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.userContainer}>
        <Image source={require('../images/user.png')} style={styles.user} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.info}>Name: {userData.name}</Text>
        <Text style={styles.info}>Email: {userData.email}</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex:1, justifyContent:'center', alignItems:'center' },
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    height: 80,
    backgroundColor: '#2e86de',
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 20,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  userContainer: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  user: { width: 100, height:100, borderRadius:50 },
  detailsContainer: { paddingHorizontal: 20 },
  info: {
    fontSize: 18,
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  buttonContainer: { marginTop: 30 },
  button: {
    backgroundColor: '#2e86de',
    color: 'white',
    paddingVertical: 12,
    textAlign: 'center',
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: { color:'red', fontSize:16 },
});

export default Profile;
