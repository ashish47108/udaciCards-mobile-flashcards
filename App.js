import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { Feather } from '@expo/vector-icons';
import DecksList from './src/components/DecksList'
import AddCard from './src/components/AddCard'
import AddDeck from './src/components/AddDeck'
import Deck from './src/components/Deck'
import Quiz from './src/components/Quiz'

import Constants from 'expo-constants';

import { purple, white, grey } from './src/utils/colors'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: "Decks List",
        tabBarIcon: ({ tintColor }) => (
          <Feather name="list" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <Feather name="plus" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        height: 60,
        backgroundColor: white,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      labelStyle: {
        paddingTop: 3,
        fontSize: 14,
        fontWeight: "bold"
      }
    }
  }
);

const MainNavigator = createAppContainer(createStackNavigator(
  {
    Home: Tabs,
    Deck: Deck,
    AddCard: AddCard,
    Quiz: Quiz,
    
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: purple },
      headerTitleStyle: { fontWeight: "bold" }
    }
  }
));


class App extends Component {
  render() {
  return (
    <Provider store={createStore(reducer)}>
    <View style={{flex: 1}}>
		
        <UdaciStatusBar
            backgroundColor={purple}
            barStyle="light-content"
          />
      
	  <Text>Open up App.js to start work now</Text>
    <MainNavigator />
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
