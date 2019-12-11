import React, { useReducer } from 'react';
import uuid from 'uuid';
import FlashcardContext from "./flashcardContext";
import flashcardReducer from "./flashcardReducer";
import {
    ADD_FLASHCARD,
    DELETE_FLASHCARD,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_FLASHCARD,
    FILTER_FLASHCARDS,
    CLEAR_FILTER
} from "../types";

const FlashcardState = props => {
    const initialState = {
        flashcards: [
            {
                id: 7,
                user: 1,
                frontText: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cole_Thomas_The_Course_of_Empire_The_Savage_State_1836.jpg/1024px-Cole_Thomas_The_Course_of_Empire_The_Savage_State_1836.jpg",
                backText: "To Tylko Test",
                extraText: null,
                tags: [
                    "testowa",
                    "Integracyjna",
                    "test"
                ]
            },
            {
                id: 8,
                user: 1,
                frontText: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Black_Ant_-_02_-_Oh_K.mp3",
                backText: "To znowu Test",
                extraText: null,
                tags: [
                    "testowa",
                    "Integracyjna",
                    "test"
                ]
            },
            {
                id: 9,
                user: 1,
                frontText: "https://boards.4channel.org/a/",
                backText: "To wciąż Test",
                extraText: null,
                tags: [
                    "Integracyjna",
                    "test"
                ]
            }
        ]
    };

    const [state, dispatch] = useReducer(flashcardReducer, initialState);

    // Add flashcard

    // Delete flashcard

    // Set current flashcard

    // Clear current

    // Update flashcard

    // Filter flashcards

    // Clear filter

    return (
        <FlashcardContext.Provider  value = {{
            flashcards: state.flashcards
        }}>
            {props.children}
        </FlashcardContext.Provider>
    )
};

export default FlashcardState;
