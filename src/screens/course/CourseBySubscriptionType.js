import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {DefaultTheme, List} from 'react-native-paper';
import {getCoursesSubscriptionType} from '../../api/CoursesApi';
import DropDown from 'react-native-paper-dropdown';
import {categorys, subscriptionType} from '../../Parameters/categorys';

export const CourseBySubscriptionType = ({route, navigation}) => {
  const {userId} = route.params;

  const [showDropDown, setShowDropDown] = useState(false);
  const [category, setCategory] = useState(0);
  const [state, setState] = React.useState({
    loading: true,
    subscriptionType: 1,
    courses: [],
  });

  return (
    <View style={styles.root}>
      <View style={styles.padding}>
        <DropDown
          dropDownItemSelectedStyle={styles.blueBackground}
          dropDownItemStyle={styles.blueBackground}
          label={'Subscription'}
          mode={'flat'}
          visible={showDropDown}
          onDismiss={() => setShowDropDown(false)}
          showDropDown={() => setShowDropDown(true)}
          value={category}
          setValue={subscription => {
            setCategory(subscription);
            getCoursesSubscriptionType(subscription, setState);
          }}
          list={subscriptionType}
          theme={textInputTheme}
        />
      </View>
      <ScrollView>
        {state.loading === false
          ? state.courses.map(item => {
              return (
                <List.Item
                  key={item.id}
                  title={item.title}
                  titleStyle={styles.titleStyle}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('Course View', {
                      id: item.id,
                      userId: userId,
                    })
                  }
                />
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#1d3557',
  },
  listItem: {
    margin: '2%',
    backgroundColor: '#A8DAFA',
  },
  blueBackground: {
    backgroundColor: '#1d3557',
  },
  padding: {
    margin: '2%',
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
