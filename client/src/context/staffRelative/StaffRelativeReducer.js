/* eslint-disable*/
import {Reducer} from 'react'
import { LOAD_STAFF_RELATIVE,
   LOAD_STAFF_RELATIVE_BY_STAFF_ID,
   FILTER_STAFF_RELATIVE,
   ADD_STAFF_RELATIVE,
   ADD_STAFF_RELATIVE_BY_STAFF_ID,
   UPDATE_STAFF_RELATIVE,
   UPDATE_STAFF_RELATIVE_BY_STAFF_ID,
   DELETE_STAFF_RELATIVE,
   DELETE_STAFF_RELATIVE_BY_STAFF_ID,
   SET_CURRENT,
   CLEAR_CURRENT,
   SET_LOADING,
   CLEAR_LOADING} from '../type'
const StaffRelativeReducer=(state,action)=>{
   switch (action.type) {
      case LOAD_STAFF_RELATIVE:

         return {
            ...state,
            staffRelatives: action.payload,
            filterStaffRelative: action.payload,
            loading: false
         }
         break;
      case LOAD_STAFF_RELATIVE_BY_STAFF_ID:
         console.log('fliter by stf_id');
         return {
            ...state,
            staffRelativesByStfID:action.payload,
            //.find(s=>s.stf_id===action.payload.ID),
            loading: false
         }
         break;
      case FILTER_STAFF_RELATIVE:
         console.log('stf fliter');
         console.log(JSON.stringify(action.payload,null,2));
         let tmp=state.staffRelatives
         tmp = action.payload.searchValue !=='' ?
            tmp.filter(s=> s.REL_FN.concat(s.REL_LN).includes(action.payload.searchValue) 
                           || s.STAFF.includes(action.payload.searchValue))
            : state.staffRelatives
           
            
         tmp = action.payload.RELATION_ID !=0 ?
             tmp.filter(s=>s.RELATION_ID==action.payload.RELATION_ID)
            : tmp   
      return{
            ...state,
            filterStaffRelative:tmp,
         }
      case ADD_STAFF_RELATIVE:

         return {
            ...state,
            staffRelatives: [action.payload, ...state.staffRelatives],
            filterStaffRelative: [action.payload, ...state.filterStaffRelative]
         }
         break;
      case ADD_STAFF_RELATIVE_BY_STAFF_ID:

         return {
            ...state,
            staffRelativesByStfID: [action.payload, ...state.staffRelativesByStfID]
         }
         break;
      case UPDATE_STAFF_RELATIVE_BY_STAFF_ID:

         return {
            ...state,
            staffRelativesByStfID:state.staffRelativesByStfID.map(
               p=>p.REL_ID ===action.payload.REL_ID ? action.payload: p)
         }
         break;
      case UPDATE_STAFF_RELATIVE:

         return {
            ...state,
            staffRelatives:state.staffRelatives.map(
               p=>p.REL_ID ===action.payload.REL_ID ? action.payload: p),
            filterStaffRelative:state.filterStaffRelative.map(
            p=>p.REL_ID ===action.payload.REL_ID ? action.payload: p)
         }
         break;
         case DELETE_STAFF_RELATIVE:
            
            return {
               ...state,
               staffRelatives:state.staffRelatives.filter(s=>s.REL_ID !==action.payload.REL_ID),
               filterStaffRelative:state.filterStaffRelative.filter(s=>s.REL_ID !==action.payload.REL_ID)
            }
            break;
         case DELETE_STAFF_RELATIVE_BY_STAFF_ID:
            
            return {
               ...state,
               staffRelativesByStfID:state.staffRelativesByStfID.filter(s=>s.REL_ID !==action.payload.REL_ID)
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
      case SET_CURRENT:
         return {
            ...state,
            current:action.payload
         }
         break;
      case CLEAR_CURRENT:
         return {
            ...state,
            current:null
         }
         break;
        
      default:
         return {
            ...state
         }
         break;
   }
}
export default StaffRelativeReducer;