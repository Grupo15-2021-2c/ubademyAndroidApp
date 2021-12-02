import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';

export const Chat = ({route, navigation}) => {
  const [state, setState] = useState({
    originId: 1,
    destiniId: 2,
    messages: [
      {
        originId: 1,
        destiniId: 2,
        message: 'Un mensaje superlargo para probar todo',
      },
      {
        originId: 2,
        destiniId: 1,
        message: 'Hey!',
      },
    ],
    currentMessage: '',
  });

  useEffect(() => {
    console.log('get chat');
  }, []);

  const showMessage = message => {
    if (message.originId !== state.originId) {
      return (
        <View style={styles.originMessage}>
          <Text style={styles.originText}>{message.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.destiniMessage}>
        <Text style={styles.destiniText}>{message.message}</Text>
      </View>
    );
  };

  const handleUserInput = e => {
    setState({...state, currentMessage: e});
  };

  const sendMessage = () => {
    console.log('Send');
    setState({...state, currentMessage: ''});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {state.messages.map(item => {
          return showMessage(item);
        })}
      </ScrollView>
      <View style={styles.addButton}>
        <TextInput
          value={state.currentMessage}
          maxLength={256}
          multiline={true}
          theme={textInputTheme}
          onChangeText={handleUserInput}
          right={
            <TextInput.Icon
              name="arrow-right"
              color={'#A8DAFA'}
              onPress={sendMessage}
            />
          }
        />
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
  originMessage: {
    margin: '2%',
    marginLeft: '10%',
    backgroundColor: '#fff',
  },
  destiniMessage: {
    margin: '2%',
    backgroundColor: '#A8DAFA',
    marginRight: '10%',
  },
  originText: {
    textAlign: 'right',
    margin: '2%',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  destiniText: {
    margin: '2%',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
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
