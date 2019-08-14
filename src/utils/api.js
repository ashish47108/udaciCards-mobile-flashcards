import { AsyncStorage } from "react-native";
export const UDACICARDS_STORAGE_KEY = "UdaciCards:FlashCards";

export const saveDeck= (deck) => {
   console.log('before saving ');
   console.log(deck);
   console.log(JSON.stringify({ [deck.id]: deck }));
   
   return AsyncStorage.mergeItem(
        UDACICARDS_STORAGE_KEY,
        JSON.stringify({ [deck.id]: deck })
   ) 
}

export const retrieveDecks = () => {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(
        results => {
            const data = JSON.parse(results);
            return data;
        })
}

export const saveCard = (deckId, card) => {
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY).then(results=> {
        const data =JSON.parse(results);
        data[deckId]={
            ...data[deckId],
            cards:[
            ...data[deckId].cards,
            {question: card.question, answer: card.answer}
            ]
        };
        AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(data));  
    });
}