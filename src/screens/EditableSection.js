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
import {getSection} from '../api/CoursesApi';

export const EditableSection = ({route, navigation}) => {
  const {courseId, sectionId} = route.params;

  const [state, setState] = useState({
    loading: false,
    section: {
      subtitle: 'Loading title',
      body: 'Loading body',
    },
  });

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate(destiny, {
            courseId: courseId,
            sectionId: sectionId,
          })
        }>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  useEffect(() => {
    getSection(courseId, sectionId, setState);
  }, [courseId, sectionId]);

  const renderInfo = () => {
    if (!state.loading) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            <Text style={styles.titleText}>{state.section.subtitle}</Text>
            <Text style={styles.descriptionText}>{state.section.body}</Text>
          </View>
          <View style={styles.options}>
            <View style={styles.padding}>
              <GoToButton
                navigation={navigation}
                text={'Resources'}
                destiny={'Editable resources'}
              />
            </View>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('Edit section', {
                    sectionInfo: state.section,
                  })
                }>
                <Text style={styles.buttonText}>{'Edit section'}</Text>
              </Button>
            </View>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('MyCourseExams', {
                    courseId: courseId,
                    sectionId: sectionId,
                  })
                }>
                <Text style={styles.buttonText}>{'Edit exams'}</Text>
              </Button>
            </View>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate('PublishedExams', {
                    courseId: courseId,
                    sectionId: sectionId,
                  })
                }>
                <Text style={styles.buttonText}>{'Review exams'}</Text>
              </Button>
            </View>
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
