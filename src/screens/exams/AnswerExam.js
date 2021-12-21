import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import {answerExam, getUserAnswer} from '../../api/examsApi';

export const AnswerExam = ({route, navigation}) => {
  const {exam, userId} = route.params;

  const [answer, setAnswer] = useState({
    loading: true,
    answers: [],
  });
  const [state, setState] = useState({
    exam: exam,
    answers: [],
  });
  const [currentUser, setCurrentUser] = useState(userId);

  useEffect(() => {
    setState(prevState => {
      let modifiableState = Object.assign({}, prevState);

      modifiableState.answers = [];

      for (let i = 0; i < modifiableState.exam.questions.length; i++) {
        modifiableState.answers.push({
          questionNum: i,
          question: modifiableState.exam.questions[i].text,
          questionId: modifiableState.exam.questions[i].id,
          text: '',
        });
      }

      getUserAnswer(modifiableState, currentUser, setAnswer, navigation);

      return modifiableState;
    });
  }, [currentUser, navigation]);

  const showExam = () => {
    if (answer.answers === null) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.addButton}>
              <Text style={styles.title}>{state.exam.title}</Text>
            </View>
            {state.answers.map(item => {
              return (
                <View key={item.questionId} style={styles.addButton}>
                  <Text style={styles.titleText}>{item.question}</Text>
                  <TextInput
                    maxLength={256}
                    multiline={true}
                    label={'Answer'}
                    theme={textInputTheme}
                    onChangeText={textInput =>
                      setState(prevState => {
                        let modifiableState = Object.assign({}, prevState);
                        modifiableState.answers[item.questionNum].text =
                          textInput;
                        return modifiableState;
                      })
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.addButton}>
            <Button
              mode="contained"
              onPress={() => answerExam(state, currentUser, navigation)}>
              <Text style={styles.buttonText}>{'Send exam'}</Text>
            </Button>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View key={0} style={styles.addButton}>
            <Text style={styles.title}>{state.exam.title}</Text>
          </View>
          {state.answers.map(item => {
            return (
              <View key={item.questionId} style={styles.addButton}>
                <Text style={styles.titleText}>{item.question}</Text>
                <Text style={styles.titleText}>
                  {'Your answer\n' +
                    answer.answers.answers[item.questionNum].text}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        {answer.answers.score !== null ? (
          <Text style={styles.score}>
            {'Your result is ' + answer.answers.score}
          </Text>
        ) : (
          <Text style={styles.score}>
            {'Your exam has not been reviewed yet.'}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {answer.loading === false ? showExam() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  score: {
    marginBottom: '20%',
    margin: '1%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A8DAFA',
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
