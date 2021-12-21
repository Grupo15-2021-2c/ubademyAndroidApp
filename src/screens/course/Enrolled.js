import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getEnrolled} from '../../api/CoursesApi';

const Enrolled = ({route, navigation}) => {
  const {courseId} = route.params;

  const [state, setState] = React.useState({
    loading: false,
    enrolled: [],
  });

  useEffect(() => {
    getEnrolled(courseId, setState, navigation);
  }, [courseId, navigation]);

  return (
    <View style={styles.root}>
      <List.Section>
        {state.loading === false
          ? state.enrolled.map(item => {
              return (
                <List.Item
                  key={item.id}
                  title={item.email}
                  titleStyle={styles.titleStyle}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('User Screen', {userId: item.id})
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

export default Enrolled;
