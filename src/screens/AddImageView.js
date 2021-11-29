import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CurryImagePicker from '../components/CurryImagePicker';
import {Button} from 'react-native-paper';
import {uploadImage} from '../api/CoursesApi';

export const AddImage = ({route, navigation}) => {
  const {courseId, sectionId} = route.params;

  const [uri, setUri] = useState({uri: ''});

  return (
    <View style={styles.root}>
      <View style={styles.imagePicker}>
        <CurryImagePicker onImagePicked={setUri} />
      </View>
      <View style={styles.uploadButton}>
        <Button
          mode="contained"
          onPress={() => uploadImage(courseId, sectionId, uri, navigation)}>
          <Text style={styles.buttonText}>{'Add Image'}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  imagePicker: {
    flex: 5,
    margin: '5%',
  },
  uploadButton: {
    margin: '5%',
    justifyContent: 'center',
    flex: 1,
  },
});
