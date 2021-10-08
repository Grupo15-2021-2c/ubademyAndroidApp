/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  PasswordInput,
  EmailInput,
  NameInput,
} from '../components/TextInputComponents';
import {Button} from 'react-native-paper';

const BackgroundDetail = () => {
  return (
    <Image
      style={styles.backgroundDetailImageStyle}
      source={require('../resources/images/background-detail-sign-up.png')}
    />
  );
};

const SignUpButton = ({firstName, lastName, email, password}) => {
  return (
    <Button
      mode="contained"
      onPress={() =>
        console.log(
          'firstName: ' +
            firstName +
            ' lastName: ' +
            lastName +
            ' email: ' +
            email +
            ' password: ' +
            password,
        )
      }>
      <Text style={styles.buttonText}>{'CREATE ACCOUNT'}</Text>
    </Button>
  );
};

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <View style={styles.root}>
      <View style={styles.backgroundDetail}>
        <BackgroundDetail />
      </View>
      <View style={styles.headerStyle}>
        <Text style={styles.titleTextStyle}>{'Join Ubademy'}</Text>
        <Text style={styles.subtitleTextStyle}>
          {'Sign up and begin to study'}
        </Text>
      </View>
      <View style={styles.formStyle}>
        <View style={styles.margin}>
          <NameInput
            title={'First name'}
            text={firstName}
            setText={setFirstName}
          />
        </View>
        <View style={styles.margin}>
          <NameInput
            title={'Last name'}
            text={lastName}
            setText={setLastName}
          />
        </View>
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
          <SignUpButton
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  backgroundDetailImageStyle: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  backgroundDetail: {
    height: '22%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  formStyle: {
    flex: 2,
    padding: '2%',
    marginTop: '5%',
  },
  margin: {
    marginTop: '2%',
  },
  headerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: 30,
    color: '#A8DAFA',
    bottom: 0,
  },
  subtitleTextStyle: {
    fontSize: 24,
    color: '#A8DAFA',
    textAlign: 'center',
  },
  singUpText: {
    fontSize: 24,
    color: '#FAFAFA',
    textAlign: 'center',
  },
});

export default SignUp;
