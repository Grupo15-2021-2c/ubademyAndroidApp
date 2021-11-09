import {ToastAndroid} from 'react-native';

const showToast = text => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

export default showToast;
