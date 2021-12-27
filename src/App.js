/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {Node} from 'react';
import SignIn from './screens/logIn/SignInScreen';
import SignUp from './screens/logIn/SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/HomeScreen';
import UserScreen from './screens/user/UserScreen';
import MyCourses from './screens/course/MyCourses';
import EditableCourse from './screens/course/EditableCourse';
import Enrolled from './screens/course/Enrolled';
import Courses from './screens/course/Courses';
import CourseView from './screens/course/CourseView';
import EditSections from './screens/sections/EditSections';
import SectionsView from './screens/sections/SectionsView';
import SectionView from './screens/sections/SectionView';
import CourseCreation from './screens/course/CourseCreationView';
import {SectionCreation} from './screens/sections/SectionCreationView';
import {ViewResources} from './screens/resources/ViewResourses';
import {resourceView} from './screens/resources/ResourceView';
import {EditableSection} from './screens/sections/EditableSection';
import {EditableResources} from './screens/resources/EditResources';
import {AddImage} from './screens/resources/AddImageView';
import {EditCourse} from './screens/course/EditCourseView';
import {EditSection} from './screens/sections/EditSectionView';
import {EditUser} from './screens/user/EditUserView';
import {AddPdf} from './screens/resources/AddPdfView';
import {MyCourseExams} from './screens/exams/myCourseExames';
import {CreatExam} from './screens/exams/CreatExam';
import {EditExam} from './screens/exams/EditExam';
import {AnswerExam} from './screens/exams/AnswerExam';
import {ListExams} from './screens/exams/ListExams';
import {Messages} from './screens/messages/Messages';
import {Chat} from './screens/messages/Chat';
import {CourseBySubscriptionType} from './screens/course/CourseBySubscriptionType';
import {CourseByCategory} from './screens/course/CourseByCategory';
import {StudentsExams} from './screens/exams/studentsExams';
import {PublishedExams} from './screens/exams/PublishedExams';
import {ScoreExam} from './screens/exams/ScoreExam';
import messaging from '@react-native-firebase/messaging';
import showToast from './components/ToastUtilities';
import {Alert} from 'react-native';
import {loadedUserId} from './api/Storage';
import {Icon} from 'react-native-elements';
import {AppointCollaborators} from './screens/course/appointCollaborators';
import {AddCollaborator} from './screens/course/addCollaborator';
import {Mycollaborations} from './screens/course/myCollaborations';
import {PaymentsInfo} from './screens/user/paymentsInfo';

const Stack = createStackNavigator();

const App: () => Node = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showToast('New message from ' + remoteMessage.data.name);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  console.log('Already in home screen');
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="My Courses"
          component={MyCourses}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
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
          name="Messages"
          component={Messages}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="CourseBySubscriptionType"
          component={CourseBySubscriptionType}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="CourseByCategory"
          component={CourseByCategory}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
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
          name="StudentsExams"
          component={StudentsExams}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="PublishedExams"
          component={PublishedExams}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="ScoreExam"
          component={ScoreExam}
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
          name="Edit Sections"
          component={EditSections}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Editable Course"
          component={EditableCourse}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
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
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="User Screen"
          component={UserScreen}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  console.log('Already in user screen');
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Course View"
          component={CourseView}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Editable section"
          component={EditableSection}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
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
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Section View"
          component={SectionView}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="PaymentsInfo"
          component={PaymentsInfo}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
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
          name="AddCollaborator"
          component={AddCollaborator}
          options={{
            presentation: 'modal',
            headerShown: false,
            cardOverlayEnabled: true,
          }}
        />
        <Stack.Screen
          name="Mycollaborations"
          component={Mycollaborations}
          options={({navigation}) => ({
            title: '',
            headerStyle: {backgroundColor: '#A8DAFA'},
            headerLeft: () => (
              <Icon
                name={'home'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('Home', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name={'account-circle'}
                color={'#1d3557'}
                size={38}
                onPress={async () => {
                  let user = await loadedUserId();
                  navigation.navigate('User Screen', {
                    userId: user.currentUserId,
                  });
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AppointCollaborators"
          component={AppointCollaborators}
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
