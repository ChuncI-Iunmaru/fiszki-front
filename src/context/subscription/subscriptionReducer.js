import {
    SUBSCRIBE_TO_SET, SUBSCRIPTION_ERROR,
    UNSUBSCRIBE_SET,
    GET_MY_SUBSCRIPTIONS, SET_CURRENT_SUB_ID, CLEAR_CURRENT_SUB_ID
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_MY_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.payload.result,
                loading: false
            };
        case SUBSCRIBE_TO_SET:
            return {
                ...state,
                subscriptions: [...state.subscriptions, action.payload.result],
                loading: false
            };
        case UNSUBSCRIBE_SET:
            return {
                ...state,
                subscriptions: state.subscriptions.filter(subscription => subscription.id !== action.payload),
                loading: false
            };
        case SET_CURRENT_SUB_ID:
            return {
                ...state,
                currentId: action.payload
            };
        case CLEAR_CURRENT_SUB_ID:
            return {
                ...state,
                currentId: null
            };
        case SUBSCRIPTION_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return {
                ...state
            }
    }
}