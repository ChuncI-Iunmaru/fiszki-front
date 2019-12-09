import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            console.log('User loaded');
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.result
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('Register success');
            localStorage.setItem('token', action.payload.result.token);
            return {
                ...state,
                ...action.payload.result.token,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            console.log('Auth/register error');
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            console.log('Clear errors');
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}