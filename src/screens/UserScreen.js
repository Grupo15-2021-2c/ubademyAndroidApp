import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getUserInfo} from '../api/UsersApi';

const UserScreen = ({route, navigation}) => {
  const {userId} = route.params;

  const [state, setState] = useState({
    loading: false,
    user: {
      firstName: 'loading',
      lastName: 'loading',
      email: 'loading',
    },
  });

  useEffect(() => {
    getUserInfo(userId, setState);
  }, [userId]);

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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
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
    flex: 0.25,
    backgroundColor: '#A8DAFA',
  },
  nameTextStyle: {
    fontSize: 32,
    color: '#A8DAFA',
    marginTop: '3%',
  },
});

export default UserScreen;
