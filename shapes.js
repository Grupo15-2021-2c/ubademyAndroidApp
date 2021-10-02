import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const ManualInput = ({color, triangleHeight, trapezoidHeight}) => {
  return (
    <View>
      <Trapezoid color={color} height={trapezoidHeight} />
      <TriangleCorner color={color} height={triangleHeight} />
    </View>
  );
};

const Trapezoid = ({color, height}) => {
  return (
    <View
      style={[
        styles.trapezoid,
        {borderTopColor: color, borderTopWidth: height},
      ]}
    />
  );
};

const TriangleCorner = ({color, height}) => {
  return (
    <View
      style={[
        styles.triangleCorner,
        {borderTopColor: color, borderTopWidth: height},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  trapezoid: {
    width: Dimensions.get('window').width,
  },
  triangleCorner: {
    borderRightWidth: Dimensions.get('window').width,
    borderRightColor: 'transparent',
  },
});

export {ManualInput, Trapezoid, TriangleCorner};
