import React from 'react';
import type {Node} from 'react';
import {DefaultTheme, TextInput} from 'react-native-paper';

const PasswordInput = ({title}): Node => {
  const [text, setText] = React.useState('');
  const [icon, setIcon] = React.useState('eye');
  const [password, setPassword] = React.useState(true);

  return (
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
  );
};

const EmailInput = ({title}): Node => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label={title}
      value={text}
      left={<TextInput.Icon name="email" />}
      theme={textInputTheme}
      onChangeText={textInput => setText(textInput)}
    />
  );
};

const NameInput = ({title}): Node => {
  const [text, setText] = React.useState('');

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
  },
};

export {PasswordInput, EmailInput, NameInput};
