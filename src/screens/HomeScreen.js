/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const UbademyLogo = () => {
  return (
    <Image
      style={styles.logoStyle}
      source={require('../resources/images/adaptive-icon.png')}
    />
  );
};

const Home = ({route, navigation}) => {
  const {userId} = route.params;

  const GoToButton = ({destiny, text}) => {
    return (
      <Button
        mode="contained"
        onPress={() => navigation.navigate(destiny, {userId: userId})}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <UbademyLogo />
      </View>
      <View style={styles.options}>
        <View style={styles.padding}>
          <GoToButton
            navigation={navigation}
            text={'My profile'}
            destiny={'User Screen'}
          />
        </View>
        <View style={styles.padding}>
          <GoToButton
            navigation={navigation}
            text={'My courses'}
            destiny={'My Courses'}
          />
        </View>
        <View style={styles.padding}>
          <GoToButton
            navigation={navigation}
            text={'Courses'}
            destiny={'Courses'}
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
  options: {
    flex: 2,
    margin: '2%',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    margin: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  padding: {
    margin: '2%',
  },
  logoStyle: {
    resizeMode: 'contain',
    height: '100%',
  },
});

export default Home;
