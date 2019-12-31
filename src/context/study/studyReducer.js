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

export default (state, action) => {
    switch (action.type) {
        case GET_STUDY_SESSION:
            return {
                ...state,
                currentSession: action.payload.result,
                loading: false
            };
        case STUDY_SESSION_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_STUDY_SESSION:
            return {
                ...state,
                currentSession: null,
                loading: true
            };
        case GET_SESSION_TEST_RESULTS:
            return {
                ...state,
                testResults: action.payload.result,
                loading: false
            };
        case CLEAR_TEST_RESULTS:
            return {
                ...state,
                testResults: null
            };
        case GET_FINAL_TEST:
            return {
                ...state,
                currentTest: action.payload.result,
                loading: false
            };
        case GET_FINAL_TEST_RESULTS:
            return {
                ...state,
                testResults: action.payload.result,
                loading: false
            };
        case CLEAR_FINAL_TEST:
            return {
                ...state,
                currentTest: null,
                loading: true
            };
        default:
            return {
                ...state
            };
    }
}