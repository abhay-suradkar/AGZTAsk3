import React from "react";
import {} from 'react-native';
import AppNavigation from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return(
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};
export default App;