import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, KeyboardAvoidingView, View } from 'react-native'
import TextButton from './TextButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
    state = {
        showQuestion: true,
        showResult: false,
        trueCounter: 0,
        index: 0
    };

    handleButtonPress = () => {
        const { showQuestion } = this.state
        this.setState({
            showQuestion: !showQuestion
        });
    }

    handleTrueOrFalse = (clickedButton, length) => {
        console.log('button clicked ' + clickedButton + "::::" + length);
        const { trueCounter, index } = this.state;
        if ((index + 1) === length) {
            this.setState({
                showResult: true,
                trueCounter: clickedButton === 'trueButton' ? trueCounter + 1 : trueCounter
            })
            clearLocalNotification();
            setLocalNotification();
        }
        else {
            this.setState({
                showQuestion: true,
                trueCounter: clickedButton === 'trueButton' ? trueCounter + 1 : trueCounter,
                index: index + 1
            });
        }
    }


    render() {
        const { deck } = this.props;
        const { showQuestion, showResult, index, trueCounter } = this.state
        const resultPercentage = (trueCounter * 100) / deck.cards.length;
        return (
            <View>
                {!showResult && (showQuestion ? <Text>{deck.cards[index].question}</Text>
                    : <Text>{deck.cards[index].answer}</Text>
                )
                }
                {!showResult && (<View>
                    <TextButton onPress={() => this.handleTrueOrFalse('trueButton', deck.cards.length)}>
                        <Text>True</Text>
                    </TextButton>
                    <TextButton onPress={() => this.handleTrueOrFalse('falseButton', deck.cards.length)}>
                        <Text>False</Text>
                    </TextButton>
                </View>)}
                {!showResult && (
                    <View>
                        <TextButton onPress={this.handleButtonPress}>
                            {showQuestion ? <Text>Show Answer</Text> : <Text>Show Question</Text>}
                        </TextButton>
                    </View>)}

                {
                    showResult && (<Text> Showing result: {resultPercentage} %</Text>)
                }
            </View>
        );
    }
}


function mapStateToProps(state, { navigation }) {
    console.log('Navigation parama ' + navigation.getParam("deck"));
    console.log(navigation.getParam("deck"))
    return {
        deck: navigation.getParam("deck")
    }
}


export default connect(mapStateToProps, null)(Quiz);