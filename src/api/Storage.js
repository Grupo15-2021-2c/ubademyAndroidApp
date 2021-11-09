import {AsyncStorage} from 'react-native';

export const currentUserId = setCurrentUser => {
  AsyncStorage.getItem('@ubademy:currentUserId').then(jsonString => {
    const jsonResponse = jsonString === null ? '' : JSON.parse(jsonString);
    setCurrentUser({currentUserId: parseInt(jsonResponse)});
  });
};
