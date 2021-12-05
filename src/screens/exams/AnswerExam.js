import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';

export const AnswerExam = ({route, navigation}) => {
  const [state, setState] = useState({
    exam: {
      id: 1,
      courseId: 1,
      sectionId: 1,
      title: 'Parcial 1',
      questions: [
        {
          id: 1,
          examId: 1,
          text: 'Me quieres?',
        },
        {
          id: 2,
          examId: 1,
          text: 'De verdad?',
        },
      ],
    },
    answers: [],
  });

  useEffect(() => {
    setState(prevState => {
      let modifiableState = Object.assign({}, prevState);

      for (let i = 0; i < modifiableState.exam.questions.length; i++) {
        modifiableState.answers.push({
          questionNum: i,
          question: modifiableState.exam.questions[i].text,
          questionId: modifiableState.exam.questions[i].id,
          text: '',
        });
      }

      return modifiableState;
    });
  }, []);

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
                    modifiableState.answers[item.questionNum].text = textInput;
                    return modifiableState;
                  })
                }
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.addButton}>
        <Button mode="contained" onPress={() => console.log(state)}>
          <Text style={styles.buttonText}>{'Send exam'}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d3557',
  },
  titleText: {
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