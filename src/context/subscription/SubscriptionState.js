import React, { useReducer } from 'react';
import SubscriptionContext from "./subscriptionContext";
import subscriptionReducer from "./subscriptionReducer";

const SubscriptionState = props => {
    const initialState = {
        subscriptions: [
            {
                id: 1,
                user: {
                    id: 1,
                    username: "testowy",
                    email: "test@gmail.com",
                    role: "user"
                },
                flashcardSet: {
                    id: 2,
                    creator: 1,
                    title: "Edytowany testowy zestaw",
                    dailyAmount: 1,
                    testQuestionsNum: 10,
                    testTime: 0,
                    testAttempts: 0,
                    testAccessible: "ALWAYS",
                    flashcards: [ 1,2],
                    password: "$2a$10$Fcbi1zMwjgXyH/9hL17jo.OXKAiKTZ6g4xKQgV3uPw1Ftjf2vcTjG"
                },
                learnedFlashcards: [
                    1,
                    2,
                ],
                scores: [
                    {
                        id: 1,
                        score: 88,
                        date: "2019-11-27"
                    }
                ],
                subscriptionDate: "2019-11-26T14:42:48.000+0000"
            }
        ]
    };

    const [state, dispatch] = useReducer(subscriptionReducer, initialState);

    return (
        <SubscriptionContext.Provider value={{
            subscriptions: state.subscriptions
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
};

export default SubscriptionState;