import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard, Place } from './src/screens';
import Tabs from './src/navigation/Tabs'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Dashboard'}
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
        />

        <Stack.Screen
          name="Place"
          component={Place}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return <App />;
}
