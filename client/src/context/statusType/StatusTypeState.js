/* eslint-disable*/
import React,{ useReducer, useEffect,useContext } from 'react'
import alertContext from '../alert/alertContext'
import StatusTypeContext from './StatusTypeContext';
import StatusTypeReducer from './StatusTypeReducer';
import {GENDER_TYPE,STATUS_TYPE} from '../../helper/Constant'
import {
   LOAD_STATUS_TYPE
} from '../type'
import Axios from 'axios';
const StatusTypeState=(props)=>{
   const initialState = {
      allStatus:[],
      genderStatus:[]
   };
   const [state, dispatch] = useReducer(StatusTypeReducer, initialState)
   const {setAlert} = useContext(alertContext)
   const loadStatus=async()=>{
      try {
         //setLoading();
         const res = await Axios.get('/api/statustype/')
        
         
         //clearLoading();
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         
         console.log(res.data.result);
         dispatch({type:LOAD_STATUS_TYPE,payload:res.data.result})
         
      } catch (error) {
         //clearLoading();
         setAlert(error.message)
      }
     
   }
   return (
      <StatusTypeContext.Provider value={{
         allStatus:state.allStatus,
         genderStatus:state.genderStatus,
        loadStatus
      }}>
         {props.children}
      </StatusTypeContext.Provider>
   )
}
export default StatusTypeState