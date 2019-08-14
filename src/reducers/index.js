import { CREATE_DECK, RECEIVE_DECKS, CREATE_CARD } from "../actions";

const initialState = null;

const decks = (state = initialState, action) => {
    console.log('State is following');
    console.log(state);
    switch (action.type) {
        case CREATE_DECK :
            return {
                ...state,
                [action.id] : {
                    id:action.id,
                    name:action.name,
                    cards: [],
                }
            }
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case CREATE_CARD:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    cards:[
                        ...state[action.deckId].cards,
                        {question: action.question, answer: action.answer}
                    ]
                }
            }
        default:
            return state;
    }
}


export default decks;