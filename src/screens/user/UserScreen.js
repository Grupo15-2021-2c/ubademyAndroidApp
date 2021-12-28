import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {getUserInfo} from '../../api/UsersApi';
import {currentUserId} from '../../api/Storage';
import {Button} from 'react-native-paper';

const UserScreen = ({route, navigation}) => {
  const {userId} = route.params;

  const [currentUser, setCurrentUser] = useState({id: 0});
  const [state, setState] = useState({
    loading: false,
    user: {
      firstName: 'loading',
      lastName: 'loading',
      email: 'loading',
    },
  });

  useEffect(() => {
    currentUserId(setCurrentUser);
    getUserInfo(userId, setState, navigation);
  }, [navigation, userId]);

  return (
    <View style={styles.root}>
      {!state.loading ? (
        <View style={styles.userInfo}>
          <Text style={styles.nameTextStyle}>
            {state.user.firstName}
            {'  '}
            {state.user.lastName}
          </Text>
          <Text style={styles.nameTextStyle}>{state.user.email}</Text>
        </View>
      ) : null}
      {currentUser.currentUserId === userId ? (
        <View style={styles.editButton}>
          <View style={styles.padding}>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate('Edit User', {user: state.user})
              }>
              <Text style={styles.buttonText}>{'Edit'}</Text>
            </Button>
          </View>
          <View style={styles.padding}>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate('PaymentsInfo', {userId: userId})
              }>
              <Text style={styles.buttonText}>{'Edit Payment info'}</Text>
            </Button>
          </View>
          <View style={styles.padding}>
            <Button
              mode="contained"
              onPress={async () => {
                await AsyncStorage.setItem('@ubademy:currentUserId', '')
                  .then()
                  .then(() => console.log('@ubademy:currentUserId stored'));

                await AsyncStorage.setItem('@ubademy:currentUserToken', '')
                  .then()
                  .then(() => console.log('@ubademy:currentUserToken stored'));

                navigation.navigate('Sign In');
              }}>
              <Text style={styles.buttonText}>{'Log out'}</Text>
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.editButton}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('Chat', {
                userId: currentUser.currentUserId,
                destination_id: userId,
              })
            }>
            <Text style={styles.buttonText}>{'Send message'}</Text>
          </Button>
        </View>
      )}
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
    justifyContent: 'flex-end',
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
  nameTextStyle: {
    fontSize: 32,
    color: '#A8DAFA',
    marginTop: '3%',
  },
});

export default UserScreen;
