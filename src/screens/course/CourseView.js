/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  cancelInscription,
  enroll,
  getCourse,
  userIsEnrolled,
} from '../../api/CoursesApi';
import {categorys} from '../../Parameters/categorys';
import {getUserSubscriptionType} from '../../api/UsersApi';

const premiumId = 2;

const GoToButton = ({navigation, destiny, text, courseId, userId}) => {
  return (
    <Button
      mode="contained"
      onPress={() =>
        navigation.navigate(destiny, {id: courseId, userId: userId})
      }>
      <Text style={styles.buttonText}>{text}</Text>
    </Button>
  );
};

const CourseView = ({route, navigation}) => {
  const {id, userId} = route.params;

  const [enrolledState, setEnrolledState] = useState({
    loading: true,
    isEnrolled: false,
  });
  const [state, setState] = useState({
    loading: false,
    course: {
      title: 'Loading title',
      category: 0,
      description: 'loading description',
    },
  });
  const [user, setUser] = useState({
    loading: true,
    subscriptionId: 0,
  });

  useEffect(() => {
    getUserSubscriptionType(setUser, userId);
    getCourse(id, setState, navigation);
    userIsEnrolled(id, userId, setEnrolledState);
  }, [id, navigation, userId]);

  const EnrollButton = () => {
    if (!enrolledState.isEnrolled) {
      if (!user.loading) {
        if (
          state.course.subscriptionId === premiumId &&
          user.subscriptionId !== premiumId
        ) {
          return (
            <Text style={styles.notPremium}>
              {
                'This is a premium course, you will need to upgrade your account to enroll'
              }
            </Text>
          );
        }
        return (
          <Button
            mode="contained"
            onPress={() => enroll(userId, id, setEnrolledState, navigation)}>
            <Text style={styles.buttonText}>{'Enroll'}</Text>
          </Button>
        );
      } else {
        return null;
      }
    }
    return (
      <View style={styles.padding}>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Enrolled', {courseId: id})}>
            <Text style={styles.buttonText}>{'View enrolled'}</Text>
          </Button>
        </View>
        <View style={styles.padding}>
          <GoToButton
            navigation={navigation}
            text={'Sections'}
            destiny={'Sections View'}
            courseId={id}
            userId={userId}
          />
        </View>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() => cancelInscription(userId, id, setEnrolledState)}>
            <Text style={styles.buttonText}>{'Cancel'}</Text>
          </Button>
        </View>
      </View>
    );
  };

  const renderInfo = () => {
    if (!state.loading) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            <Text style={styles.titleText}>{state.course.title}</Text>
            <Text style={styles.categoryText}>
              {categorys[state.course.categoryId]}
            </Text>
            <Text style={styles.descriptionText}>
              {state.course.description}
            </Text>
          </View>
          <View style={styles.options}>
            {!enrolledState.loading ? <EnrollButton /> : null}
          </View>
        </View>
      );
    }
    return null;
  };

  return renderInfo(state);
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    color: '#A8DAFA',
    marginTop: '3%',
  },
  categoryText: {
    fontSize: 24,
    color: '#A8DAFA',
    marginTop: '3%',
  },
  descriptionText: {
    fontSize: 18,
    color: '#A8DAFA',
    marginTop: '3%',
  },
  buttonText: {
    fontSize: 18,
    color: '#1d3557',
    marginTop: '3%',
  },
  padding: {
    margin: '2%',
  },
  options: {
    flex: 2,
    margin: '2%',
    justifyContent: 'center',
  },
  notPremium: {
    fontSize: 18,
    color: '#A8DAFA',
    textAlign: 'center',
  },
});

export default CourseView;
