import {usersEndPoint} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';

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
