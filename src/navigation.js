import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../src/screens/Login';
import Signup from '../src/screens/Signup';
import TabNavigator from './TabNavigator';
import CreateTask from '../src/screens/CreateTask';
import Home from '../src/screens/Home';  // Import Home screen here

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="CreateTask" component={CreateTask} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;
