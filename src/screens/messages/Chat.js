import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DefaultTheme, TextInput} from 'react-native-paper';
import {getChat, sendMessageApi} from '../../api/MessagingApi';

export const Chat = ({route, navigation}) => {
  const {userId, destination_id} = route.params;

  const [state, setState] = useState({
    loading: true,
    originId: userId,
    destiniId: destination_id,
    messages: [],
    currentMessage: '',
  });

  useEffect(() => {
    getChat(state.originId, state.destiniId, setState);
  }, [state.destiniId, state.originId]);

  const showMessage = message => {
    if (message.origin_id !== state.originId.toString()) {
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
    sendMessageApi(state);
    setState({...state, currentMessage: ''});
  };

  return (
    <View style={styles.container}>
      {state.loading === false ? (
        <ScrollView>
          {state.messages.map(item => {
            return showMessage(item);
          })}
        </ScrollView>
      ) : null}
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
    marginRight: '10%',
    backgroundColor: '#fff',
  },
  destiniMessage: {
    margin: '2%',
    backgroundColor: '#A8DAFA',
    marginLeft: '10%',
  },
  originText: {
    textAlign: 'left',
    margin: '2%',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  destiniText: {
    textAlign: 'right',
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
