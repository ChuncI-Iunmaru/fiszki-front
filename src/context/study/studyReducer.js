import {GET_STUDY_SESSION, STUDY_SESSION_ERROR, CLEAR_STUDY_SESSION, GET_SESSION_TEST_RESULTS, CLEAR_TEST_RESULTS} from "../types";

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
                currentSession: null
            };
        case GET_SESSION_TEST_RESULTS:
            return {
                ...state,
                testResults: action.payload.result,
                loading: false
            };
        default:
            return {
                ...state
            };
    }
}