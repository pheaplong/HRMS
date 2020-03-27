import {Reducer} from 'react'
import {LOAD_STAFF_AGREEMENT,
   ADD_STAFF_AGREEMENT,
   FILTER_STAFF_AGREEMENT,
   CLEAR_FILTER_STAFF_AGREEMENT,
   SET_CURRENT,
   CLEAR_LOADING,
   SET_LOADING,} from '../type'
const StaffAgreementReducer=(state,action)=>{

   switch (action.type) { 
      case LOAD_STAFF_AGREEMENT:
         return {
            ...state,
            staffAgreements: action.payload,
            filterStaffAgreement: action.payload,
            
         }
         break;
      case FILTER_STAFF_AGREEMENT:
         // console.log( 'from reducer ' +JSON.stringify(state.staffAgreements));
         let tmp=state.staffAgreements
         tmp = action.payload.STF_FULLNAME !=='' ?
            tmp.filter(s=>s.STF_FULLNAME.includes(action.payload.STF_FULLNAME))
            : state.staffAgreements
           
            
         tmp = action.payload.AGREE_ID !=0 ?
             tmp.filter(s=>s.AGREE_ID==action.payload.AGREE_ID)
            : tmp
         return {
            ...state,
            filterStaffAgreement:tmp,
            loading:false
         }
         break;
      case CLEAR_FILTER_STAFF_AGREEMENT:
         // console.log( 'from reducer ' +JSON.stringify(state.staffAgreements));
       
         return {
            ...state,
            filterStaffAgreement:state.staffAgreements,
            loading:false
         }
         break;
      case ADD_STAFF_AGREEMENT:
console.log('ag redu');

         return {
            ...state,
            filterStaffAgreement: [action.payload, ...state.staffAgreements],
            staffAgreements: [action.payload, ...state.staffAgreements],
         }
         break;
      case SET_CURRENT:

         return {
            ...state,
            current:action.payload,
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
export default StaffAgreementReducer;