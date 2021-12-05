import {chatEndpoint, deviceTokenEndpoint} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';

export const getActiveChats = (userId, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  console.log(chatEndpoint + '/' + userId);

  fetch(chatEndpoint + '/' + userId, {
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

      if (statusCode === 200) {
        console.log(data);
        setState({loading: false, userId: userId, chats: data});
      }
    })
    .catch(error => console.error(error.message));
};

export const getChat = (originId, destination_id, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let uri = chatEndpoint + '/' + originId + '/' + destination_id;

  console.log(uri);

  fetch(uri, {
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

      console.log(data);

      if (statusCode === 200) {
        setState({
          loading: false,
          originId: originId,
          destiniId: destination_id,
          messages: data,
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const sendUserDeviceToken = (user_id, user_token, user_name) => {
  let url = deviceTokenEndpoint;

  let form = {
    user_id: user_id.toString(),
    name: user_name,
    token: user_token,
  };

  console.log({form});

  fetch(url, {
    method: 'post',
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

      if (statusCode !== 200) {
        console.error(data.message);
      }
    })
    .catch(error => console.error(error.message));
};

export const sendMessageApi = state => {
  let url = chatEndpoint;

  let form = {
    origin_id: state.originId.toString(),
    destination_id: state.destiniId.toString(),
    message: state.currentMessage,
  };

  console.log({form});

  fetch(url, {
    method: 'post',
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

      if (statusCode !== 200) {
        console.error(data.message);
      }
    })
    .catch(error => console.error(error.message));
};
