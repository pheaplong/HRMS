/* eslint-disable*/
import {Reducer} from 'react'
import { LOAD_STATUS_TYPE} from '../type'   
const StatusTypeReducer=(state,action)=>{
   switch(action.type){

      case LOAD_STATUS_TYPE:
        
         
      return{
         
         allStatus:action.payload
      }
      break;
      
   }
   
}
export default StatusTypeReducer;