/* eslint-disable */
import {createContext} from 'react';
import { useReducer, useEffect, useContext } from 'react'
import alertContext from '../alert/alertContext'
import StaffExperienceContext from './StaffExperienceContext';
import StaffExperienceReducer from './StaffExperienceReducer';
import Axios from 'axios'
import React from 'react'
import {
  ADD_STAFF_EXPERIENCE,
  LOAD_STAFF_EXPERIENCE,
  LOAD_STAFF_EXPERIENCE_BY_ID,
  UPDATE_STAFF_EXPERIENCE,
  DELETE_STAFF_EXPERIENCE,
  FILTER_STAFF_EXPERIENCE,
  CLEAR_FILTER_STAFF_EXPERIENCE,
  SET_CURRENT,
  SET_LOADING,
  CLEAR_LOADING
} from '../type'

const StaffExperienceState = (props) => {
  const initialState = {
    staffExperiences: [],
    filterStaffExperience: [],
    staffExperiencesByStfID: [],
    current: null,
    loading: false
  }
  const [state, dispatch] = useReducer(StaffExperienceReducer, initialState);
  const { setAlert } = useContext(alertContext)
  const loadStaffExperience = async () => {
    try {
      setLoading();
      const res = await Axios.get('/api/StaffExperience')
      if (!res.data.isSuccessed) {
throw res.data;
      }
      dispatch({ type: LOAD_STAFF_EXPERIENCE, payload: res.data.result });
      setAlert('Staff Experience', 'Loading :' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Experience', 'Loading :' + error.message)
      return;
    }
    clearLoading();

  }
  const loadStaffExperienceByStaffID = async (ID) => {
    try {
      setLoading();

      const res = await Axios.get('/api/StaffExperience/' + ID)
      clearLoading();
      if (!res.data.isSuccessed) {
throw res.data;
      }
      if (res.data.result.length == 0) {
        setAlert('Staff Experience', 'Loading :' + 'There is no matching Employment history with this employee', true);
        dispatch({ type: LOAD_STAFF_EXPERIENCE_BY_ID, payload: res.data.result });
        clearLoading(); return;
      }
      dispatch({ type: LOAD_STAFF_EXPERIENCE_BY_ID, payload: res.data.result });
      setAlert('Staff Experience', 'Loading :' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Experience', 'Loading :' + error.message)
      return;
    }
    clearLoading();

  }
  const addStaffExperience = async (StaffExperience) => {
    console.log('trigger');

    try {
      setLoading();
      const res = await Axios.post('/api/StaffExperience/add', StaffExperience)
      if (!res.data.isSuccessed) {
        setAlert('Staff Experience', 'Adding :' + res.data)
        clearLoading(); return;
      }
      StaffExperience.STF_EXP_ID = res.data.LAST_INSERT_ID
      dispatch({ type: ADD_STAFF_EXPERIENCE, payload: StaffExperience });
      setAlert('Staff Experience', 'Adding :' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Experience', 'Adding :' + error.message)
    }
    clearLoading();

  }

  //UPDATE
  const updateStaffExperience = async (staffRelative) => {
    try {
      setLoading();
      // console.log(`from update relative by type ${type} \n` + json(staffRelative))
      const res = await Axios.put('/api/staffexperience/update', staffRelative)
      if (!res.data.isSuccessed) {
throw res.data;
      }
      dispatch({ type: UPDATE_STAFF_EXPERIENCE, payload: staffRelative });
      setAlert('Staff Experience', 'Update : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Experience', 'Update : ' + error.message)
      return;
    }
    clearLoading()
  }
  //DELETE
  const deleteStaffExperience = async (staffRelative, type) => {

    try {
      setLoading();
      const res = await Axios.delete('/api/StaffExperience/delete', {
        data: staffRelative
      })
      // const res = await Axios.delete('/api/staffRelative/delete',staffRelative )
      // window.alert(JSON.stringify(staffRelative))
      if (!res.data.isSuccessed) {
        setAlert('Staff Experience', 'Delete : ' + res.data)
        clearLoading(); return;
      }
      dispatch({ type: DELETE_STAFF_EXPERIENCE, payload: staffRelative });
      setAlert('Staff Experience', 'Delete : ' + 'Transaction Successfully', true)
    } catch (error) {
      setAlert('Staff Experience', 'Delete : ' + error.message)
      clearLoading()
    }
    clearLoading()

  }

  const filter = async (StaffExperience) => {
    console.log('from state ' + JSON.stringify(StaffExperience));
    try {
      setLoading()
      dispatch({ type: FILTER_STAFF_EXPERIENCE, payload: StaffExperience });
    } catch (error) {
      setAlert('Staff Experience', error.message)
    }
    clearLoading();

  }
  const clearFilter = async () => {
    console.log('from state clear filter');
    try {
      setLoading()
      dispatch({ type: CLEAR_FILTER_STAFF_EXPERIENCE });
    } catch (error) {
      setAlert('Staff Experience', error.message)
    }
    clearLoading();

  }
  const setCurrent = async (StaffExperience) => {
    try {
      dispatch({ type: SET_CURRENT, payload: StaffExperience });

    } catch (error) {
      setAlert('Staff Experience', error.message)
    }

  }


  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  }
  const clearLoading = () => {
    dispatch({ type: CLEAR_LOADING });
  }
  return (
    <StaffExperienceContext.Provider value={{
      staffExperiences: state.staffExperiences,
      filterStaffExperience: state.filterStaffExperience,
      staffExperiencesByStfID: state.staffExperiencesByStfID,
      current: state.current,
      loading: state.loading,
      loadStaffExperience,
      loadStaffExperienceByStaffID,
      addStaffExperience,
      updateStaffExperience,
      deleteStaffExperience,
      setCurrent,
      filter,
      clearFilter
    }}>
      {props.children}
    </StaffExperienceContext.Provider>
  )
}

export default StaffExperienceState

