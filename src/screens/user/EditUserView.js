/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DefaultTheme, TextInput} from 'react-native-paper';
import {updateUser} from '../../api/UsersApi';

export const EditUser = ({route, navigation}) => {
  const {user} = route.params;

  const [form, setForm] = React.useState(user);

  return (
    <ScrollView style={styles.root}>
      <View style={styles.formStyle}>
        <View style={styles.margin}>
          <TextInput
            style={styles.iconStyle}
            label={'First Name'}
            value={form.firstName}
            theme={textInputTheme}
            onChangeText={textInput => setForm({...form, firstName: textInput})}
          />
        </View>
        <View style={styles.margin}>
          <TextInput
            style={styles.iconStyle}
            label={'Last Name'}
            value={form.lastName}
            theme={textInputTheme}
            onChangeText={textInput => setForm({...form, lastName: textInput})}
          />
        </View>
        <View style={styles.margin}>
          <TextInput
            style={styles.iconStyle}
            label={'Email'}
            value={form.email}
            theme={textInputTheme}
            onChangeText={textInput => setForm({...form, email: textInput})}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            mode="contained"
            onPress={() => updateUser(user, form, navigation)}>
            <Text style={styles.buttonText}>{'Update'}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#1d3557',
  },
  backgroundDetailImageStyle: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  buttonStyle: {
    marginTop: '75%',
  },
  backgroundDetail: {
    height: '22%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  formStyle: {
    padding: '2%',
    marginTop: '5%',
  },
  margin: {
    marginTop: '5%',
  },
  headerStyle: {
    flex: 2,
    marginTop: '30%',
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
    textAlign: 'center',
    margin: '2%',
    marginTop: '30%',
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
