import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Home') {
            icon = require('../src/images/home.png');
          } else if (route.name === 'Profile') {
            icon = require('../src/images/profile.png');
          }

          return (
            <Image
              source={icon}
              style={[
                styles.icon,
                { tintColor: focused ? '#2e86de' : '#999' },
              ]}
              resizeMode="contain"
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default TabNavigator;
