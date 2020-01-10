import React, { useReducer } from 'react';
import SubscriptionContext from "./subscriptionContext";
import subscriptionReducer from "./subscriptionReducer";
import axios from 'axios';
import {
    SUBSCRIBE_TO_SET, SUBSCRIPTION_ERROR,
    UNSUBSCRIBE_SET,
    GET_MY_SUBSCRIPTIONS,
    SET_CURRENT_SUB_ID,
    CLEAR_CURRENT_SUB_ID
} from "../types";

const SubscriptionState = props => {
    const initialState = {
        subscriptions: [],
        loading: true,
        error: null,
        currentId: null
    };

    const [state, dispatch] = useReducer(subscriptionReducer, initialState);

    // Get my subscriptions (for current user in token)
    const getMySubscriptions = async () => {
        try {
            const res = await axios.get('/subscription/user');
            dispatch({ type: GET_MY_SUBSCRIPTIONS, payload: res.data});
        } catch (e) {
            dispatch({type: SUBSCRIPTION_ERROR, payload: e.response.data.message});
        }
    };

    // Subscribe to set (Add subscription)
    const subscribe = async (user, set) => {
        const subscription = {
            user: user,
            flashcardSet: set,
            learnedFlashcards: [],
            secondBox: [],
            scores: [],
            subscriptionDate: ''
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/subscription', subscription, config);
            dispatch({ type: SUBSCRIBE_TO_SET, payload: res.data});
        } catch (e) {
            dispatch({type: SUBSCRIPTION_ERROR, payload: e.response.data.message});
        }
    };

    // Unsubscribe from set (Delete subscription)
    const unsubscribe = async id => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.delete(`/subscription/${id}`);
            dispatch({ type: UNSUBSCRIBE_SET, payload: id});
        } catch (e) {
            dispatch({type: SUBSCRIPTION_ERROR, payload: e.response.data.message});
        }
    };

    // Set current subscription id
    const setCurrentId = id => {
        dispatch({ type: SET_CURRENT_SUB_ID, payload:id})
    };

    // Clear current subscription id
    const clearCurrentId = () => {
        dispatch({ type: CLEAR_CURRENT_SUB_ID})
    };

    return (
        <SubscriptionContext.Provider value={{
            subscriptions: state.subscriptions,
            loading: state.loading,
            error: state.error,
            getMySubscriptions,
            subscribe,
            unsubscribe,
            currentId: state.currentId,
            setCurrentId,
            clearCurrentId
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
};

export default SubscriptionState;