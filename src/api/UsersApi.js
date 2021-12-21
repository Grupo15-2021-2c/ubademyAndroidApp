import {usersEndPoint} from '../Parameters/EndpointsUrls';
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
