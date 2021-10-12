/**
 * @format
 */

import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#A8DAFA',
    text: '#1d3557',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
