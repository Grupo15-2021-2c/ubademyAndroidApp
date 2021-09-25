/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, TextInput} from 'react-native-paper';

const UserInput = ({title}): Node => {
  const [text, setText] = React.useState('');

  return (
    <View style={style.userInput}>
      <TextInput
        label={title}
        value={text}
        mode="outlined"
        onChangeText={textInput => setText(textInput)}
      />
    </View>
  );
};

const SignInButton = () => (
  <View style={style.buttonsStyle}>
    <Button mode="contained" onPress={() => console.log('Pressed')}>
      Sign In
    </Button>
  </View>
);

const App: () => Node = () => {
  return (
    <View style={style.general}>
      <UserInput title="Username" />
      <UserInput title="Email" />
      <UserInput title="Password" />
      <SignInButton />
    </View>
  );
};

const style = StyleSheet.create({
  general: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  userInput: {
    marginTop: '2%',
  },
  buttonsStyle: {
    marginTop: '2%',
  },
});

export default App;
