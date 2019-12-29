import React, { useReducer } from 'react';
import StudyContext from "./studyContext";
import studyReducer from "./studyReducer";
import axios from 'axios';
import {
    GET_STUDY_SESSION,
    STUDY_SESSION_ERROR,
    CLEAR_STUDY_SESSION,
    GET_SESSION_TEST_RESULTS,
    CLEAR_TEST_RESULTS
} from "../types";

const StudyState = props => {
    const initialState = {
        currentSession: null,
        testResults: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(studyReducer, initialState);
    
    // Get study session for subscription id
    const getStudySession = async sub_id => {
        try {
            const res = await axios.get(`/study/for_sub/${sub_id}`);
            dispatch({ type: GET_STUDY_SESSION, payload: res.data});
        } catch (e) {
            dispatch({type: STUDY_SESSION_ERROR, payload: e.response.data.message});
        }
    };

    // Get results sending session and subscription id
    const getStudyTestResults = async (session, firstBox, secondBox, thirdBox, sub_id) => {
        session.firstBox = firstBox;
        session.secondBox = secondBox;
        session.thirdBox = thirdBox;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post(`study/${sub_id}/check_session`, session, config);
            dispatch({ type: GET_SESSION_TEST_RESULTS, payload: res.data});
        } catch (e) {
            dispatch({type: STUDY_SESSION_ERROR, payload: e.response.data.message});
        }
    };

    // Clear current session
    const clearCurrentSession = () => {
        dispatch({type: CLEAR_STUDY_SESSION})
    };
    
    return (
        <StudyContext.Provider value={{
            currentSession: state.currentSession,
            error: state.error,
            loading: state.loading,
            testResults: state.testResults,
            getStudySession,
            getStudyTestResults,
            clearCurrentSession
        }}>
            {props.children}
        </StudyContext.Provider>
    )
};

export default StudyState;