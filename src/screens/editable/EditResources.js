import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {getResources} from '../../api/CoursesApi';

export const EditableResources = ({route, navigation}) => {
  const {courseId, sectionId} = route.params;

  const [state, setState] = React.useState({
    loading: true,
    resources: [],
  });

  useEffect(() => {
    getResources(courseId, sectionId, setState);
  }, [courseId, sectionId]);

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate(destiny, {
            courseId: courseId,
            sectionId: sectionId,
          })
        }>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.root}>
      <List.Section>
        {state.loading === false
          ? state.resources.map(item => {
              return (
                <List.Item
                  key={item.id}
                  title={item.type}
                  titleStyle={styles.titleStyle}
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
      <View style={styles.options}>
        <View style={styles.padding}>
          <GoToButton
            navigation={navigation}
            text={'Add Image'}
            destiny={'Add image'}
          />
        </View>
        <View style={styles.padding}>
          <GoToButton
            navigation={navigation}
            text={'Add PDF'}
            destiny={'Add Pdf'}
          />
        </View>
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
  options: {
    flex: 1,
    paddingBottom: '10%',
    justifyContent: 'flex-end',
  },
  padding: {
    margin: '2%',
  },
});
