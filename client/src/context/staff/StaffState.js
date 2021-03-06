/* eslint-disable*/
import { useReducer, useEffect, useContext } from 'react'
import alertContext from '../alert/alertContext'
import StaffContext from './StaffContext';
import StaffReducer from './StaffReducer';
import React from 'react'
import GlobalLibrary from '../../helper/GlobalLibrary'

import {
  LOAD_STAFF,
  LOAD_STAFF_BY_ID,
  ADD_STAFF,
  UPDATE_STAFF,
  DELETE_STAFF,
  SET_CURRENT_STAFF,
  CLEAR_CURRENT_STAFF,
  SET_LOADING,
  CLEAR_LOADING,
  DO_COMBO_BOX,
  LOAD_SALARY
} from '../type'
import Axios from 'axios'

const StaffState = (props) => {
  const initialState = {
    loading: false,
    comboBox: [],
    singleStaff: {
      STF_ID: null,
      STF_FN: '',
      STF_LN: '',
      STF_GENDER: 0,
      STF_MARITAL_ST: 0,
      STF_DOB: '',
      STF_POB: '',
      STATUS_ID: '',
      salary: [2, 2],
      image: null
    },
    staff: {},
    staffs: [],
    current: null
  };
  const globalLibrary = new GlobalLibrary()
  const [state, dispatch] = useReducer(StaffReducer, initialState);
  const { setAlert } = useContext(alertContext)
  //LOAD_STAFF


  const loadStaff = async () => {

    try {
      globalLibrary.embeddedPermission('0201')
      setLoading();
      const res = await Axios.get('/api/staff')
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      dispatch({ type: LOAD_STAFF, payload: res.data.result });
      setAlert('Staff', 'Loading : ' + 'Transaction Succesfully', true)

    } catch (error) {
      setAlert('Staff', 'Loading : ' + error.message)
      return;
    }
    clearLoading();

  }
  const loadStaffByID = async (ID) => {
    try {
      setLoading();
      globalLibrary.embeddedPermission('0201')
      const res = await Axios.get('/api/staff/' + ID)
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      if (res.data.result.length == 0) {
        setAlert('Staff', 'Loading : ' + 'There is no match employee', true)
        clearLoading(); return;
      }
      dispatch({ type: LOAD_STAFF_BY_ID, payload: res.data.result[0] });
      setAlert('Staff', 'Loading : ' + 'Transaction Succesfully')

    } catch (error) {
      setAlert('Staff', 'Loading : ' + error.message)
      return;
    }
    clearLoading();
  }
  //ADD_staff
  const addStaff = async (staff, image) => {
    try {
      globalLibrary.embeddedPermission('0202')
      setLoading();
      const res = await Axios.post('/api/staff/add', staff)
      clearLoading()
      if (!res.data.isSuccessed)
        throw res.data
      staff.STF_ID = res.data.LAST_INSERT_ID;
      dispatch({ type: ADD_STAFF, payload: staff });
      setAlert('Staff', 'Add : ' + 'Transaction Successfully', true)
      image.append('fileName', res.data.LAST_INSERT_ID)
      image.append('path', 'STAFF')
      const result = globalLibrary.uploadFile(image)
      if (!result)
        setAlert('Staff', 'Add : ' + 'Update Successfully', true)
    } catch (error) {
      setAlert('Staff', 'Add : ' + error.message)
      return;
    }
  }
  //UPDATE
  const updateStaff = async (staff, image) => {
    try {
      globalLibrary.embeddedPermission('0203')
      setLoading();
      console.log('from state   ' + staff);
      const res = await Axios.put('/api/staff/update', staff)
      if (!res.data.isSuccessed) {
        throw res.data
      }
      dispatch({ type: UPDATE_STAFF, payload: staff });
      setAlert('Staff', 'Update : ' + 'Update Successfully', true)
      image.append('fileName', staff.STF_ID)
      image.append('path', 'STAFF')
      const result = globalLibrary.uploadFile(image)
      if (!result)
        setAlert('Staff', 'Update : ' + 'Update Successfully', true)
    } catch (error) {
      setAlert('Staff', 'Update : ' + error.message)
      clearLoading()
    }
    clearLoading()
  }
  //DELETE
  const deleteStaff = async staff => {

    try {
      globalLibrary.embeddedPermission('0204')
      setLoading();
      const res = await Axios.delete('/api/staff/delete', {
        data: staff
      })
      // const res = await Axios.delete('/api/staff/delete',staff )
      // window.alert(JSON.stringify(staff))
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      dispatch({ type: DELETE_STAFF, payload: staff });
      setAlert('Staff', 'Delete : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff', 'Delete : ' + error.message)

      return;
    }
    clearLoading()

  }

  const doComboBox = async () => {
    try {
      const res = await Axios.get('/api/statustype');
      dispatch({ type: DO_COMBO_BOX, payload: res.data.result })
    } catch (error) {

    }
  }
  const loadSalary = async () => {

    try {
      globalLibrary.embeddedPermission('0205')
      setLoading();
      const res = await Axios.get('/api/staff/salary')
      if (!res.data.isSuccessed) {
        throw res.data;
      }
      dispatch({ type: LOAD_SALARY, payload: res.data.result });
      setAlert('Staff', 'Salary : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff', 'Salary : ' + error.message)

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
  const setCurrent = staff => {
    dispatch({ type: SET_CURRENT_STAFF, payload: staff });
  }
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_STAFF });
  }
  return (
    <StaffContext.Provider value={{
      staffs: state.staffs,
      staff: state.staff,
      loading: state.loading,
      salary: state.salary,
      loadStaff, loadSalary,
      loadStaffByID,
      addStaff,
      updateStaff,
      deleteStaff,
      singleStaff: state.singleStaff,
      current: state.current,
      setCurrent,
      clearCurrent
    }}>
      {props.children}
    </StaffContext.Provider>
  )
}

export default StaffState

