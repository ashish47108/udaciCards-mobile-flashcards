import React, { Component } from "react";
import { Text, TextInput, KeyboardAvoidingView } from "react-native";
import TextButton from "./TextButton";
import { white, gray } from "../utils/colors";
import { connect } from "react-redux";
import { createDeck } from "../actions";
import { generateId } from "../utils/helpers"
import { saveDeck } from "../utils/api";
 
class AddDeck extends Component {
    state = {
        input: ""
      };
    
    handleChange =(input) => {
        
        this.setState(() => ({
            input
          }));
    }  

    handleSubmit = () => {
    deck={
        id:generateId(),
        name: this.state.input,
        cards: [],
    }    
    this.props.createDeck(deck.id,deck.name);
    saveDeck(deck);
    console.log('deck added successfully');

    this.props.navigation.navigate("Deck", {
        deckId: deck.id,
        name: deck.name
      });
          
    this.setState(() => ({
        input: ""
      }));
        
    }

    render(){
        const { input } = this.state;

        return(
            <KeyboardAvoidingView>
            <Text>Add Deck</Text>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                value={input}
                placeholder="Deck Title"
                onChangeText={this.handleChange}
                ></TextInput>
                <TextButton onPress={this.handleSubmit}
                disabled={input === ''}
                >
                    <Text>Create Deck</Text>
                </TextButton>
            </KeyboardAvoidingView>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    createDeck: (id, deckName) => dispatch(createDeck(id, deckName))
  });

export default connect(null,mapDispatchToProps)(AddDeck);