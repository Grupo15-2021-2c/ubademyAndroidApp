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
import {Icon} from 'react-native-elements';
import {passwordRegex, validateEmail} from '../Parameters/Regex';

const postRegister = (form, navigation, setError) => {
  console.log('[INFO] form: ' + JSON.stringify(form));

  if (
    !RegExp(passwordRegex).test(form.password) &&
    !validateEmail(form.email)
  ) {
    showToast('Entered email and password are not valid');
    setError(true);
    return;
  }

  if (!RegExp(passwordRegex).test(form.password)) {
    showToast('Entered password is not valid');
    return;
  }

  if (!validateEmail(form.email)) {
    showToast('Entered email is not valid');
    setError(true);
    return;
  }

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
            error={false}
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

      <Text style={styles.bottom}>
        <Icon name={'info'} color={'#A8DAFA'} size={20} />
        <Text style={styles.infoText}>
          {
            ' Password must contain at least one upper case, one number, and one special character'
          }
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
    flex: 5,
    padding: '2%',
    marginTop: '5%',
  },
  margin: {
    marginTop: '2%',
  },
  headerStyle: {
    flex: 2,
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
  infoText: {
    fontSize: 20,
    color: '#A8DAFA',
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
    textAlign: 'center',
    margin: '2%',
  },
});

export default SignUp;
