import {GoogleSignin} from '@react-native-community/google-signin';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {googleLoginEndpoint} from '../Parameters/EndpointsUrls';
import messaging from '@react-native-firebase/messaging';
import {sendUserDeviceToken} from './MessagingApi';
import {AsyncStorage} from 'react-native';

export const googleLogin = async navigation => {
  try {
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);

    const token = {tokenId: userInfo.idToken};

    fetch(googleLoginEndpoint, {
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

          let deviceToken = await messaging().getToken();
          sendUserDeviceToken(
            data.data.user.id,
            deviceToken,
            data.data.user.firstName,
          );

          await AsyncStorage.setItem(
            '@ubademy:currentUserId',
            data.data.user.id.toString(),
          )
            .then()
            .then(() => console.log('@ubademy:currentUserId stored'));

          await AsyncStorage.setItem(
            '@ubademy:currentUserToken',
            data.data.token,
          )
            .then()
            .then(() => console.log('@ubademy:currentUserToken stored'));

          navigation.navigate('Home', {userId: data.data.user.id});
        } else {
          showToast(data.message);
        }
      })
      .catch(error => console.error(error.message));
  } catch (error) {
    console.error({error});
  }
};
