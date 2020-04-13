import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserAccountContext from './UserAccountContext'
import UserAccountReducer from './UserAccountReducer'
import setAuthToken from '../../helper/setAuthToken';
import { Redirect } from 'react-router-dom'
import alertContext from '../alert/alertContext';
import {
   REGISTER_SUCCESS,
   LOGIN_SUCCESS,
   LOGOUT,
   CLEAR_REGISTER,
   SET_LOADING,
   CLEAR_LOADING
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
      loading: false,
   };
   const { setAlert } = useContext(alertContext)
   const [state, dispatch] = useReducer(UserAccountReducer, initialState)
   // Register User
   const register = async UserAccount => {
      console.log('from register');
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
         console.log(JSON.stringify(res.data.result[0]
         ))
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
         if (!res.data.isSuccessed)
            throw new Error(res.data.message);
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.result[0]
         });
         console.log(res.data.result[0].token);

         setAlert('UserAccount', 'Log In : ' + 'Transaction Successfully', true)
      } catch (err) {
         console.log(err);

         setAlert('UserAccount', 'Log In : ' + err.message)
      }
      clearLoading()
   };

   // Logout
   const logout = () => dispatch({ type: LOGOUT });

   const setLoading = () => {
      dispatch({ type: SET_LOADING });
   }
   const clearLoading = () => {
      dispatch({ type: CLEAR_LOADING });
   }

   return (
      <UserAccountContext.Provider
         value={{
            login,
            logout,
            register,
            token: state.token,
            isRegisterSuccess: state.isRegisterSuccess,
            USER_ID: state.USER_ID,
            FULL_NAME: state.FULL_NAME,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
         }}
      >
         {props.children}
      </UserAccountContext.Provider>
   );
};

export default UserAccountState;
