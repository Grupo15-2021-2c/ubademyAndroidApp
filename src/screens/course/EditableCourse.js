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
import {getCourse} from '../../api/CoursesApi';
import {categorys} from '../../Parameters/categorys';

const EditableCourse = ({route, navigation}) => {
  const {id} = route.params;

  const [state, setState] = useState({
    loading: false,
    course: {
      title: 'Loading title',
      category: 0,
      description: 'loading description',
    },
  });

  useEffect(() => {
    getCourse(id, setState, navigation);
  }, [id, navigation]);

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
              <GoToButton text={'View enrolled'} destiny={'Enrolled'} />
            </View>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('Edit course', {courseInfo: state.course})
                }>
                <Text style={styles.buttonText}>{'Edit course info'}</Text>
              </Button>
            </View>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('AppointCollaborators', {courseId: id})
                }>
                <Text style={styles.buttonText}>{'Appoint collaborators'}</Text>
              </Button>
            </View>
            <View style={styles.padding}>
              <GoToButton text={'View sections'} destiny={'Edit Sections'} />
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() => navigation.navigate(destiny, {courseId: id})}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  return renderInfo();
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  header: {
    top: '15%',
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

export default EditableCourse;
