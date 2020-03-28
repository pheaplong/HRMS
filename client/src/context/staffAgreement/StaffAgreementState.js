import { useReducer, useEffect,useContext } from 'react'
import alertContext from '../alert/alertContext'
import StaffAgreementContext from './StaffAgreementContext';
import StaffAgreementReducer from './StaffAgreementReducer';
import Axios from 'axios'
import React from 'react'
import {ADD_STAFF_AGREEMENT,
   LOAD_STAFF_AGREEMENT,
   FILTER_STAFF_AGREEMENT,
   CLEAR_FILTER_STAFF_AGREEMENT,
   SET_CURRENT,
   SET_LOADING,
   CLEAR_LOADING} from '../type'    

const StaffAgreementState = (props) => {
   const initialState={
      staffAgreements:[],
      filterStaffAgreement:[],
      current:null,
      loading:false
   }
   const [state,dispatch]=useReducer(StaffAgreementReducer,initialState);
   const {setAlert} = useContext(alertContext)
   const loadStaffAgreement=async()=>{
      try {
         setLoading();
         const res = await Axios.get('/api/staffagreement')
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert('Staff Agreement','Loading :'+res.data.message)
            return;
         }
         dispatch({ type: LOAD_STAFF_AGREEMENT, payload: res.data.result });
         setAlert('Staff Agreement','Loading :'+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Staff Agreement','Loading :'+error.message)
      }

   }
   const loadStaffAgreementByID=async(ID)=>{
      try {
         setLoading();
         
         const res = await Axios.get('/api/staffagreement/'+ID)
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert('Staff Agreement','Loading :'+res.data.message)
            return;
         }
         if(res.data.result.length==0 ){
            setAlert('Staff Agreement','Loading :'+'There is no matching Employee');
            return;
         }
         dispatch({ type: LOAD_STAFF_AGREEMENT, payload: res.data.result });
         setAlert('Staff Agreement','Loading :'+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Staff Agreement','Loading :'+error.message)
      }

   }
   const addStaffAgreement=async(staffAgreement)=>{
      console.log('trigger');
      
      try {
         setLoading();
         const res = await Axios.post('/api/StaffAgreement/add',staffAgreement)
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert('Staff Agreement','Adding :'+res.data.message)
            return;
         }
         staffAgreement.AG_ID=res.data.LAST_INSERT_ID
         dispatch({ type: ADD_STAFF_AGREEMENT, payload: staffAgreement });
         setAlert('Staff Agreement','Adding :'+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Staff Agreement','Adding :'+error.message)
      }

   }
   const filter=async(staffAgreement)=>{
      console.log( 'from state ' +JSON.stringify(staffAgreement));
      try {
         setLoading()
         dispatch({ type: FILTER_STAFF_AGREEMENT, payload:staffAgreement});
      } catch (error) {
         setAlert('Staff Agreement',error.message)
      }

   }
   const clearFilter=async()=>{
      console.log( 'from state clear filter');
      try {
         setLoading()
         dispatch({ type: CLEAR_FILTER_STAFF_AGREEMENT});
      } catch (error) {
         setAlert('Staff Agreement',error.message)
      }

   }
   const setCurrent=async(staffAgreement)=>{
      try {
         dispatch({ type: SET_CURRENT,payload:staffAgreement});
      } catch (error) {
         setAlert('Staff Agreement',error.message)
      }

   }
 

   const setLoading = () => {
      dispatch({ type: SET_LOADING });
   }
   const clearLoading = () => {
      dispatch({ type: CLEAR_LOADING });
   }
   return (
      <StaffAgreementContext.Provider value={{
         staffAgreements: state.staffAgreements,
         filterStaffAgreement:state.filterStaffAgreement,
         current:state.current,
         loading:state.loading,
         loadStaffAgreement,
         loadStaffAgreementByID,
         addStaffAgreement,
         setCurrent,
         filter,
         clearFilter
      }}>
         {props.children}
      </StaffAgreementContext.Provider>
   )
}

export default StaffAgreementState

