import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getEnrolled} from '../../api/CoursesApi';
import {currentUserId} from '../../api/Storage';

export const AppointCollaborators = ({route, navigation}) => {
  const {courseId} = route.params;

  const [state, setState] = React.useState({
    loading: false,
    enrolled: [],
  });
  const [creatorId, setCreatorId] = React.useState(0);

  useEffect(() => {
    currentUserId(setCreatorId);
    getEnrolled(courseId, setState, navigation);
  }, [courseId, navigation]);

  return (
    <View style={styles.root}>
      <List.Section>
        {state.loading === false
          ? state.enrolled.map(item => {
              if (item.id !== creatorId.currentUserId) {
                return (
                  <List.Item
                    key={item.id}
                    title={item.email}
                    titleStyle={styles.titleStyle}
                    style={styles.listItem}
                    onPress={() =>
                      navigation.navigate('AddCollaborator', {
                        userId: item.id,
                        courseId: courseId,
                        user: item,
                      })
                    }
                  />
                );
              } else {
                return null;
              }
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
