import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getCourses} from '../../api/CoursesApi';

const Courses = ({route, navigation}) => {
  const {userId} = route.params;

  const [state, setState] = React.useState({
    loading: false,
    courses: [],
  });

  useEffect(() => {
    getCourses(setState);
  }, []);

  return (
    <View style={styles.root}>
      <List.Section>
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
      </List.Section>
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
});

export default Courses;
