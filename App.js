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
    <Button mode="contained" onPress={() => console.log('Sign In: Pressed')}>
      <Text style={styles.buttonText}>{'SIGN IN'}</Text>
    </Button>
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
      style={{width: size, height: size}}
      source={require('./android/app/src/main/res/images/adaptive-icon.png')}
    />
  );
};

const App: () => Node = () => {
  return (
    <View style={styles.root}>
      <View style={styles.manulaInputStile}>
        <ManualInput
          color={'#A8DAFA'}
          triangleHeight={Dimensions.get('window').height * (1 / 9)}
          trapezoidHeight={Dimensions.get('window').height * (2 / 9)}
        />
      </View>
      <View style={styles.top}>
        <UbademyLogo size={'75%'} />
      </View>
      <View style={styles.middle}>
        <View style={styles.spacing}>
          <Text style={styles.titleTextStyle}>{'Welcome back!'}</Text>
          <Text style={styles.subtitleTextStyle}>
            {'Sign into your account'}
          </Text>
        </View>
        <View style={styles.spacing}>
          <EmailInput title={'Email'} />
        </View>
        <View style={styles.spacing}>
          <PasswordInput title={'Password'} />
        </View>
        <View style={styles.spacing}>
          <SignInButton />
        </View>
      </View>
      <Text style={styles.bottom}>
        <Text style={styles.subtitleTextStyle}>
          {"Don't have an account? "}
        </Text>
        <Text
          onPress={() => console.log('Sign Up: Pressed')}
          style={styles.singUpText}>
          {'Sign Up'}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#1d3557',
  },
  top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 6,
  },
  bottom: {
    flex: 1,
    textAlign: 'center',
  },
  titleTextStyle: {
    fontSize: 30,
    color: '#A8DAFA',
    textAlign: 'center',
  },
  subtitleTextStyle: {
    fontSize: 24,
    color: '#A8DAFA',
    textAlign: 'center',
  },
  spacing: {
    marginTop: '2%',
    marginBottom: '1%',
  },
  singUpText: {
    fontSize: 24,
    color: '#FAFAFA',
    textAlign: 'center',
  },
  manulaInputStile: {
    flex: 1,
    position: 'absolute',
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
