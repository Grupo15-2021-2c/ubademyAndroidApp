import {coursesEndPoint, creatorsEndPoint} from '../Parameters/EndpointsUrls';
import {getUserToken} from './Storage';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {logOutUser} from './UsersApi';

export const isCollaborator = async (
  userId,
  courseId,
  setState,
  navigation,
) => {
  let url =
    coursesEndPoint + '/' + courseId + '/collaborations?userId=' + userId;

  let user = await getUserToken();

  fetch(url, {
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
        if (data.data.length > 0) {
          setState(prevState => {
            let modifiableState = Object.assign({}, prevState);
            modifiableState.loading = false;
            modifiableState.isCollaborator = true;
            return modifiableState;
          });
        } else {
          setState(prevState => {
            let modifiableState = Object.assign({}, prevState);
            modifiableState.loading = false;
            modifiableState.isCollaborator = false;
            return modifiableState;
          });
        }
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const makeCollaborator = async (userId, courseId, navigation) => {
  let url =
    coursesEndPoint + '/' + courseId + '/collaborations?userId=' + userId;

  let user = await getUserToken();

  let form = {
    courseId: courseId,
    userId: userId,
  };

  fetch(url, {
    method: 'post',
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

      console.log(data);

      if (statusCode === 200) {
        navigation.goBack();
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const getMyCollaborations = async (setState, userId, navigation) => {
  setState({loading: true});

  let user = await getUserToken();

  console.log('userId ' + userId);

  fetch(coursesEndPoint + '/collaborations/by-user?userId=' + userId, {
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
        setState({
          loading: false,
          courses: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};