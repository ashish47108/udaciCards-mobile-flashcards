import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, KeyboardAvoidingView, View } from 'react-native'
import TextButton from './TextButton'
import { createCard } from '../actions'
import { saveCard } from '../utils/api'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    handleSubmit = () => {
        const deckId='e2zzcevj6c9ubljf33vn0i';
        const { question, answer } = this.state;
        console.log('The question and aswer are ' + question + '::' + answer);
        
        this.props.createCard(deckId, question, answer);
        saveCard(deckId, { question, answer });

        this.setState({
            question: "",
            answer: ""
        });
    }

    render() {
        const { question, answer } = this.state;
        return (
            <KeyboardAvoidingView>
                <KeyboardAvoidingView>
                    <Text>What's the question?</Text>
                    <TextInput
                        placeholder='Enter your question'
                        onChangeText={question => this.setState({ question })}
                        value={question} />
                </KeyboardAvoidingView>
                <KeyboardAvoidingView>
                    <Text>What's the Answer?</Text>
                    <TextInput
                        placeholder='Enter your Answer'
                        onChangeText={answer => this.setState({ answer })}
                        value={answer} />
                </KeyboardAvoidingView>
                <TextButton onPress={this.handleSubmit}
                    disabled={!(question !== '' && answer !== '')}
                >
                    <Text>Create Card</Text>
                </TextButton>
            </KeyboardAvoidingView>

        );
    }

}

const mapDispatchToProps = dispatch => ({
    createCard: (deckId, question, answer) =>
      dispatch(createCard(deckId, question, answer))
  });

export default connect(null,mapDispatchToProps)(AddCard);