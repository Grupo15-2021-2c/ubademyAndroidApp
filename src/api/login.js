import {GoogleSignin} from '@react-native-community/google-signin';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {googleLoginEndpoint} from '../Parameters/EndpointsUrls';
import messaging from '@react-native-firebase/messaging';

export const googleLogin = async navigation => {
  try {
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);

    const token = {tokenId: userInfo.idToken};

    let url = googleLoginEndpoint;

    fetch(url, {
      method: 'post',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
      .then(processResponse)
      .then(async res => {
        const {statusCode, data} = res;

        if (statusCode === 200) {
          console.log(data);

          const token = await messaging().getToken();
          console.log({token});

          navigation.navigate('Home', {userId: data.data.id});
        } else {
          showToast(data.message);
        }
      })
      .catch(error => console.error(error.message));
  } catch (error) {
    console.error({error});
  }
};
