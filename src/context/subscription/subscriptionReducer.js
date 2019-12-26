import {
    SUBSCRIBE_TO_SET, SUBSCRIPTION_ERROR,
    UNSUBSCRIBE_SET,
    GET_MY_SUBSCRIPTIONS
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
        default:
            return {
                ...state
            }
    }
}