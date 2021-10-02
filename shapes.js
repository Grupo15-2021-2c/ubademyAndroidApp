import * as React from 'react';
import {StyleSheet, View} from 'react-native';

const ManualInput = () => {
  return (
    <View>
      <Trapezoid />
    </View>
  );
};

const Trapezoid = () => {
  return <View style={[styles.trapezoid]} />;
};

const styles = StyleSheet.create({
  trapezoid: {
    width: '0%',
    height: '50%',
    borderTopWidth: 100,
    borderTopColor: 'red',
    borderBottomWidth: 100,
    borderBottomColor: 'transparent',
    borderLeftWidth: 500,
    borderLeftColor: 'red',
    borderRightWidth: 0,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
});

export {ManualInput, Trapezoid};
