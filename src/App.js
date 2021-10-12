/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import SignIn from './screens/SignInScreen';
import SignUp from './screens/SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/HomeScreen';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
