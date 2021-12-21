import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import {getActiveChats} from '../../api/MessagingApi';

export const Messages = ({route, navigation}) => {
  const {userId} = route.params;

  const [state, setState] = React.useState({
    userId: userId,
    loading: true,
    chats: [],
  });

  useEffect(() => {
    getActiveChats(state.userId, setState);
  }, [state.userId]);

  return (
    <View style={styles.root}>
      {state.loading === false ? (
        <List.Section>
          {state.chats.map(item => {
            return (
              <List.Item
                key={parseInt(item.user_id, 10)}
                title={item.name}
                titleStyle={styles.titleStyle}
                style={styles.listItem}
                onPress={() =>
                  navigation.navigate('Chat', {
                    userId: state.userId,
                    destination_id: parseInt(item.user_id, 10),
                  })
                }
              />
            );
          })}
        </List.Section>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#1d3557',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#1d3557',
  },
  listItem: {
    margin: '2%',
    backgroundColor: '#A8DAFA',
  },
});
