import {AsyncStorage} from 'react-native';

export const currentUserId = setCurrentUser => {
  AsyncStorage.getItem('@ubademy:currentUserId').then(jsonString => {
    const jsonResponse = jsonString === null ? '' : JSON.parse(jsonString);
    setCurrentUser({currentUserId: parseInt(jsonResponse)});
  });
};

export const loadedUserId = async () => {
  let jsonString = await AsyncStorage.getItem('@ubademy:currentUserId');
  const jsonResponse = jsonString === null ? '' : JSON.parse(jsonString);
  return {currentUserId: parseInt(jsonResponse)};
};

export const getUserToken = async () => {
  let jsonString = await AsyncStorage.getItem('@ubademy:currentUserToken');
  console.log(jsonString);
  const jsonResponse = jsonString === null ? '' : jsonString;
  return {token: jsonResponse};
};
