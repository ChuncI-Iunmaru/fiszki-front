import React, { useReducer } from 'react';
import uuid from 'uuid';
import SetContext from "./setContext";
import setReducer from  "./setReducer";
import {
    ADD_SET,
    DELETE_SET,
    SET_CURRENT_SET,
    CLEAR_CURRENT_SET,
    UPDATE_SET,
    SET_ERROR,
    GET_SETS,
    CLEAR_SETS
} from "../types";

const SetState = props => {
  const initialState = {
      sets: [
          {
              id: 4,
              creator: 1,
              title: "NAZWA testowy zestaw",
              dailyAmount: 1,
              testQuestionsNum: 10,
              testTime: 0,
              testAttempts: 0,
              testAccessible: "ALWAYS",
              flashcards: [
                  9,
                  8
              ],
              password: "$2a$10$gWcADYz.SrIRaNOIRZhfB.kKvZ8jI3RtT3WwJoTGF3/zOokDWpf22"
          },
          {
              id: 5,
              creator: 1,
              title: "INNY testowy zestaw",
              dailyAmount: 1,
              testQuestionsNum: 10,
              testTime: 0,
              testAttempts: 0,
              testAccessible: "ALWAYS",
              flashcards: [
                  9,
                  8
              ],
              password: "$2a$10$LE3fWWIpdyoPayZBDD028eIzUIbzHXRjTw.N.Ly0lQbiElYRyxFiq"
          }]
  };

  const [state, dispatch] = useReducer(setReducer, initialState);

  // Add set

  // Delete set

  // Update set

  // Set current

  // Clear current

  // Get sets

  // Clear sets

  return (
      <SetContext.Provider
      value={{
          sets: state.sets
      }}>
          { props.children}
      </SetContext.Provider>
  )
};

export default SetState;