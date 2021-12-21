import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';

export const resourceView = ({route, navigation}) => {
  const {resource} = route.params;

  const showResource = () => {
    let type = resource.type.split('/');

    console.log(resource);

    if (type[0] === 'image') {
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
    if (type[1] === 'pdf') {
      return (
        <View style={styles.container}>
          <Pdf
            source={{uri: resource.url}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    backgroundColor: '#1d3557',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
