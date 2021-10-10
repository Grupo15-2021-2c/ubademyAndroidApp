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
  LastName,
  FirsName,
} from '../components/TextInputComponents';
import {Button} from 'react-native-paper';
import showToast from '../components/ToastUtilities';
import processResponse from '../components/FetchUtilities';
import {registerEndPoint} from '../Parameters/EndpointsUrls';

const postRegister = (form, navigation, setError) => {
  console.log('[INFO] form: ' + JSON.stringify(form));

  fetch(registerEndPoint, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
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
    .catch(error => console.log('[ERROR] ' + error.message));
};

const BackgroundDetail = () => {
  return (
    <Image
      style={styles.backgroundDetailImageStyle}
      source={require('../resources/images/background-detail-sign-up.png')}
    />
  );
};

const SignUpButton = ({form, navigation, setError}) => {
  return (
    <Button
      mode="contained"
      onPress={() => postRegister(form, navigation, setError)}>
      <Text style={styles.buttonText}>{'CREATE ACCOUNT'}</Text>
    </Button>
  );
};

const SignUp = ({navigation}) => {
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
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
          <FirsName title={'First name'} form={form} setForm={setForm} />
        </View>
        <View style={styles.margin}>
          <LastName title={'Last name'} form={form} setForm={setForm} />
        </View>
        <View style={styles.margin}>
          <EmailInput
            title={'Email'}
            form={form}
            setForm={setForm}
            error={error}
          />
        </View>
        <View style={styles.margin}>
          <PasswordInput
            title={'Password'}
            form={form}
            setForm={setForm}
            error={error}
          />
        </View>
        <View style={styles.margin}>
          <SignUpButton
            form={form}
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
