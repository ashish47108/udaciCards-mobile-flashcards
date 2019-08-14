import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddDeck from './src/components/AddDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import DecksList from './src/components/DecksList'
import AddCard from './src/components/AddCard'

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AddCard />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;