import { useReducer, useEffect,useContext } from 'react'
import alertContext from '../alert/alertContext'
import StaffRelativeContext from './StaffRelativeContext';
import StaffRelativeReducer from './StaffRelativeReducer';
import React from 'react'
import {
   LOAD_STAFF_RELATIVE,
   LOAD_STAFF_RELATIVE_BY_STAFF_ID,
   ADD_STAFF_RELATIVE,
   UPDATE_STAFF_RELATIVE,
   DELETE_STAFF_RELATIVE,
   SET_CURRENT,
   CLEAR_CURRENT,
   SET_LOADING,
   CLEAR_LOADING
} from '../type'
import Axios from 'axios'
import { json } from 'body-parser';

const StaffRelativeState = (props) => {
   const initialState = {
      loading: false,
      staffRelative: {},
      staffRelatives: [],
      staffRelativesByStfID:[],
      current:null
   };
   const [state, dispatch] = useReducer(StaffRelativeReducer, initialState);
   const {setAlert} = useContext(alertContext)
   //LOAD_STAFF_RELATIVE
  

   const loadStaffRelative = async (id) => {
      try {
         setLoading();
         const res = await Axios.get('/api/staffrelative/')
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert('Staff Relative','Loading : '+res.data.message)
            return;
         }
         dispatch({ type: LOAD_STAFF_RELATIVE, payload: res.data.result });
         setAlert('Staff Relative','Loading : '+'Trasaction Successfully',true)
        
      } catch (error) {
         clearLoading();
         setAlert('Staff Relative','Loading : '+error.message)
      }

   }
   const loadStaffRelativeByStaffID = async (ID) => {
      try {
         setLoading();
         const res = await Axios.get('/api/staffrelative/staff/'+ID)
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert('Staff Relative','Loading : '+res.data.message)
            return;
         }
         dispatch({ type: LOAD_STAFF_RELATIVE_BY_STAFF_ID, payload: res.data.result });
         setAlert('Staff Relative','Loading : '+'Transaction Succesfully',true)
        
      } catch (error) {
         clearLoading();
         setAlert('Staff Relative','Loading : '+error.message)
      }

   }
   //ADD_staffRelative
   const addStaffRelative = async (staffRelative,type) => {
      try {
         console.log(`from add relative by type ${type} \n`+json(staffRelative))
         setLoading();
         const res = await Axios.post('/api/staffRelative/add', staffRelative)
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert('Staff Relative','Add : '+res.data.message)
            return;
         }
         staffRelative.REL_ID = res.data.LAST_INSERT_ID;
         dispatch({ type: type, payload: staffRelative });
         setAlert('Staff Relative','Add : '+'Transaction Successfully',true)
         return true;
      } catch (error) {
         setAlert('Staff Relative','Add : '+error.message)
         
      }
   }
   //UPDATE
   const updateStaffRelative = async (staffRelative,type) => {
      try {
         setLoading();
         console.log(`from update relative by type ${type} \n`+json(staffRelative))
         const res = await Axios.put('/api/staffRelative/update', staffRelative)
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert('Staff Relative','Update : '+res.data.message)
            return;
         }
         dispatch({ type: type, payload: staffRelative });
         setAlert('Staff Relative','Update : '+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Staff Relative','Update : '+error.message)
         clearLoading()
      }
   }
   //DELETE
   const deleteStaffRelative = async (staffRelative,type) => {
      
      try {
         setLoading();
         const res = await Axios.delete('/api/staffRelative/delete',{
            data:staffRelative
         } )
         // const res = await Axios.delete('/api/staffRelative/delete',staffRelative )
        // window.alert(JSON.stringify(staffRelative))
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert('Staff Relative','Delete : '+res.data.message)
            return;
         }
         dispatch({ type: type, payload: staffRelative });
         setAlert('Staff Relative','Delete : '+'Transaction Successfully',true)
      } catch (error) {
         setAlert('Staff Relative','Delete : '+error.message)
         clearLoading()
      }
      
   }

   const setLoading = () => {
      dispatch({ type: SET_LOADING });
   }
   const clearLoading = () => {
      dispatch({ type: CLEAR_LOADING });
   }
   const setCurrent = staffRelative => {
      dispatch({ type: SET_CURRENT, payload: staffRelative });
   }
   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRENT });
   }
   return (
      <StaffRelativeContext.Provider value={{
         staffRelatives: state.staffRelatives,
         staffRelativesByStfID:state.staffRelativesByStfID,
         staffRelative: state.staffRelative,
         singleStaffRelative:state.singleStaffRelative,
         loading:state.loading,
         current:state.current,
         loadStaffRelative,
         loadStaffRelativeByStaffID,
         addStaffRelative,
         updateStaffRelative,
         deleteStaffRelative,
         setCurrent,
         clearCurrent
      }}>
         {props.children}
      </StaffRelativeContext.Provider>
   )
}

export default StaffRelativeState

