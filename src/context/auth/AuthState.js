import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

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

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () =>{
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        console.log('Loading user');
        try {
            const res = await axios.get('/users');

            dispatch({
               type: USER_LOADED,
               payload: res.data
            });
        } catch (e) {
            dispatch({type: AUTH_ERROR, payload: e});
        }
    };

    // Register User
    //UWAGA Na strukturę odpowiedzi -> dane są w data.result, nie samo data.
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const userData = {
            username: formData.name,
            password: formData.password,
            email: formData.email,
            role: formData.role
        };
        try {
            const res = await axios.post('/token/signup', userData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
            //Rejestruje pomyślnie, ale nie zapisuje od razu tokena w stanie, przez co nie może później załadować?
        } catch (e) {
            dispatch({
                type: REGISTER_FAIL,
                payload: e.response.data.message
            });
        }
    };

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const userData = {
            username: formData.name,
            password: formData.password,
        };
        try {
            const res = await axios.post('/token/generate-token', userData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (e) {
            dispatch({
                type: LOGIN_FAIL,
                payload: e.response.data.msg
            });
        }
    };

    // Logout
    const logout = () => dispatch({type: LOGOUT});

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS});

    return (
        <authContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;