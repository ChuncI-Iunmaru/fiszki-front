import React, { useReducer } from 'react';
import StudyContext from "./studyContext";
import studyReducer from "./studyReducer";
import axios from 'axios';

const StudyState = props => {
    const initialState = {
        currentSession: {
            flashcards: [
                {
                    id: 22,
                    user: {
                        id: 23,
                        username: "test",
                        email: "test@gmail.com",
                        role: "student"
                    },
                    frontText: "dragon",
                    backText: "smok",
                    extraText: "",
                    tags: [
                        "ang-pol"
                    ]
                },
                {
                    id: 20,
                    user: 23,
                    frontText: "raven",
                    backText: "kruk",
                    extraText: "",
                    tags: [
                        "ang-pol"
                    ]
                },
                {
                    id: 26,
                    user: 23,
                    frontText: "bee",
                    backText: "pszczoła",
                    extraText: "",
                    tags: [
                        "ang-pol"
                    ]
                },
                {
                    id: 23,
                    user: 23,
                    frontText: "dog",
                    backText: "pies",
                    extraText: "",
                    tags: [
                        "ang-pol"
                    ]
                },
                {
                    id: 18,
                    user: 23,
                    frontText: "cat",
                    backText: "kot",
                    extraText: "",
                    tags: [
                        "ang-pol"
                    ]
                },
                {
                    id: 24,
                    user: 23,
                    frontText: "moth",
                    backText: "ćma",
                    extraText: "",
                    tags: [
                        "ang-pol"
                    ]
                }
            ],
            firstBox: [
                {
                    flashcardId: 22,
                    question: "dragon",
                    answers: [
                        "smok",
                        "kruk",
                        "pies",
                        "ćma"
                    ],
                    correctAnswer: "smok",
                    givenAnswer: "",
                    correct: false
                },
                {
                    flashcardId: 20,
                    question: "raven",
                    answers: [
                        "osa",
                        "kruk",
                        "smok",
                        "krowa"
                    ],
                    correctAnswer: "kruk",
                    givenAnswer: "",
                    correct: false
                },
                {
                    flashcardId: 26,
                    question: "bee",
                    answers: [
                        "wrona",
                        "ćma",
                        "kot",
                        "pszczoła"
                    ],
                    correctAnswer: "pszczoła",
                    givenAnswer: "",
                    correct: false
                },
                {
                    flashcardId: 23,
                    question: "dog",
                    answers: [
                        "pszczoła",
                        "wrona",
                        "pies",
                        "kot"
                    ],
                    correctAnswer: "pies",
                    givenAnswer: "",
                    correct: false
                },
                {
                    flashcardId: 18,
                    question: "cat",
                    answers: [
                        "kot",
                        "pszczoła",
                        "pies",
                        "wrona"
                    ],
                    correctAnswer: "kot",
                    givenAnswer: "",
                    correct: false
                }
            ],
            secondBox: [
                {
                    flashcardId: 24,
                    question: "moth",
                    answers: [
                        "mysz",
                        "krowa",
                        "pies",
                        "ćma"
                    ],
                    correctAnswer: "ćma",
                    givenAnswer: "",
                    correct: false
                }
            ],
            thirdBox: []
        },
        error: null,
        //Przy podpinaniu do back zmienić na true
        loading: false
    };

    const [state, dispatch] = useReducer(studyReducer, initialState);
    
    // Get study session for subscription id
    
    // Get results sending session and subscription id
    
    // Clear current session
    
    return (
        <StudyContext.Provider value={{
            currentSession: state.currentSession,
            error: state.error,
            loading: state.loading
        }}>
            {props.children}
        </StudyContext.Provider>
    )
};

export default StudyState;