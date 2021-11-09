import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';

const CurryImagePicker = ({image, onImagePicked}) => {
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (image) {
      console.log('useEffect: ' + image);
      setSelectedImage({uri: image});
    }
  }, [image]);

  const pickImageHandler = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 1000, maxHeight: 1000},
      response => {
        if (response.errorCode) {
          console.log('image error');
        }
        if (!response.didCancel) {
          console.log('Image: ' + response.assets[0].uri);
          setSelectedImage(response.assets[0]);
          onImagePicked(response.assets[0]);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={selectedImage} style={styles.previewImage} />
      </View>
      <Button mode="contained" onPress={() => pickImageHandler()}>
        <Text style={styles.buttonText}>{'Pick Image'}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'red',
    margin: 10,
  },
});

export default CurryImagePicker;
