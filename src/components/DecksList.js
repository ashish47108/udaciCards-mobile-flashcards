import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveDecks } from '../utils/api';
import { receiveDecks } from "../actions";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

class DecksList extends Component {
    state = {
        loadingComplete: false
    };
    componentDidMount() {
        retrieveDecks()
            .then(decks => this.props.receiveDecks(decks))
            .then(() => {
                this.setState({ loadingComplete: true });
            });
    }

    render() {
        const { decks } = this.props;

        if (!this.state.loadingComplete) {
            return (
                <View>
                    <Text>Loading Decks..</Text>
                </View>
            );
        }
        else {
            return Object.values(decks).length > 0 ? (
                <View>
                    {console.log(decks)}
                    {console.log('=================')}
                    {console.log(Object.values(decks))}
                    <Text>Loading Decks complete ....</Text>
                    <FlatList
                        data={Object.values(decks)}
                        keyExtractor={(item, index) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                            onPress={() => console.log('Item is is ' + item.id +'::' + item.name) }
                             >
                                <Text >{item.name}</Text>
                                <Text>{`${item.cards.length} card(s) `}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) :
                (
                    <View>
                        <Text style={{ fontSize: 16 }}>You don't have any decks.</Text>
                        <Text style={{ fontSize: 16 }}>Click on Add Decks to add the same.</Text>
                    </View>
                );
        }

    }

}

const mapStateToProps = (decks) => ({
    decks
});

const mapDispatchToProps = dispatch => ({
    receiveDecks: decks => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksList);