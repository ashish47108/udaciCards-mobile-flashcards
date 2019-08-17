import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import { green, gray, white } from "../utils/colors";

class Deck extends Component {

    render() {
        const { deck, navigation } = this.props;
        return (
            <View>
                <Text> Deck </Text>
                <View>
                    <Text>{deck.name}</Text>
                    <Text>{`${deck.cards.length} Card(s)`}</Text>
                </View>
                <View>
                    {deck.cards.length !== 0 && (
                        <TextButton
                            onPress={() => {
                                navigation.navigate("Quiz", { deck });
                            }}
                        >
                            <Text>Start Quiz</Text>
                        </TextButton>
                    )}
                    <TextButton
                        onPress={() => {
                            navigation.navigate("AddCard", { deckId: deck.id });
                        }}
                    ><Text>Add Card</Text></TextButton>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, { navigation }) => ({
    deck: state[navigation.getParam("deckId")]
})

export default connect(mapStateToProps,null)(Deck);