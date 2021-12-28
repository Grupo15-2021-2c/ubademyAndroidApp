import {coursesEndPoint} from '../Parameters/EndpointsUrls';
import {getUserToken} from './Storage';
import processResponse from '../components/FetchUtilities';
import {logOutUser} from './UsersApi';

export const isCollaborator = async (
  userId,
  courseId,
  setState,
  navigation,
) => {
  let url = coursesEndPoint + '/collaborations/by-user?userId=' + userId;

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
        console.log('courseId' + courseId);
        for (let course in data.data) {
          if (data.data[course].course.id === courseId) {
            setState(prevState => {
              let modifiableState = Object.assign({}, prevState);
              modifiableState.loading = false;
              modifiableState.isCollaborator = true;
              modifiableState.info = data.data[course];
              return modifiableState;
            });
            return;
          }
        }

        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.loading = false;
          modifiableState.isCollaborator = false;
          return modifiableState;
        });
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

      console.log(data.data);

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

export const removeCollaborator = async (
  userId,
  courseId,
  navigation,
  state,
) => {
  let url =
    coursesEndPoint + '/' + courseId + '/collaborations/' + state.info.id;

  console.debug(url);

  let user = await getUserToken();

  fetch(url, {
    method: 'delete',
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
        navigation.goBack();
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};
