/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {
  PasswordInput,
  EmailInput,
  NameInput,
} from '../components/TextInputComponents';
import {Button} from 'react-native-paper';

function processResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    data: res[1],
  }));
}

const showToast = text => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

const postRegister = (
  firstName,
  lastName,
  email,
  password,
  navigation,
  setError,
) => {
  const url =
    'https://ubademy-g15-back-node-stage.herokuapp.com/api/users/register';

  fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;
      showToast(data);

      if (statusCode === 200) {
        navigation.navigate('Sign In');
      } else {
        setError(true);
      }
    })
    .catch(error => console.log('ERROR: ' + error.message));
};

const BackgroundDetail = () => {
  return (
    <Image
      style={styles.backgroundDetailImageStyle}
      source={require('../resources/images/background-detail-sign-up.png')}
    />
  );
};

const SignUpButton = ({
  firstName,
  lastName,
  email,
  password,
  navigation,
  setError,
}) => {
  return (
    <Button
      mode="contained"
      onPress={() =>
        postRegister(firstName, lastName, email, password, navigation, setError)
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
  const [error, setError] = React.useState(false);

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
          <EmailInput
            title={'Email'}
            text={email}
            setText={setEmail}
            error={error}
          />
        </View>
        <View style={styles.margin}>
          <PasswordInput
            title={'Password'}
            text={password}
            setText={setPassword}
            error={error}
          />
        </View>
        <View style={styles.margin}>
          <SignUpButton
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            navigation={navigation}
            setError={setError}
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
