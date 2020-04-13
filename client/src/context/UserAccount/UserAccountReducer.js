import {
   REGISTER_SUCCESS,
   CLEAR_REGISTER,
   LOGIN_SUCCESS,
   LOGOUT,
   SET_LOADING,
   CLEAR_LOADING
} from '../type';
import GlobalLibrary from '../../helper/GlobalLibrary'
export default (state, action) => {
   const globalLibrary = new GlobalLibrary()
   switch (action.type) {
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
      case LOGOUT:
         localStorage.removeItem('token');
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
      default:
         return {
            ...state
         }
         break;
   }
};
