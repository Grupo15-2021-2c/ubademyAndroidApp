import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';

export const CreatExam = ({route, navigation}) => {
  const [state, setState] = useState({
    title: '',
    questions: [{questionNumber: 0, question: ''}],
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.addButton}>
          <TextInput
            label={'Title'}
            maxLength={50}
            theme={textInputTheme}
            onChangeText={textInput =>
              setState(prevState => {
                let modifiableState = Object.assign({}, prevState);
                modifiableState.title = textInput;
                return modifiableState;
              })
            }
          />
        </View>
        {state.questions.map(item => {
          return (
            <View key={item.questionNumber} style={styles.addButton}>
              <TextInput
                maxLength={256}
                multiline={true}
                label={'Question ' + item.questionNumber}
                theme={textInputTheme}
                onChangeText={textInput =>
                  setState(prevState => {
                    let modifiableState = Object.assign({}, prevState);
                    modifiableState.questions[item.questionNumber].question =
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
          onPress={() =>
            setState({
              ...state,
              questions: [
                ...state.questions,
                {questionNumber: state.questions.length, question: ''},
              ],
            })
          }>
          <Text style={styles.buttonText}>{'Add question'}</Text>
        </Button>
      </View>
      <View style={styles.addButton}>
        <Button mode="contained" onPress={() => console.log(state)}>
          <Text style={styles.buttonText}>{'Upload'}</Text>
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
    color: '#333',
  },
  addButton: {
    margin: '2%',
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
