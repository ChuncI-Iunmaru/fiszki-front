import React, { useReducer } from 'react';
import SetContext from "./setContext";
import setReducer from  "./setReducer";
import axios from 'axios';
import {
    ADD_SET,
    DELETE_SET,
    SET_CURRENT_SET,
    CLEAR_CURRENT_SET,
    UPDATE_SET,
    SET_ERROR,
    GET_MY_SETS,
    CLEAR_SETS,
    GET_ALL_SETS,
} from "../types";

const SetState = props => {
  const initialState = {
      sets: [],
      current: null,
      loading: true,
      error: null
  };

  const [state, dispatch] = useReducer(setReducer, initialState);

  // Add set
    const addSet = async (set, flashcards, creator) => {
        //console.log(creator);
        //console.log(flashcards);
        // Wymusza poprawną serializację w backendzie z JsonIdentity info - user jako obiekt może pojawić się raz, reszta id
        for (let flashcard of flashcards) {
            flashcard.user = creator.id;
        }
        set.flashcards = flashcards;
        set.creator = creator;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //console.log(set);
        try {
            const res = await axios.post('/flashcard_set', set, config);
            dispatch({ type: ADD_SET, payload: res.data});
        } catch (e) {
            dispatch({type: SET_ERROR, payload: e.response.data.message});
        }
    };

  // Delete set
    const deleteSet = async id => {
        try {
            const res = await axios.delete(`/flashcard_set/${id}`);
            dispatch({ type: DELETE_SET, payload: id});
        } catch (e) {
            dispatch({type: SET_ERROR, payload: e.response.data.message});
        }
    };

  // Update set
    const updateSet = async (set, flashcards, creator) => {
        // Jak w addSet()
        for (let flashcard of flashcards) {
            flashcard.user = creator.id;
        }
        set.flashcards = flashcards;
        set.creator = creator;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/flashcard_set/${set.id}`, set, config);
            dispatch({ type: UPDATE_SET, payload: res.data});
        } catch (e) {
            dispatch({type: SET_ERROR, payload: e.response.data.message});
        }
    };

  // Set current
    const setCurrentSet = set => {
        dispatch({type: SET_CURRENT_SET, payload: set})
    };

  // Clear current
    const clearCurrentSet = set => {
        dispatch({type: CLEAR_CURRENT_SET})
    };

  // Get sets
    const getMySets = async () => {
        try {
            const res = await axios.get('/flashcard_set');
            dispatch({ type: GET_MY_SETS, payload: res.data});
        } catch (e) {
            dispatch({type: SET_ERROR, payload: e.response.data.message});
        }
    };

  // Clear sets

  return (
      <SetContext.Provider
      value={{
          sets: state.sets,
          loading: state.loading,
          addSet,
          deleteSet,
          current: state.current,
          setCurrentSet,
          clearCurrentSet,
          updateSet,
          getMySets,
          error: state.error
      }}>
          { props.children}
      </SetContext.Provider>
  )
};

export default SetState;