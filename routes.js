import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import App from './Start';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#F0F0F5'
          }
        }}
      >
        <AppStack.Screen name="Home" component={App} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;