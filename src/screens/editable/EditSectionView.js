/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import {creatSection} from '../api/CoursesApi';
import {editSection} from '../../api/CoursesApi';

export const EditSection = ({route, navigation}) => {
  const {sectionInfo} = route.params;

  const [error, setError] = useState({
    subtitle: false,
    body: false,
  });
  const [section, setSection] = useState(sectionInfo);

  const renderInfo = () => {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.padding}>
            <TextInput
              error={error.subtitle}
              style={styles.iconStyle}
              label={'Subtitle'}
              value={section.subtitle}
              theme={textInputTheme}
              onChangeText={textInput =>
                setSection({...section, subtitle: textInput})
              }
            />
          </View>
          <View style={styles.padding}>
            <TextInput
              error={error.body}
              multiline={true}
              style={styles.iconStyle}
              label={'Body'}
              value={section.body}
              theme={textInputTheme}
              onChangeText={textInput =>
                setSection({...section, body: textInput})
              }
            />
          </View>
        </View>
        <View style={styles.options}>
          <View style={styles.padding}>
            <Button
              mode="contained"
              onPress={() => {
                editSection(section, setError, navigation);
              }}>
              <Text style={styles.buttonText}>{'Update'}</Text>
            </Button>
          </View>
        </View>
      </View>
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
    flex: 1,
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

const textInputTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#A8DAFA',
    primary: '#A8DAFA',
    placeholder: '#A8DAFA',
    background: 'transparent',
    disabled: '#A8DAFA',
    error: '#e63946',
  },
};
