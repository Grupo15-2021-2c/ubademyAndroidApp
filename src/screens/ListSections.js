import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';

const ListSections = ({navigation}) => {
  const [enrolled, setEnrolled] = React.useState([
    {id: 1, title: 'Section A'},
    {id: 2, title: 'Section B'},
    {id: 3, title: 'Section C'},
  ]);

  return (
    <View style={styles.root}>
      <List.Section>
        {enrolled.map(item => {
          return (
            <List.Item
              key={item.id}
              title={item.title}
              titleStyle={styles.titleStyle}
              style={styles.listItem}
              onPress={() => navigation.navigate('User Screen', {id: item.id})}
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

export default ListSections;
