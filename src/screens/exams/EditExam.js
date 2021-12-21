import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import {cancelInscription} from '../../api/CoursesApi';
import {publishExam, updateExam} from '../../api/examsApi';

export const EditExam = ({route, navigation}) => {
  const {exam} = route.params;

  const [state, setState] = useState({exam: exam});

  useEffect(() => {
    return setState(prevState => {
      let modifiableState = Object.assign({}, prevState);

      for (let i = 0; i < modifiableState.exam.questions.length; i++) {
        modifiableState.exam.questions[i].questionsNum = i;
      }
      console.log(modifiableState.exam.questions);

      return modifiableState;
    });
  }, []);

  return (
    <View style={styles.root}>
      {exam.state === 'CREATED' ? (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.addButton}>
              <Text style={styles.title}>{state.exam.title}</Text>
            </View>
            {state.exam.questions.map(item => {
              return (
                <View key={item.id} style={styles.addButton}>
                  <TextInput
                    label={'Question ' + item.questionsNum}
                    value={item.text}
                    multiline={true}
                    theme={textInputTheme}
                    onChangeText={textInput =>
                      setState(prevState => {
                        let modifiableState = Object.assign({}, prevState);
                        modifiableState.exam.questions[item.questionsNum].text =
                          textInput;
                        return modifiableState;
                      })
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.options}>
            <View style={styles.addButton}>
              <Button
                mode="contained"
                onPress={() => publishExam(state.exam, navigation)}>
                <Text style={styles.buttonText}>{'Make public'}</Text>
              </Button>
            </View>
            <View style={styles.addButton}>
              <Button
                mode="contained"
                onPress={() => updateExam(state.exam, navigation)}>
                <Text style={styles.buttonText}>{'Update'}</Text>
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.addButton}>
            <Text style={styles.title}>{state.exam.title}</Text>
          </View>
          {state.exam.questions.map(item => {
            return (
              <View key={item.id} style={styles.addButton}>
                <Text style={styles.question}>{item.text}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
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
  addButton: {
    margin: '2%',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#A8DAFA',
  },
  question: {
    margin: '2%',
    fontSize: 18,
    color: '#A8DAFA',
  },
  options: {
    flex: 1,
    justifyContent: 'center',
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
