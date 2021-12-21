import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {uploadPdf} from '../../api/CoursesApi';

export const AddPdf = ({route, navigation}) => {
  const {courseId, sectionId} = route.params;

  const [uri, setUri] = useState({name: 'No Pdf selected', uri: ''});

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{uri.name}</Text>
      </View>
      <View style={styles.options}>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() => {
              DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
              }).then(res => {
                console.log(res[0]);
                setUri(res[0]);
              });
            }}>
            <Text style={styles.buttonText}>{'Pick PDF'}</Text>
          </Button>
        </View>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() => uploadPdf(courseId, sectionId, uri, navigation)}>
            <Text style={styles.buttonText}>{'Add Image'}</Text>
          </Button>
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#A8DAFA',
  },
  header: {
    flex: 1,
    marginTop: '10%',
  },
  options: {
    flex: 2,
  },
  padding: {
    margin: '2%',
  },
});
