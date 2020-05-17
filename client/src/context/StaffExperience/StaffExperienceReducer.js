/* eslint-disable */
import {createContext} from 'react';
import { Reducer } from 'react'
import {
   ADD_STAFF_EXPERIENCE,
   LOAD_STAFF_EXPERIENCE,
   LOAD_STAFF_EXPERIENCE_BY_ID,
   UPDATE_STAFF_EXPERIENCE,
   DELETE_STAFF_EXPERIENCE,
   FILTER_STAFF_EXPERIENCE,
   CLEAR_FILTER_STAFF_EXPERIENCE,
   SET_CURRENT,
   SET_LOADING,
   CLEAR_LOADING
} from '../type'
const StaffExperienceReducer = (state, action) => {

   switch (action.type) {
      case LOAD_STAFF_EXPERIENCE:
         return {
            ...state,
            staffExperiences: action.payload,
            filterStaffExperience: action.payload,

         }
         break;
      case LOAD_STAFF_EXPERIENCE_BY_ID:
         return {
            ...state,
            staffExperiences: action.payload,
            filterStaffExperience: action.payload,
         }
         break;
      case FILTER_STAFF_EXPERIENCE:
         // console.log( 'from reducer ' +JSON.stringify(state.staffExperiences));
         let tmp = state.staffExperiences
         tmp = action.payload.searchValue !== '' ?
            tmp.filter(s => s.STF_FULLNAME.includes(action.payload.searchValue))
            : state.staffExperiences


         // tmp = action.payload.AGREE_ID != 0 ?
         //    tmp.filter(s => s.AGREE_ID == action.payload.AGREE_ID)
         //    : tmp
         return {
            ...state,
            filterStaffExperience: tmp,
            loading: false
         }
         break;
      case CLEAR_FILTER_STAFF_EXPERIENCE:
         // console.log( 'from reducer ' +JSON.stringify(state.staffExperiences));

         return {
            ...state,
            filterStaffExperience: state.staffExperiences,
            loading: false
         }
         break;
      case ADD_STAFF_EXPERIENCE:
         console.log('STF EXP redu');

         return {
            ...state,
            filterStaffExperience: [action.payload, ...state.staffExperiences],
            staffExperiences: [action.payload, ...state.staffExperiences],
         }
         break;

      case UPDATE_STAFF_EXPERIENCE:

         return {
            ...state,
            staffExperiences: state.staffExperiences.map(
               p => p.STF_EXP_ID === action.payload.STF_EXP_ID ? action.payload : p),
            filterStaffExperience: state.filterStaffExperience.map(
               p => p.REL_ID === action.payload.STF_EXP_ID ? action.payload : p)
         }
         break;
      case DELETE_STAFF_EXPERIENCE:

         return {
            ...state,
            staffExperiences: state.staffExperiences.filter(s => s.STF_EXP_ID !== action.payload.STF_EXP_ID),
            filterStaffExperience: state.filterStaffExperience.filter(s => s.STF_EXP_ID !== action.payload.STF_EXP_ID)
         }
         break;
      case SET_CURRENT:

         return {
            ...state,
            current: action.payload,
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

      default:
         return {
            ...state
         }
         break;
   }
}
export default StaffExperienceReducer;