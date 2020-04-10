import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import UserAccountContext from './UserAccountContext'
import UserAccountReducer from './UserAccountReducer'
import setAuthToken from '../../helper/setAuthToken';
import alertContext from '../alert/alertContext';
import {
   REGISTER_SUCCESS,
   LOGIN_SUCCESS,
   LOGOUT,
   SET_LOADING,
   CLEAR_LOADING
} from '../type';

const UserAccountState = props => {
   const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: false,
   };
   const { setAlert } = useContext(alertContext)
   const [state, dispatch] = useReducer(UserAccountReducer, initialState)
   // Register User
   const register = async UserAccount => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.post('/api/useraccount/register', UserAccount, config);
         if (!res.data.isSuccessed)
            throw res;
         dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
         });
         setAlert('UserAccount', 'Loading : ' + 'Transaction Successfully', true)
      } catch (err) {
         setAlert('UserAccount', 'Loading : ' + err.data.message)
      }
   };

   // Login User
   const login = async UserAccount => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };

      try {
         const res = await axios.post('/api/login', UserAccount, config);
         if (!res.data.isSuccessed)
            throw res;
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
         });

      } catch (err) {
         setAlert('UserAccount', 'Loading : ' + err.data.message)
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

   return (
      <UserAccountContext.Provider
         value={{
            login,
            logout,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
         }}
      >
         {props.children}
      </UserAccountContext.Provider>
   );
};

export default UserAccountState;
