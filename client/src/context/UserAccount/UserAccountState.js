/* eslint-disable */
import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserAccountContext from './UserAccountContext'
import UserAccountReducer from './UserAccountReducer'
import setAuthToken from '../../helper/setAuthToken';
import { Redirect } from 'react-router-dom'
import alertContext from '../alert/alertContext';
import {
  LOAD_ALL_PERMISSION_BY_USER_ID,
  LOAD_USER_ACCOUNT,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_REGISTER,
  SET_LOADING, SET_CURRENT,
  CLEAR_CURRENT, CLEAR_LOADING
} from '../type';
import GlobalLibrary from '../../helper/GlobalLibrary'

const UserAccountState = props => {
  const globalLibrary = new GlobalLibrary()
  globalLibrary.setAuthToken(localStorage.token)
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : null,
    USER_ID: globalLibrary.destructToken() ? globalLibrary.destructToken().user.USER_ID : null,
    FULL_NAME: globalLibrary.destructToken() ? globalLibrary.destructToken().user.FULL_NAME : null,
    isRegisterSuccess: false,
    userPermissions: [],
    loading: false,
    userAccounts: [],
    current: null
  };
  const { setAlert } = useContext(alertContext)
  const [state, dispatch] = useReducer(UserAccountReducer, initialState)
  const loadUserAccount = async () => {
    try {
      setLoading()
      const res = await axios.get('/api/useraccount/');
      if (!res.data.isSuccessed)
        throw new Error(res.data.message);
      dispatch({
        type: LOAD_USER_ACCOUNT,
        payload: res.data.result
      });
      setAlert('UserAccount', 'Load ' + 'Transaction Successfully', true)
    } catch (err) {
      setAlert('UserAccount', 'Load ' + err.message)
      return
    }
    clearLoading()
  }
  const loadAllPermissionByUserID = async (USER_ID) => {
    try {
      setLoading()
      const res = await axios.get('/api/useraccount/' + USER_ID);
      if (!res.data.isSuccessed)
        throw new Error(res.data.message);
      dispatch({
        type: LOAD_ALL_PERMISSION_BY_USER_ID,
        payload: res.data.forTree
      });
      setAlert('UserAccount', 'Load Permission' + 'Transaction Successfully', true)
    } catch (err) {
      setAlert('UserAccount', 'Load Permission' + err.message)
      return
    }
    clearLoading()
  }
  // Register User
  const register = async UserAccount => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    setLoading()
    try {
      const res = await axios.post('/api/useraccount/register', UserAccount, config);
      if (!res.data.isSuccessed)
        throw new Error(res.data.message);
      dispatch({
        type: REGISTER_SUCCESS,
      });
      setAlert('UserAccount', 'Loading : ' + 'Transaction Successfully', true)
      setTimeout(() => { dispatch({ type: CLEAR_REGISTER }) }, 500);
    } catch (err) {
      setAlert('UserAccount', 'Loading : ' + err.message)
    }
    clearLoading()

  };

  // Login User
  const login = async UserAccount => {
    console.log('from log in');
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      setLoading()
      const res = await axios.post('/api/useraccount/login', UserAccount, config);
      clearLoading()
      if (!res.data.isSuccessed)
        throw new Error(res.data.message);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.result[0]
      });
      setAlert('UserAccount', 'Log In : ' + 'Transaction Successfully', true)
    } catch (err) {
      setAlert('UserAccount', 'Log In : ' + err.message)
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  }
  const clearLoading = () => {
    dispatch({ type: CLEAR_LOADING });
  }
  const setCurrent = userAccount => {
    dispatch({ type: SET_CURRENT, payload: userAccount });
  }
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  }
  return (
    <UserAccountContext.Provider
      value={{
        login,
        logout,
        loadUserAccount,
        register,
        setCurrent,
        clearCurrent,
        loadAllPermissionByUserID,
        userAccounts: state.userAccounts,
        userPermissions: state.userPermissions,
        isRegisterSuccess: state.isRegisterSuccess,
        USER_ID: state.USER_ID,
        FULL_NAME: state.FULL_NAME,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        current: state.current
      }}
    >
      {props.children}
    </UserAccountContext.Provider>
  );
};

export default UserAccountState;
