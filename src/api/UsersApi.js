import {paymentsUsers, usersEndPoint} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {validateEmail} from '../Parameters/Regex';
import {getUserToken} from './Storage';
import {AsyncStorage} from 'react-native';

export const getUserInfo = async (userId, setState, navigation) => {
  setState({loading: true});

  let user = await getUserToken();

  console.log(usersEndPoint + '/' + userId);

  fetch(usersEndPoint + '/' + userId, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        setState({loading: false, user: data.data});
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const updateUser = async (oldUser, newUser, navigation) => {
  let form = null;
  if (oldUser.firstName !== newUser.firstName && newUser.firstName !== '') {
    form = {firstName: newUser.firstName};
  }
  if (oldUser.lastName !== newUser.lastName && newUser.lastName !== '') {
    form = {...form, lastName: newUser.lastName};
  }
  if (oldUser.email !== newUser.email && validateEmail(newUser.email)) {
    form = {...form, email: newUser.email};
  }

  let user = await getUserToken();

  if (form !== null) {
    fetch(usersEndPoint + '/' + oldUser.id, {
      method: 'patch',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(form),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        if (statusCode === 200) {
          showToast('Updated!');
        } else if (data.message === 'JwtParseError: Jwt is expired') {
          logOutUser(navigation);
        } else {
          showToast(data.message);
        }
      })
      .catch(error => console.log('[ERROR] ' + error.message));
  }
};

export const logOutUser = async navigation => {
  await AsyncStorage.setItem('@ubademy:currentUserId', '')
    .then()
    .then(() => console.log('@ubademy:currentUserId stored'));

  await AsyncStorage.setItem('@ubademy:currentUserToken', '')
    .then()
    .then(() => console.log('@ubademy:currentUserToken stored'));

  navigation.navigate('Sign In');
};

export const getUserSubscriptionType = (setUser, userId) => {
  let url = paymentsUsers + '/' + userId + '/deposit';
  console.debug(url);

  fetch(url, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.debug('getUserSubscriptionType');
      console.debug('statusCode: ' + statusCode);
      console.debug(data);

      if (statusCode === 200) {
        setUser(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loading = false;
          modifiableState.subscriptionId = 2;
          return modifiableState;
        });
      } else {
        setUser(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loading = false;
          modifiableState.subscriptionId = 1;
          return modifiableState;
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const getUserWallet = (userId, setState) => {
  let url = paymentsUsers + '/' + userId + '/wallet';
  console.debug(url);

  fetch(url, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.debug('statusCode: ' + statusCode);
      console.debug(data);

      if (statusCode === 200) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loading = false;
          modifiableState.wallet = data.data.address;
          return modifiableState;
        });
      } else if (statusCode === 404) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loading = false;
          return modifiableState;
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const createWallet = (userId, setState) => {
  let url = paymentsUsers + '/' + userId + '/wallet';
  console.debug(url);

  fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.debug('statusCode: ' + statusCode);
      console.debug(data);

      if (statusCode === 200) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.wallet = data.address;
          return modifiableState;
        });
      } else if (statusCode === 404) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loading = false;
          modifiableState.wallet = null;
          return modifiableState;
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const isPremium = (userId, setState) => {
  let url = paymentsUsers + '/' + userId + '/deposit';
  console.debug(url);

  fetch(url, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.debug('statusCode: ' + statusCode);
      console.debug(data);

      if (statusCode === 200) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loadingPremium = false;
          modifiableState.premium = true;
          return modifiableState;
        });
      } else {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loadingPremium = false;
          modifiableState.premium = false;
          return modifiableState;
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const payPremium = (userId, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loadingPremium = true;
    return modifiableState;
  });

  let url = paymentsUsers + '/' + userId + '/deposit';
  console.debug(url);

  fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({amountInEthers: '0.001'}),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.debug('statusCode: ' + statusCode);
      console.debug(data);

      if (statusCode === 200) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loadingPremium = false;
          modifiableState.premium = true;
          return modifiableState;
        });
      }
    })
    .catch(error => console.error(error.message));
};
