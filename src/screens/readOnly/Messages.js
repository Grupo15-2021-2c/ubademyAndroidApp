import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';

export const Messages = ({navigation}) => {
  const [state, setState] = React.useState({
    chats: [
      {id: 1, firstName: 'Facu'},
      {id: 2, firstName: 'Ailen'},
      {id: 3, firstName: 'Lolo'},
    ],
  });

  return (
    <View style={styles.root}>
      <List.Section>
        {state.chats.map(item => {
          return (
            <List.Item
              key={item.id}
              title={item.firstName}
              titleStyle={styles.titleStyle}
              style={styles.listItem}
              onPress={() => navigation.navigate('Chat', {id: item.id})}
            />
          );
        })}
      </List.Section>
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
