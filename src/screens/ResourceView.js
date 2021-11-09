import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const resourceView = ({route, navigation}) => {
  const {resource} = route.params;

  const showResource = () => {
    let type = resource.type.split('/')[0];

    if (type === 'image') {
      return (
        <View style={styles.root}>
          <Image
            style={styles.stretch}
            source={{
              uri: resource.url,
            }}
          />
        </View>
      );
    }
  };

  return showResource();
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
    justifyContent: 'center',
  },
  stretch: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
