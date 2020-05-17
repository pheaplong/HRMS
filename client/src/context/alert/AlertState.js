/* eslint-disable*/
import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../type';

const AlertState = props => {
  const initialState = {tittle:'',message:'',isSuccess:false,visibility:'hidden'};

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (tittle,message, isSuccess, timeout = 5000) => {
    dispatch({
      type: SET_ALERT,
      payload: {tittle, message, isSuccess}
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
         tittle:state.tittle,
        isSuccess:state.isSuccess,
        message:state.message,
        visibility:state.visibility,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
