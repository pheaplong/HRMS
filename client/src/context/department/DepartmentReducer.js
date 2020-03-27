import { Reducer } from 'react'
import {
   ADD_DEPARTMENT,
   LOAD_DEPARTMENT_BY_ID,
   LOAD_DEPARTMENT,
   SET_LOADING,
   CLEAR_LOADING,
   ERROR
} from '../type'
const DepartmentReducer = (state, action) => {
   switch (action.type) {
      case LOAD_DEPARTMENT:

         return {
            ...state,
            departments: action.payload,
            loading: false
         }
         break;
      case LOAD_DEPARTMENT_BY_ID:

         return {
            ...state,
            department: action.payload[0],
            loading: false
         }
         break;
      case ADD_DEPARTMENT:

         return {
            ...state,
            departments: [action.payload, ...state.departments],
            department:{dep_name:'',dep_desc:''}
         }
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
      case ERROR:
         return {
            ...state,
            loading: false,
            message: action.payload
         }

      default:
         return {
            ...state
         }
         break;
   }
}
export default DepartmentReducer;