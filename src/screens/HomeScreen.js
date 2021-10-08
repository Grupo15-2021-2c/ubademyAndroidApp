/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const Sheesh = () => {
  return (
    <Image
      style={styles.logoStyle}
      source={require('../resources/images/sheesh.jpg')}
    />
  );
};

const Home = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Sheesh size={'75%'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
