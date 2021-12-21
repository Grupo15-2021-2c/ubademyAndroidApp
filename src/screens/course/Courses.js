import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const Courses = ({route, navigation}) => {
  const {userId} = route.params;

  return (
    <View style={styles.root}>
      <View style={styles.options}>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('CourseByCategory', {userId: userId})
            }>
            <Text style={styles.buttonText}>{'Course by Category'}</Text>
          </Button>
        </View>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('CourseBySubscriptionType', {userId: userId})
            }>
            <Text style={styles.buttonText}>
              {'Course By Subscription Type'}
            </Text>
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
  options: {
    flex: 1,
    margin: '2%',
    justifyContent: 'center',
  },
  padding: {
    margin: '2%',
  },
});

export default Courses;
