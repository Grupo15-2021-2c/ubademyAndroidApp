/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const Home = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Text style={styles.titleTextStyle}>{'User is Logged In'}</Text>
        <Icon name={'check-circle'} color={'#A8DAFA'} size={100} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 30,
    color: '#A8DAFA',
    textAlign: 'center',
    margin: '5%',
  },
});

export default Home;
