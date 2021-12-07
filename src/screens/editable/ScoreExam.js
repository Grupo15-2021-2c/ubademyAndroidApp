import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import {answerExam, getExam, scoreExam} from '../../api/examsApi';

export const ScoreExam = ({route, navigation}) => {
  const {courseId, sectionId, examId, exam} = route.params;

  const [score, setScore] = useState('');
  const [state, setState] = useState({
    loading: true,
    answers: exam,
  });

  useEffect(() => {
    setState(prevState => {
      let modifiableState = Object.assign({}, prevState);

      modifiableState.answers.score = modifiableState.answers.score.toString();

      for (const i in modifiableState.answers.answers) {
        modifiableState.answers.answers[i].questionNum = i;
      }

      return modifiableState;
    });

    getExam(courseId, sectionId, examId, setState);
  }, [courseId, sectionId, examId]);

  return (
    <View style={styles.root}>
      {state.loading === false ? (
        <ScrollView>
          <View key={0} style={styles.addButton}>
            <Text style={styles.title}>{state.exam.title}</Text>
          </View>
          {state.answers.answers.map(item => {
            return (
              <View key={item.questionId} style={styles.addButton}>
                <Text style={styles.titleText}>
                  {state.exam.questions[item.questionNum].text}
                </Text>
                <Text style={styles.titleText}>{item.text}</Text>
              </View>
            );
          })}
          <View style={styles.addButton}>
            <TextInput
              keyboardType={'numeric'}
              maxLength={1}
              multiline={false}
              label={'Score'}
              value={state.answers.score}
              theme={textInputTheme}
              onChangeText={e =>
                setState(prevState => {
                  let modifiableState = Object.assign({}, prevState);
                  modifiableState.answers.score = e;
                  return modifiableState;
                })
              }
            />
          </View>
          <View style={styles.addButton}>
            <Button
              mode="contained"
              onPress={() =>
                scoreExam(
                  courseId,
                  sectionId,
                  examId,
                  state.answers.id,
                  state.answers.score,
                  navigation,
                )
              }>
              <Text style={styles.buttonText}>{'Score exam'}</Text>
            </Button>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d3557',
  },
  titleText: {
    margin: '1%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A8DAFA',
  },
  addButton: {
    margin: '2%',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#A8DAFA',
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
