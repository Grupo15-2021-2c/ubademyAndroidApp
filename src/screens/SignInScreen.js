/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {EmailInput, PasswordInput} from '../components/TextInputComponents';

const postLogIn = (email, password, navigation) => {
  const url = 'https://ubademy-g15-back-node.herokuapp.com/api/users/login';

  fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res === true) {
        navigation.navigate('Home');
      }
    })
    .catch(error => console.log('ERROR: ' + error.message));
};

const SignInButton = ({email, password, navigation}) => {
  return (
    <Button
      mode="contained"
      onPress={() => postLogIn(email, password, navigation)}>
      <Text style={styles.buttonText}>{'SIGN IN'}</Text>
    </Button>
  );
};

const UbademyLogo = () => {
  return (
    <Image
      style={styles.logoStyle}
      source={require('../resources/images/adaptive-icon.png')}
    />
  );
};

const BackgroundDetail = () => {
  return (
    <Image
      style={styles.backgroundDetailImageStyle}
      source={require('../resources/images/background-detail.png')}
    />
  );
};

const SignIn = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.root}>
      <View style={styles.backgroundDetail}>
        <BackgroundDetail />
      </View>
      <View style={styles.top}>
        <UbademyLogo size={'75%'} />
      </View>
      <View style={styles.headerStyle}>
        <Text style={styles.titleTextStyle}>{'Welcome back!'}</Text>
        <Text style={styles.subtitleTextStyle}>{'Sign into your account'}</Text>
      </View>
      <View style={styles.formStyle}>
        <View style={styles.margin}>
          <EmailInput title={'Email'} text={email} setText={setEmail} />
        </View>
        <View style={styles.margin}>
          <PasswordInput
            title={'Password'}
            text={password}
            setText={setPassword}
          />
        </View>
        <View style={styles.margin}>
          <SignInButton
            password={password}
            email={email}
            navigation={navigation}
          />
        </View>
      </View>
      <Text style={styles.bottom}>
        <Text style={styles.subtitleTextStyle}>
          {"Don't have an account? "}
        </Text>
        <Text
          onPress={() => navigation.navigate('Sign Up')}
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
    backgroundColor: '#1d3557',
  },
  top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    textAlign: 'center',
  },
  logoStyle: {
    resizeMode: 'contain',
    height: '100%',
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
  backgroundDetailImageStyle: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  singUpText: {
    fontSize: 24,
    color: '#FAFAFA',
    textAlign: 'center',
  },
  backgroundDetail: {
    height: '33%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  headerStyle: {
    flex: 1,
  },
  margin: {
    marginTop: '2%',
  },
  formStyle: {
    flex: 5,
    padding: '2%',
    justifyContent: 'flex-start',
  },
});

export default SignIn;
