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
import {getSection} from '../../api/CoursesApi';

const SectionView = ({route, navigation}) => {
  const {courseId, sectionId, userId} = route.params;

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
          navigation.navigate(destiny, {courseId, sectionId, userId})
        }>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  useEffect(() => {
    getSection(courseId, sectionId, setState, navigation);
  }, [courseId, navigation, sectionId]);

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
                destiny={'View Resources'}
                courseId={courseId}
              />
            </View>
            <View style={styles.padding}>
              <GoToButton
                navigation={navigation}
                text={'Exams'}
                destiny={'ListExams'}
                courseId={courseId}
              />
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
    marginTop: '10%',
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
    marginLeft: '3%',
    marginRight: '3%',
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

export default SectionView;
