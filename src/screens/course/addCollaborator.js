import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isCollaborator, makeCollaborator} from '../../api/collaboratorApi';
import {Button} from 'react-native-paper';
import {logOutUser} from '../../api/UsersApi';

export const AddCollaborator = ({route, navigation}) => {
  const {userId, courseId, user} = route.params;

  const [state, setState] = useState({
    loading: true,
    user: user,
    isCollaborator: false,
  });

  useEffect(() => {
    isCollaborator(userId, courseId, setState, navigation);
  }, [courseId, navigation, userId]);

  return (
    <View style={styles.root}>
      {!state.loading ? (
        <View style={styles.root}>
          <View style={styles.userInfo}>
            <Text style={styles.nameTextStyle}>
              {state.user.firstName}
              {'  '}
              {state.user.lastName}
            </Text>
            <Text style={styles.nameTextStyle}>{state.user.email}</Text>
          </View>
          {!state.isCollaborator ? (
            <View style={styles.editButton}>
              <Button
                mode="contained"
                onPress={() => makeCollaborator(userId, courseId, navigation)}>
                <Text style={styles.buttonText}>{'Make collaborator'}</Text>
              </Button>
            </View>
          ) : (
            <View style={styles.editButton}>
              <Text style={styles.text}>
                {'User already is a collaborator'}
              </Text>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  editButton: {
    flex: 1,
    margin: '5%',
  },
  userImage: {
    flex: 10,
    resizeMode: 'stretch',
  },
  userInfo: {
    flex: 5,
    alignItems: 'center',
    marginTop: '55%',
  },
  margin: {
    flex: 1,
    color: '#A8DAFA',
    margin: '5%',
  },
  padding: {
    margin: '2%',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#A8DAFA',
  },
  nameTextStyle: {
    fontSize: 32,
    color: '#A8DAFA',
    marginTop: '3%',
  },
});
