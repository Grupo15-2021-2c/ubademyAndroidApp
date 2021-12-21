import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getResources} from '../../api/CoursesApi';

export const ViewResources = ({route, navigation}) => {
  const {courseId, sectionId} = route.params;

  const [state, setState] = React.useState({
    loading: true,
    resources: [],
  });

  useEffect(() => {
    getResources(courseId, sectionId, setState, navigation);
  }, [courseId, navigation, sectionId]);

  return (
    <ScrollView style={styles.root}>
      <List.Section>
        {state.loading === false
          ? state.resources.map(item => {
              return (
                <List.Item
                  key={item.id}
                  title={item.name}
                  titleStyle={styles.titleStyle}
                  description={item.type}
                  descriptionStyle={styles.description}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('Resource view', {
                      resource: item,
                    })
                  }
                />
              );
            })
          : null}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#1d3557',
  },
  description: {
    color: '#1d3557',
  },
  listItem: {
    margin: '2%',
    backgroundColor: '#A8DAFA',
  },
});
