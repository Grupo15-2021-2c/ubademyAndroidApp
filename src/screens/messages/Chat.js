import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import {getChat, sendMessageApi} from '../../api/MessagingApi';
import {GiftedChat} from 'react-native-gifted-chat';
import messaging from '@react-native-firebase/messaging';

export const Chat = ({route, navigation}) => {
  const {userId, destination_id, name} = route.params;
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState({
    loading: true,
    originId: userId,
    destiniId: destination_id,
    name: name,
    messages: [],
    currentMessage: '',
  });

  useEffect(() => {
    getChat(state.originId, state.destiniId, setState);
    setMessages({
      _id: Math.random(),
      createdAt: new Date(),
      text: '',
      user: {
        _id: state.destiniId,
        name: name,
      },
    });
    messaging().onMessage(async remoteMessage => {
      console.log('aca', remoteMessage.data);
      getChat(state.originId, state.destiniId, setState);
    });
  }, [name, state.destiniId, state.originId]);

  const showMessage = message => {
    if (message.origin_id !== state.originId.toString()) {
      return {
        _id: Math.random(),
        createdAt: new Date(),
        text: message.message,
        user: {
          _id: message.origin_id,
          name: name,
        },
      };
    }
    return {
      _id: Math.random(),
      createdAt: new Date(),
      text: message.message,
      user: {
        _id: state.originId,
        name: name,
      },
    };
  };

  const onSend = useCallback((message = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
    state.currentMessage = message[0].text;
    sendMessageApi(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setMessages(state.messages.reverse().map(doc => showMessage(doc)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.destiniId, state]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        isTyping={true}
        placeholder={'Escriba su mensaje...'}
        onSend={message => onSend(message)}
        user={{
          _id: state.originId,
        }}
        scrollToBottom={true}
      />
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
