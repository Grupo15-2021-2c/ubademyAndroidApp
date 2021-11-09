import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getSections} from '../api/CoursesApi';

const SectionsView = ({route, navigation}) => {
  const {id} = route.params;

  const [state, setState] = React.useState({
    loading: false,
    sections: [],
  });

  useEffect(() => {
    getSections(id, setState);
  }, [id]);

  return (
    <View style={styles.root}>
      <List.Section>
        {state.loading === false
          ? state.sections.map(item => {
              return (
                <List.Item
                  key={item.id}
                  title={item.subtitle}
                  titleStyle={styles.titleStyle}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('Section View', {
                      courseId: item.courseId,
                      sectionId: item.id,
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

export default SectionsView;
