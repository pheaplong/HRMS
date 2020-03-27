import {Reducer} from 'react'
import {LOAD_STAFF,
   LOAD_STAFF_BY_ID,
   ADD_STAFF,
   UPDATE_STAFF,
   DELETE_STAFF,
   SET_LOADING,
   CLEAR_LOADING,
   SET_CURRENT_STAFF,
   CLEAR_CURRENT_STAFF,DO_COMBO_BOX} from '../type'
const StaffReducer=(state,action)=>{
   switch (action.type) {
      case LOAD_STAFF:

         return {
            ...state,
            staffs: action.payload,
            loading: false
         }
         break;
      case LOAD_STAFF_BY_ID:
// console.log(action.payload);
// console.log(state.staffs.find(s=>s.stf_id==action.payload));

         return {
            ...state,
            singleStaff:action.payload,
            //.find(s=>s.stf_id===action.payload.ID),
            loading: false
         }
         break;
      
      case ADD_STAFF:

         return {
            ...state,
            staffs: [action.payload, ...state.staffs]
         }
         break;
      case UPDATE_STAFF:

         return {
            ...state
            ,
            staffs:state.staffs.map(
               p=>p.STF_ID ===action.payload.STF_ID ? action.payload: p)
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
      case SET_CURRENT_STAFF:
         return {
            ...state,
            current:action.payload
         }
         break;
      case CLEAR_CURRENT_STAFF:
         return {
            ...state,
            current:null
         }
         break;
         case DELETE_STAFF:
            
            return {
               ...state,
               staffs:state.staffs.filter(s=>s.STF_ID !==action.payload.STF_ID)
            }
            break;
         case DO_COMBO_BOX:
            
            return {
               ...state,
               comboBox:[]
            }
            break;

      default:
         return {
            ...state
         }
         break;
   }
}
export default StaffReducer;