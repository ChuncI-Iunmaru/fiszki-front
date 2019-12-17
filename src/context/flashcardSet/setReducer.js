import {
    ADD_SET,
    DELETE_SET,
    SET_CURRENT_SET,
    CLEAR_CURRENT_SET,
    UPDATE_SET,
    SET_ERROR,
    GET_SETS,
    CLEAR_SETS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_SET:
            return {
                ...state,
                sets: [...state.sets, action.payload]
            };
        case UPDATE_SET:
            return {
                ...state,
                sets: state.sets.map(set => set.id === action.payload.id ? action.payload : set)
            };
        case DELETE_SET:
            return {
                ...state,
                sets: state.sets.filter(set => set.id !== action.payload)
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
        default:
            return state;
    }
}