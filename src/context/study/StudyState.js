import React, { useReducer } from 'react';
import StudyContext from "./studyContext";
import studyReducer from "./studyReducer";
import axios from 'axios';
import {
    GET_STUDY_SESSION,
    STUDY_SESSION_ERROR,
    CLEAR_STUDY_SESSION,
    GET_SESSION_TEST_RESULTS,
    CLEAR_TEST_RESULTS,
    GET_FINAL_TEST,
    GET_FINAL_TEST_RESULTS,
    CLEAR_FINAL_TEST
} from "../types";

const StudyState = props => {
    const initialState = {
        currentSession: null,
        currentTest: null,
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

    // Clear test results
    const clearTestResults = () => {
        dispatch({type: CLEAR_TEST_RESULTS})
    };

    // Get final test for sub id
    const getFinalTest = async sub_id => {
        try {
            const res = await axios.get(`/study/test_for_sub/${sub_id}`);
            dispatch({ type: GET_FINAL_TEST, payload: res.data});
        } catch (e) {
            dispatch({type: STUDY_SESSION_ERROR, payload: e.response.data.message});
        }
    };

    // Get final test results for sub_id
    const getFinalTestResults = async (test, questions, sub_id) => {
        test.questions = questions;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post(`study/${sub_id}/check_test`, test, config);
            dispatch({ type: GET_FINAL_TEST_RESULTS, payload: res.data});
        } catch (e) {
            dispatch({type: STUDY_SESSION_ERROR, payload: e.response.data.message});
        }
    };

    // Clear current test
    const clearTest = () => {
        dispatch({type: CLEAR_FINAL_TEST})
    };

    return (
        <StudyContext.Provider value={{
            currentSession: state.currentSession,
            error: state.error,
            loading: state.loading,
            testResults: state.testResults,
            currentTest: state.currentTest,
            getStudySession,
            getStudyTestResults,
            clearCurrentSession,
            clearTestResults,
            getFinalTest,
            getFinalTestResults,
            clearTest
        }}>
            {props.children}
        </StudyContext.Provider>
    )
};

export default StudyState;