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
import {ViewResources} from './screens/ViewResourses';
import {resourceView} from './screens/ResourceView';
import {EditableSection} from './screens/EditableSection';
import {EditableResources} from './screens/editable/EditResources';
import {AddImage} from './screens/AddImageView';
import {EditCourse} from './screens/editable/EditCourseView';
import {EditSection} from './screens/editable/EditSectionView';
import {EditUser} from './screens/editable/EditUserView';
import {AddPdf} from './screens/creat/AddPdfView';
import {MyCourseExams} from './screens/editable/myCourseExames';
import {CreatExam} from './screens/creat/CreatExam';
import {EditExam} from './screens/editable/EditExam';
import {AnswerExam} from './screens/exams/AnswerExam';
import {ListExams} from './screens/readOnly/ListExams';

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
          name="CreatExam"
          component={CreatExam}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="EditExam"
          component={EditExam}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="AnswerExam"
          component={AnswerExam}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="ListExams"
          component={ListExams}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Add Pdf"
          component={AddPdf}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="MyCourseExams"
          component={MyCourseExams}
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
          name="View Resources"
          component={ViewResources}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Resource view"
          component={resourceView}
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
          name="Editable section"
          component={EditableSection}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Edit User"
          component={EditUser}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Editable resources"
          component={EditableResources}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Edit section"
          component={EditSection}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Edit course"
          component={EditCourse}
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
          name="Add image"
          component={AddImage}
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
