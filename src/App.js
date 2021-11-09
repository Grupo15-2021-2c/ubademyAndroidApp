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
import UserScreen from './screens/UserScreen';
import MyCourses from './screens/MyCourses';
import EditableCourse from './screens/EditableCourse';
import Enrolled from './screens/Enrolled';
import Courses from './screens/readOnly/Courses';
import CourseView from './screens/readOnly/CourseView';
import ListSections from './screens/ListSections';
import EditSections from './screens/EditSections';
import SectionsView from './screens/SectionsView';
import SectionView from './screens/SectionView';
import CourseCreation from './screens/creat/CourseCreationView';
import {SectionCreation} from './screens/SectionCreationView';

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
          name="Home"
          component={Home}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="My Courses"
          component={MyCourses}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Creat Course"
          component={CourseCreation}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Creat Section"
          component={SectionCreation}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="List Sections"
          component={ListSections}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Edit Sections"
          component={EditSections}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Editable Course"
          component={EditableCourse}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Enrolled"
          component={Enrolled}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="User Screen"
          component={UserScreen}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Course View"
          component={CourseView}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Sections View"
          component={SectionsView}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Section View"
          component={SectionView}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
