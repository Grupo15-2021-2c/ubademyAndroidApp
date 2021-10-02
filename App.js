/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import {ManualInput} from './shapes';

const SignInButton = () => {
  return (
    <View style={styles.button}>
      <Button mode="contained" onPress={() => console.log('Sign In: Pressed')}>
        <Text style={styles.buttonText}>{'SIGN IN'}</Text>
      </Button>
    </View>
  );
};

const PasswordInput = ({title}): Node => {
  const [text, setText] = React.useState('');
  const [icon, setIcon] = React.useState('eye');
  const [password, setPassword] = React.useState(true);

  return (
    <View style={styles.textInput}>
      <TextInput
        label={title}
        value={text}
        secureTextEntry={password}
        left={
          <TextInput.Icon
            name={icon}
            onPress={() => {
              setIcon(icon === 'eye' ? 'eye-off' : 'eye');
              setPassword(!password);
            }}
          />
        }
        theme={textInputTheme}
        onChangeText={textInput => setText(textInput)}
      />
    </View>
  );
};

const EmailInput = ({title}): Node => {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.textInput}>
      <TextInput
        label={title}
        value={text}
        left={<TextInput.Icon name="email" />}
        theme={textInputTheme}
        onChangeText={textInput => setText(textInput)}
      />
    </View>
  );
};

const UbademyLogo = ({size}) => {
  return (
    <Image
      style={[styles.ubademyLogo, {width: size, height: size}]}
      source={require('./android/app/src/main/res/images/adaptive-icon.png')}
    />
  );
};

const App: () => Node = () => {
  return (
    <View style={styles.root}>
      <ManualInput
        color={'#a8dafa'}
        triangleHeight={Dimensions.get('window').height * (1 / 9)}
        trapezoidHeight={Dimensions.get('window').height * (2 / 9)}
      />
      <UbademyLogo size={Dimensions.get('window').height * (1 / 3)} />
      <View style={styles.panel}>
        <Text style={styles.bigText}>{'Welcome back!'}</Text>
        <Text style={styles.smallText}>{'Sign into your account'}</Text>
        <EmailInput title={'Email'} />
        <PasswordInput title={'Password'} />
        <SignInButton />
      </View>
      <View behavior="height" style={styles.signUpBar}>
        <Text>
          <Text style={styles.smallText}>{"Don't have an account? "}</Text>
          <Text
            onPress={() => console.log('Sign Up: Pressed')}
            style={styles.singUpText}>
            {'Sign Up'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: '#1d3557',
  },
  signUpBar: {
    position: 'absolute',
    top: '90%',
  },
  ubademyLogo: {
    flex: 1,
    position: 'absolute',
  },
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1d3557',
  },
  panel: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    top: Dimensions.get('window').height * (1 / 3),
    position: 'absolute',
  },
  textInput: {
    marginTop: '2%',
  },
  button: {
    marginTop: '2%',
  },
  bigText: {
    textAlign: 'center',
    color: '#A8DAFA',
    fontSize: 36,
  },
  smallText: {
    textAlign: 'center',
    color: '#A8DAFA',
    fontSize: 20,
  },
  singUpText: {
    textAlign: 'center',
    color: '#fafafa',
    fontSize: 20,
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
  },
};

export default App;
