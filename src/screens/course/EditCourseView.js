import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {editCourse, getCategories} from '../../api/CoursesApi';

export const EditCourse = ({route, navigation}) => {
  const {courseInfo} = route.params;

  const [error, setError] = useState({
    title: false,
    description: false,
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState(courseInfo.categoryId);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(courseInfo);

  useEffect(() => {
    getCategories(setCategorys, setLoading);
  }, []);

  const renderInfo = () => {
    if (!loading) {
      return (
        <View style={styles.root}>
          <View style={styles.header}>
            <View style={styles.padding}>
              <TextInput
                error={error.title}
                style={styles.iconStyle}
                label={'Title'}
                value={course.title}
                theme={textInputTheme}
                onChangeText={textInput =>
                  setCourse({...course, title: textInput})
                }
              />
            </View>
            <View style={styles.padding}>
              <DropDown
                dropDownItemSelectedStyle={styles.blueBackground}
                dropDownItemStyle={styles.blueBackground}
                label={'Category'}
                mode={'flat'}
                visible={showDropDown}
                onDismiss={() => setShowDropDown(false)}
                showDropDown={() => setShowDropDown(true)}
                value={category}
                setValue={setCategory}
                list={categorys}
                theme={textInputTheme}
              />
            </View>
            <View style={styles.padding}>
              <TextInput
                error={error.description}
                multiline={true}
                style={styles.iconStyle}
                label={'Description'}
                value={course.description}
                theme={textInputTheme}
                onChangeText={textInput =>
                  setCourse({...course, description: textInput})
                }
              />
            </View>
          </View>
          <View style={styles.options}>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() =>
                  editCourse(course, category, setError, navigation)
                }>
                <Text style={styles.buttonText}>{'Upload'}</Text>
              </Button>
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  return renderInfo();
};

const styles = StyleSheet.create({
  blueBackground: {
    backgroundColor: '#1d3557',
  },
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
