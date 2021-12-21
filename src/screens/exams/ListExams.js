import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {getExams, getPublishedExams} from '../../api/examsApi';
import {CreatExam} from './CreatExam';

export const ListExams = ({route, navigation}) => {
  const {courseId, sectionId, userId} = route.params;

  const [state, setState] = React.useState({
    loading: true,
    resources: [],
  });

  useEffect(() => {
    getPublishedExams(courseId, sectionId, setState, navigation);
  }, [courseId, navigation, sectionId]);

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate(CreatExam, {
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
      <ScrollView>
        <List.Section>
          {state.loading === false
            ? state.resources.map(item => {
                return (
                  <List.Item
                    key={item.id}
                    title={item.title}
                    titleStyle={styles.titleStyle}
                    style={styles.listItem}
                    onPress={() =>
                      navigation.navigate('AnswerExam', {
                        exam: item,
                        userId,
                      })
                    }
                  />
                );
              })
            : null}
        </List.Section>
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
    color: '#1d3557',
  },
  descriptionStyle: {
    color: '#1d3557',
  },
  description: {
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
