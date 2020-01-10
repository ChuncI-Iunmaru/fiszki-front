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
    FILTER_SETS,
    CLEAR_SET_FILTER
} from "../types";

const SetState = props => {
  const initialState = {
      sets: [],
      current: null,
      loading: true,
      error: null,
      filtered: null
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
            // eslint-disable-next-line no-unused-vars
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

  // Get all sets
    const getAllSets = async () => {
        try {
            const res = await axios.get('/flashcard_set/all_sets');
            dispatch({ type: GET_ALL_SETS, payload: res.data});
        } catch (e) {
            dispatch({type: SET_ERROR, payload: e.response.data.message});
        }
    };

    const getMySets = async () => {
        try {
            const res = await axios.get('/flashcard_set');
            dispatch({ type: GET_MY_SETS, payload: res.data});
        } catch (e) {
            dispatch({type: SET_ERROR, payload: e.response.data.message});
        }
    };

  // Clear sets

    // Filter contacts
    const filterSets = text => {
        dispatch({type: FILTER_SETS, payload: text});
    };

    // Clear filter
    const clearSetFilter = () => {
        dispatch({type: CLEAR_SET_FILTER})
    };

    // Clear sets
    const clearSets = () => {
        dispatch({type: CLEAR_SETS});
    };

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
          error: state.error,
          filtered: state.filtered,
          filterSets,
          clearSetFilter,
          getAllSets,
          clearSets
      }}>
          { props.children}
      </SetContext.Provider>
  )
};

export default SetState;