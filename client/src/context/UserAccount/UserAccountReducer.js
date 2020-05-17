/* eslint-disable*/
import {
  LOAD_ALL_PERMISSION_BY_USER_ID,
  LOAD_USER_ACCOUNT,
  REGISTER_SUCCESS,
  CLEAR_REGISTER,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
  CLEAR_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../type';
import GlobalLibrary from '../../helper/GlobalLibrary'
export default (state, action) => {
  const globalLibrary = new GlobalLibrary()
  switch (action.type) {
    case LOAD_USER_ACCOUNT:
      return {
        ...state,
        userAccounts: action.payload,
      }
    case LOAD_ALL_PERMISSION_BY_USER_ID:
      return {
        ...state,
        userPermissions: action.payload,
      }
      break;
      break;
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
        isRegisterSuccess: true
      }
      break;
    case CLEAR_REGISTER:
      return {
        ...state,
        isRegisterSuccess: false
      }
      break;
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      globalLibrary.setAuthToken(action.payload.token)
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        USER_ID: action.payload.USER_ID,
        FULL_NAME: action.payload.FULL_NAME,
        loading: false
      };
    case LOGOUT: localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        USER_ID: '',
        FULL_NAME: '',
        loading: false,
      };
      break;
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
      break;
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false
      }
      break;
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
      break;
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
      break;
    default:
      return {
        ...state
      }
      break;
  }
};
