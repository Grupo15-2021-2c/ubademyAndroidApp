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

const GoToButton = ({navigation, destiny, text, courseId}) => {
  return (
    <Button
      mode="contained"
      onPress={() => navigation.navigate(destiny, {id: courseId})}>
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

  useEffect(() => {
    getCourse(id, setState);
    userIsEnrolled(id, userId, setEnrolledState);
  }, [id, userId]);

  const EnrollButton = () => {
    if (!enrolledState.isEnrolled) {
      return (
        <Button
          mode="contained"
          onPress={() => enroll(userId, id, setEnrolledState)}>
          <Text style={styles.buttonText}>{'Enroll'}</Text>
        </Button>
      );
    }
    return (
      <Button
        mode="contained"
        onPress={() => cancelInscription(userId, id, setEnrolledState)}>
        <Text style={styles.buttonText}>{'Cancel'}</Text>
      </Button>
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
            <View style={styles.padding}>
              <GoToButton
                navigation={navigation}
                text={'Sections'}
                destiny={'Sections View'}
                courseId={id}
              />
            </View>
            {!enrolledState.loading ? (
              <View style={styles.padding}>
                <EnrollButton />
              </View>
            ) : null}
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
});

export default CourseView;
