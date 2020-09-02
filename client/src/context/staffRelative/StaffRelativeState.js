/* eslint-disable*/
import { useReducer, useEffect, useContext } from 'react'
import alertContext from '../alert/alertContext'
import StaffRelativeContext from './StaffRelativeContext';
import StaffRelativeReducer from './StaffRelativeReducer';
import React from 'react'
import GlobalLibrary from '../../helper/GlobalLibrary'
import {
  LOAD_STAFF_RELATIVE,
  LOAD_STAFF_RELATIVE_BY_STAFF_ID,
  FILTER_STAFF_RELATIVE,
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
    filterStaffRelative: [],
    staffRelativesByStfID: [],
    current: null
  };
  const gl=new GlobalLibrary()
  const [state, dispatch] = useReducer(StaffRelativeReducer, initialState);
  const { setAlert } = useContext(alertContext)
  //LOAD_STAFF_RELATIVE


  const loadStaffRelative = async (id) => {
    try {
      setLoading();
      gl.embeddedPermission('0401')
      const res = await Axios.get('/api/staffrelative/')
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      dispatch({ type: LOAD_STAFF_RELATIVE, payload: res.data.result });
      setAlert('Staff Relative', 'Loading : ' + 'Trasaction Successfully', true)

    } catch (error) {
      setAlert('Staff Relative', 'Loading : ' + error.message)
      return;
    }
      clearLoading();

  }
  const loadStaffRelativeByStaffID = async (ID) => {
    try {
      gl.embeddedPermission('0401')
      setLoading();
      const res = await Axios.get('/api/staffrelative/staff/' + ID)
      if (!res.data.isSuccessed) 
        throw res.data;
      dispatch({ type: LOAD_STAFF_RELATIVE_BY_STAFF_ID, payload: res.data.result });
      setAlert('Staff Relative', 'Loading : ' + 'Transaction Succesfully', true)

    } catch (error) {
      setAlert('Staff Relative', 'Loading : ' + error.message)
      return;
    }
    clearLoading();
  }
  const filter = stfRel => {
    console.log('stf rel state ');



    if (!stfRel) {
      return
    }
    try {
      setLoading()
      dispatch({ type: FILTER_STAFF_RELATIVE, payload: stfRel })
    } catch (error) {
      setAlert('Staff Relative', 'Filter : ' + error.message)
    }
    clearLoading()

  }
  //ADD_staffRelative
  const addStaffRelative = async (staffRelative, type) => {
    try {
      gl.embeddedPermission('0402')
      setLoading();
      const res = await Axios.post('/api/staffRelative/add', staffRelative)
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      staffRelative.REL_ID = res.data.LAST_INSERT_ID;
      dispatch({ type: type, payload: staffRelative });
      setAlert('Staff Relative', 'Add : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Relative', 'Add : ' + error.message)

      return;
    }
    clearLoading()
  }
  //UPDATE
  const updateStaffRelative = async (staffRelative, type) => {
    try {
      setLoading();
      gl.embeddedPermission('0403')
      const res = await Axios.put('/api/staffRelative/update', staffRelative)
      if (!res.data.isSuccessed) {
throw res.data;
      }
      dispatch({ type: type, payload: staffRelative });
      setAlert('Staff Relative', 'Update : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Relative', 'Update : ' + error.message)
      return;
    }
    clearLoading()
  }
  //DELETE
  const deleteStaffRelative = async (staffRelative, type) => {

    try {
      setLoading();
      gl.embeddedPermission('0404')
      const res = await Axios.delete('/api/staffRelative/delete', {
        data: staffRelative
      })
      // const res = await Axios.delete('/api/staffRelative/delete',staffRelative )
      // window.alert(JSON.stringify(staffRelative))
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      dispatch({ type: type, payload: staffRelative });
      setAlert('Staff Relative', 'Delete : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Relative', 'Delete : ' + error.message)
      return;
    }
    clearLoading()

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
      filterStaffRelative: state.filterStaffRelative,
      staffRelativesByStfID: state.staffRelativesByStfID,
      staffRelative: state.staffRelative,
      singleStaffRelative: state.singleStaffRelative,
      loading: state.loading,
      current: state.current,
      loadStaffRelative,
      loadStaffRelativeByStaffID,
      filter,
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

