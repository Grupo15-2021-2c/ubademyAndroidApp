import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {getSections} from '../../api/CoursesApi';

const EditSections = ({route, navigation}) => {
  const {courseId} = route.params;

  const [state, setState] = React.useState({
    loading: false,
    sections: [],
  });

  useEffect(() => {
    getSections(courseId, setState, navigation);
  }, [courseId, navigation]);

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() => navigation.navigate(destiny, {courseId: courseId})}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.root}>
      <List.Section>
        {!state.loading
          ? state.sections.map(item => {
              return (
                <List.Item
                  key={item.id}
                  title={item.subtitle}
                  titleStyle={styles.titleStyle}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('Editable section', {
                      courseId: courseId,
                      sectionId: item.id,
                    })
                  }
                />
              );
            })
          : null}
      </List.Section>
      <View style={styles.addButton}>
        <GoToButton
          navigation={navigation}
          text={'Add Section'}
          destiny={'Creat Section'}
        />
      </View>
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
  addButton: {
    flex: 1,
    margin: '2%',
    padding: '5%',
    justifyContent: 'flex-end',
  },
});

export default EditSections;
