/* eslint-disable*/
import { useReducer, useEffect, useContext } from 'react'
import DepartmentContext from './DepartmentContext';
import DepartmentReducer from './DepartmentReducer';
import alertContext from '../alert/alertContext'
import React from 'react'
import GlobalLibrary from '../../helper/GlobalLibrary'
import {
   LOAD_DEPARTMENT,
   LOAD_DEPARTMENT_BY_ID,
   ADD_DEPARTMENT,
   SET_LOADING,
   CLEAR_LOADING,
   ERROR
} from '../type'
import Axios from 'axios'

const DepartmentState = (props) => {
   const initialState = {
      loading: false,
      department: {},
      departments: []
   };
   const globalLibrary = new GlobalLibrary()
   const { setAlert } = useContext(alertContext);
   const [state, dispatch] = useReducer(DepartmentReducer, initialState);
   //LOAD_DEPARTMENT
   const loadDepartment = async () => {
      try {
         setLoading();
         globalLibrary.embeddedPermission('0601')
         const res = await Axios.get('/api/department')
         if (!res.data.isSuccessed) {
            throw res.data;
         }
         dispatch({ type: LOAD_DEPARTMENT, payload: res.data.result });
         setAlert('Department','Loading : '+'Transaction Succesfully',true)
         
         
      } catch (error) {
         // dispatch({ type: ERROR, payload: error.message });
         setAlert('Department','Loading : '+error.message)
         return;
      }
      clearLoading();
      
   }
   const loadDepartmentByID = async (id) => {
      try {
         setLoading();
         globalLibrary.embeddedPermission('0601')
         const res = await Axios.get('/api/department/' + id)
         if (!res.data.isSuccessed) {
           throw res.data;
         }
         dispatch({ type: LOAD_DEPARTMENT_BY_ID, payload: res.data.result });
         setAlert('Department','Loading : '+'Transaction Succesfully',true)
         } catch (error) {
            setAlert('Department','Loading : '+error.message)
            return;
         }
         clearLoading();
         
   }

   //ADD_DEPARTMENT
   const addDepartment = async department => {
      try {
         setLoading();
         const temp=department;
         globalLibrary.embeddedPermission('0602')
         const res = await Axios.post('/api/department/add', temp)
         if (!res.data.isSuccessed) {
            throw res.data;
         }
         temp.DEP_ID=res.data.LAST_INSERT_ID;
         dispatch({ type: ADD_DEPARTMENT, payload: temp });
         setAlert('Department','Add : '+'Transaction Successfully',true)
         clearLoading();
      } catch (error) {
         setAlert('Department','Add : '+error.message)
         return;
         
      }
      
   }

   const setLoading = () => {
      dispatch({ type: SET_LOADING });
   } 
   const clearLoading=()=>{
      dispatch({ type: CLEAR_LOADING });
   }

   return (
      <DepartmentContext.Provider value={{
         departments: state.departments,
         department: state.department,
         loading: state.loading,
         loadDepartment,
         loadDepartmentByID,
         addDepartment
      }}>

         {props.children}
      </DepartmentContext.Provider>
   )
}

export default DepartmentState

