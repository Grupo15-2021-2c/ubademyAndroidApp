import React from 'react';
import type {Node} from 'react';
import {DefaultTheme, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const PasswordInput = ({title, form, setForm, error}): Node => {
  const [icon, setIcon] = React.useState('eye');
  const [password, setPassword] = React.useState(true);

  return (
    <TextInput
      style={styles.iconStyle}
      error={error}
      label={title}
      value={form.password}
      secureTextEntry={password}
      left={
        <TextInput.Icon
          color={'#A8DAFA'}
          name={icon}
          onPress={() => {
            setIcon(icon === 'eye' ? 'eye-off' : 'eye');
            setPassword(!password);
          }}
        />
      }
      theme={textInputTheme}
      onChangeText={textInput => setForm({...form, password: textInput})}
    />
  );
};

const EmailInput = ({title, form, setForm, error}): Node => {
  return (
    <TextInput
      style={styles.iconStyle}
      error={error}
      textContentType={'emailAddress'}
      label={title}
      value={form.email}
      left={<TextInput.Icon name="email" color={'#A8DAFA'} />}
      theme={textInputTheme}
      onChangeText={textInput => setForm({...form, email: textInput})}
    />
  );
};

const FirsName = ({title, form, setForm}): Node => {
  return (
    <TextInput
      style={styles.iconStyle}
      label={title}
      value={form.firstName}
      left={<TextInput.Icon name="account" color={'#A8DAFA'} />}
      theme={textInputTheme}
      onChangeText={textInput => setForm({...form, firstName: textInput})}
    />
  );
};

const LastName = ({title, form, setForm}): Node => {
  return (
    <TextInput
      style={styles.iconStyle}
      label={title}
      value={form.lastName}
      left={<TextInput.Icon name="account" color={'#A8DAFA'} />}
      theme={textInputTheme}
      onChangeText={textInput => setForm({...form, lastName: textInput})}
    />
  );
};

const styles = StyleSheet.create({
  iconStyle: {fontWeight: 'bold'},
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

export {PasswordInput, EmailInput, FirsName, LastName};
