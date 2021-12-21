import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {getMyCourses} from '../../api/CoursesApi';
import {getMyCollaborations} from '../../api/collaboratorApi';

export const Mycollaborations = ({route, navigation}) => {
  const {userId} = route.params;

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() => navigation.navigate(destiny, {userId: userId})}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  const [state, setState] = React.useState({
    loading: false,
    courses: [],
  });

  useEffect(() => {
    getMyCollaborations(setState, userId, navigation);
  }, [navigation, userId]);

  return (
    <ScrollView style={styles.root}>
      <List.Section>
        {!state.loading
          ? state.courses.map(item => {
              return (
                <List.Item
                  key={item.courseId}
                  title={item.courseId}
                  titleStyle={styles.titleStyle}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('Editable Course', {id: item.courseId})
                  }
                />
              );
            })
          : null}
      </List.Section>
      <View style={styles.addButton}>
        <GoToButton
          navigation={navigation}
          text={'Add Course'}
          destiny={'Creat Course'}
        />
      </View>
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
