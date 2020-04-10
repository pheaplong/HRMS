import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_ERRORS
} from '../type';

export default (state, action) => {
   switch (action.type) {
      case REGISTER_SUCCESS:
         localStorage.setItem('token', action.payload)
         return {
            ...state,
            token: action.payload,
            isAuthenticated: true,
            loading: false
         }
      case LOGIN_SUCCESS:
         localStorage.setItem('token', action.payload);
         return {
            ...state,
            token: action.payload,
            isAuthenticated: true,
            loading: false
         };
      case LOGOUT:
         localStorage.removeItem('token');
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
         };
      default:
         return state;
   }
};
