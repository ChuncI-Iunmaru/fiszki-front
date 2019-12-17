import React, { useReducer } from 'react';
import uuid from 'uuid';
import FlashcardContext from "./flashcardContext";
import flashcardReducer from "./flashcardReducer";
import axios from 'axios';
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

const FlashcardState = props => {
    const initialState = {
        flashcards: null,
        current: null,
        filtered: null,
        marked: [],
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(flashcardReducer, initialState);

    // Get flashcards
    const getFlashcards = async () => {
        try {
            const res = await axios.get('/flashcards/user');
            dispatch({ type: GET_FLASHCARDS, payload: res.data});
        } catch (e) {
            dispatch({type: FLASHCARD_ERROR, payload: e.response.data.message});
        }
    };

    // Add flashcard
    const addFlashcard = async flashcard => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/flashcards', flashcard, config);
            dispatch({ type: ADD_FLASHCARD, payload: res.data});
        } catch (e) {
            dispatch({type: FLASHCARD_ERROR, payload: e.response.data.message});
        }
    };

    // Update flashcard
    const updateFlashcard = async flashcard => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/flashcards/${flashcard.id}`, flashcard, config);
            dispatch({ type: UPDATE_FLASHCARD, payload: res.data});
        } catch (e) {
            dispatch({type: FLASHCARD_ERROR, payload: e.response.data.message});
        }};

    // Delete flashcard
    const deleteFlashcard = async id => {
        try {
            const res = await axios.delete(`/flashcards/${id}`);
            dispatch({ type: DELETE_FLASHCARD, payload: id});
        } catch (e) {
            dispatch({type: FLASHCARD_ERROR, payload: e.response.data.message});
        }};

    // Clear flashcards
    const clearFlashcards = () => {
        dispatch({ type: CLEAR_FLASHCARDS});
    };


    // Set current flashcard
    const setCurrent = flashcard => {
        dispatch({ type: SET_CURRENT, payload: flashcard});
    };

    // Clear current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
    };

    // Filter flashcards
    const filterFlashcards = async tags => {
        try {
            const res = await axios.get(`/flashcards/tags_${tags}`);
            dispatch({ type: FILTER_FLASHCARDS, payload: res.data});
        } catch (e) {
            dispatch({type: FLASHCARD_ERROR, payload: e.response.data.message});
        }
    };

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER});
    };

    // Mark flashcard
    const markFlashcard = flashcard => {
        dispatch({ type: MARK_FLASHCARD, payload: flashcard});
    };

    // Unamark flashcard
    const unmarkFlashcard = id => {
        dispatch({ type: UNMARK_FLASHCARD, payload: id});
    };

    // Clear marked
    const clearMarked = () => {
        dispatch({ type: CLEAR_MARKED});
    };

    // Set marked
    const setMarked = markedFlashcards => {
        dispatch({ type: SET_MARKED, payload: markedFlashcards});
    };

    return (
        <FlashcardContext.Provider  value = {{
            flashcards: state.flashcards,
            addFlashcard,
            deleteFlashcard,
            current: state.current,
            clearCurrent,
            setCurrent,
            updateFlashcard,
            filtered: state.filtered,
            clearFilter,
            filterFlashcards,
            error: state.error,
            getFlashcards,
            clearFlashcards,
            markFlashcard,
            unmarkFlashcard,
            marked: state.marked,
            clearMarked,
            setMarked
        }}>
            {props.children}
        </FlashcardContext.Provider>
    )
};

export default FlashcardState;
