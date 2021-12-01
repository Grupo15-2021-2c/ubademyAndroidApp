import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

export const EditExam = ({route, navigation}) => {
  const [state, setState] = useState({
    exam: {
      id: 1,
      courseId: 2,
      sectionId: 3,
      title: 'Primer parcial',
      questions: [
        {
          id: 0,
          examId: 1,
          text: '¿Me perdonas?',
        },
      ],
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.addButton}>
          <Text style={styles.title}>{state.exam.title}</Text>
        </View>
        {state.exam.questions.map(item => {
          return (
            <View key={item.id} style={styles.addButton}>
              <Text style={styles.question}>{item.text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d3557',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    margin: '2%',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#A8DAFA',
  },
  question: {
    fontSize: 18,
    color: '#A8DAFA',
  },
});
