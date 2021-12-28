import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {creatCourse, getCategories} from '../../api/CoursesApi';

const CourseCreation = ({route, navigation}) => {
  const {userId} = route.params;

  const [error, setError] = useState({
    title: false,
    description: false,
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [subscriptionsType, setSubscriptionsType] = useState([
    {label: 'free', value: 1},
    {label: 'premium', value: 2},
  ]);
  const [category, setCategory] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState(0);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({
    owner: userId,
    title: '',
    description: '',
    blocked: false,
  });

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
              <DropDown
                dropDownItemSelectedStyle={styles.blueBackground}
                dropDownItemStyle={styles.blueBackground}
                label={'Subscription Type'}
                mode={'flat'}
                visible={showDropDown2}
                onDismiss={() => setShowDropDown2(false)}
                showDropDown={() => setShowDropDown2(true)}
                value={subscriptionType}
                setValue={setSubscriptionType}
                list={subscriptionsType}
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
                onPress={() => {
                  creatCourse(
                    course,
                    category,
                    setError,
                    navigation,
                    userId,
                    subscriptionType,
                  );
                }}>
                <Text style={styles.buttonText}>{'Create Course'}</Text>
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

export default CourseCreation;
