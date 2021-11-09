import {usersEndPoint} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {validateEmail} from '../Parameters/Regex';

export const getUserInfo = (userId, setState) => {
  setState({loading: true});

  console.log(usersEndPoint + '/' + userId);

  fetch(usersEndPoint + '/' + userId, {
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

      console.log(data.data);

      if (statusCode === 200) {
        setState({loading: false, user: data.data});
      }
    })
    .catch(error => console.error(error.message));
};

export const updateUser = (oldUser, newUser) => {
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

  if (form !== null) {
    fetch(usersEndPoint + '/' + oldUser.id, {
      method: 'patch',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        if (statusCode === 200) {
          showToast('Updated!');
        } else {
          showToast(data.message);
        }
      })
      .catch(error => console.log('[ERROR] ' + error.message));
  }
};
