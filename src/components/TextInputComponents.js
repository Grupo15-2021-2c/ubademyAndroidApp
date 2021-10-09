import React from 'react';
import type {Node} from 'react';
import {DefaultTheme, TextInput} from 'react-native-paper';

const PasswordInput = ({title, text, setText, error}): Node => {
  const [icon, setIcon] = React.useState('eye');
  const [password, setPassword] = React.useState(true);

  return (
    <TextInput
      error={error}
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
  );
};

const EmailInput = ({title, text, setText, error}): Node => {
  return (
    <TextInput
      error={error}
      textContentType={'emailAddress'}
      label={title}
      value={text}
      left={<TextInput.Icon name="email" />}
      theme={textInputTheme}
      onChangeText={textInput => setText(textInput)}
    />
  );
};

const NameInput = ({title, text, setText}): Node => {
  return (
    <TextInput
      label={title}
      value={text}
      left={<TextInput.Icon name="account" />}
      theme={textInputTheme}
      onChangeText={textInput => setText(textInput)}
    />
  );
};

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

export {PasswordInput, EmailInput, NameInput};
