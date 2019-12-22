import {
    ADD_SET,
    DELETE_SET,
    SET_CURRENT_SET,
    CLEAR_CURRENT_SET,
    UPDATE_SET,
    SET_ERROR,
    GET_MY_SETS,
    CLEAR_SETS,
    GET_ALL_SETS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_SET:
            return {
                ...state,
                sets: [...state.sets, action.payload.result],
                loading: false
            };
        case UPDATE_SET:
            return {
                ...state,
                sets: state.sets.map(set => set.id === action.payload.result.id ? action.payload.result : set),
                loading: false
            };
        case DELETE_SET:
            return {
                ...state,
                sets: state.sets.filter(set => set.id !== action.payload),
                loading: false
            };
        case SET_CURRENT_SET:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_SET:
            return {
                ...state,
                current: null
            };
        case GET_MY_SETS:
            return {
                ...state,
                sets: action.payload.result,
                loading: false
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}