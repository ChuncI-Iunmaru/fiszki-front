import {
    ADD_FLASHCARD,
    DELETE_FLASHCARD,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_FLASHCARD,
    FILTER_FLASHCARDS,
    CLEAR_FILTER,
    FLASHCARD_ERROR,
    GET_FLASHCARDS,
    CLEAR_FLASHCARDS,
    MARK_FLASHCARD,
    UNMARK_FLASHCARD,
    CLEAR_MARKED,
    SET_MARKED
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case GET_FLASHCARDS:
            return {
                ...state,
                flashcards: action.payload.result,
                loading:false
            };
        case ADD_FLASHCARD:
            return {
                ...state,
                flashcards: [action.payload.result, ...state.flashcards],
                loading:false
            };
        case UPDATE_FLASHCARD:
            return {
                ...state,
                flashcards: state.flashcards.map(flashcard => flashcard.id === action.payload.result.id ? action.payload.result : flashcard),
                loading:false
            };
        case DELETE_FLASHCARD:
            return {
                ...state,
                flashcards: state.flashcards.filter(flashcard => flashcard.id !== action.payload),
                loading:false
            };
        case CLEAR_FLASHCARDS:
            return {
                ...state,
                flashcards: null,
                filtered: null,
                error: null,
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_FLASHCARDS:
            return {
                ...state,
                filtered: action.payload.result,
                loading:false
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case MARK_FLASHCARD:
            return {
                ...state,
                marked: [action.payload, ...state.marked]
            };
        case UNMARK_FLASHCARD:
            return {
                ...state,
                marked: state.marked.filter(flashcard => flashcard.id !== action.payload)
            };
        case CLEAR_MARKED:
            return {
                ...state,
                marked: []
            };
        case SET_MARKED:
            return {
                ...state,
                marked: action.payload
            };
        case FLASHCARD_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}