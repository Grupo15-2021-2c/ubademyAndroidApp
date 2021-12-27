import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {
  createWallet,
  getUserInfo,
  getUserWallet,
  isPremium,
  payPremium,
} from '../../api/UsersApi';
import {currentUserId} from '../../api/Storage';
import {Button} from 'react-native-paper';

export const PaymentsInfo = ({route, navigation}) => {
  const {userId} = route.params;

  const [state, setState] = useState({
    loading: true,
    wallet: null,
    userId: userId,
    loadingPremium: true,
    premium: false,
  });

  useEffect(() => {
    getUserWallet(userId, setState);
    isPremium(userId, setState);
  }, [userId, state.wallet]);

  const PayButton = () => {
    if (state.loadingPremium === false) {
      if (state.premium) {
        return (
          <View style={styles.padding}>
            <Text style={styles.text}>{'Your account is premium'}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.root}>
            <View style={styles.padding}>
              <Text style={styles.nameTextStyle}>{'Your account is free'}</Text>
            </View>
            <View style={styles.padding}>
              <Button
                mode="contained"
                onPress={() => payPremium(state.userId, setState)}>
                <Text style={styles.buttonText}>{'Pay for premium'}</Text>
              </Button>
            </View>
            <View style={styles.padding}>
              <Text style={styles.nameTextStyle}>
                {'You can become premium for only 0.001 HET'}
              </Text>
            </View>
          </View>
        );
      }
    }
    return null;
  };

  const ShowPaymentInfo = () => {
    if (state.wallet !== null) {
      return (
        <View style={styles.root}>
          <View style={styles.userInfo}>
            <Text style={styles.text}>{'Your wallet address is:'}</Text>
            <Text style={styles.nameTextStyle}>{state.wallet}</Text>
          </View>
          <PayButton />
        </View>
      );
    }
    return (
      <View style={styles.root}>
        <View style={styles.userInfo}>
          <Text style={styles.nameTextStyle}>{'User has no wallet'}</Text>
        </View>
        <View style={styles.padding}>
          <Button
            mode="contained"
            onPress={() => createWallet(userId, setState)}>
            <Text style={styles.buttonText}>{'Creat Wallet'}</Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {!state.loading ? <ShowPaymentInfo /> : null}
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
    flex: 1,
    alignItems: 'center',
    marginTop: '55%',
  },
  margin: {
    flex: 1,
    color: '#A8DAFA',
    margin: '5%',
  },
  padding: {
    flex: 1,
    margin: '5%',
  },
  nameTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#A8DAFA',
    marginTop: '3%',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: '#A8DAFA',
  },
});
