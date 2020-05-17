/* eslint-disable*/
import React, { useState, useContext, useEffect } from 'react'

import Alert from '../layout/Alert'
import Spinner from '../layout/Spinner'
import StaffExperienceContext from './../../context/StaffExperience/StaffExperienceContext'
import StaffContext from './../../context/staff/StaffContext'
// import { RELATION_TYPE, STATUS_TYPE, GENDER_TYPE } from '../../helper/Constant'
// import {
//   ADD_STAFF_EXPERIENCE,
//   UPDATE_STAFF_EXPERIENCE,
// } from '../../context/type'

const StaffExperienceModifiedModal = ({ type, staffID }) => {
  const { loading, addStaffExperience, current, updateStaffExperience, StaffExperiences } = useContext(StaffExperienceContext)
  const { staffs, loadStaff } = useContext(StaffContext)
  const [staffExperience, setStaffExperience] = useState({
    // STF_EXP_ID: '',
    STF_FULLNAME: '',
    STF_ID: staffID,
    STF_POS: '',
    STF_ST_D: '',
    STF_LT_D: '',
    STF_REASON: '',
    STATUS_ID: 1,
    USR_CREA: '',
    DT_CREA: '',
    USR_UPDT: '',
    DT_UPDT: ''
  })

  const {
    // STF_EXP_ID,
    // STF_FULLNAME,
    STF_ID,
    STF_POS,
    STF_ST_D,
    STF_LT_D,
    STF_REASON,
    // STATUS_ID,
    // USR_CREA,
    // DT_CREA,
    // USR_UPDT,
    // DT_UPDT
  } = staffExperience
 
  useEffect(() => {
    loadStaff()
    type !== 'add' && setStaffExperience(current);
    if(STF_ST_D && STF_LT_D) {
 STF_ST_D=new Date(STF_ST_D)
  STF_LT_D=new Date(STF_LT_D)
    }
    

  }, [StaffExperiences])


  const onChange = e => {
    setStaffExperience({ ...staffExperience, [e.target.name]: e.target.value });
  }

  const createStaffExperience = () => {
    addStaffExperience(staffExperience)
  }

  const onSubmite = e => {
    e.preventDefault();
    type === 'add' ? addStaffExperience(staffExperience) : updateStaffExperience(staffExperience)
  }
  return (
    <form onSubmit={onSubmite}>
      {loading ? <Spinner /> : <Alert />}


      {/* STF_ID */}
      <div className="form-group row">
        <label htmlFor="STF_ID" className="col-sm-2 col-form-label">Employee</label>
        <div className="col-sm-10">
          <input type="text" id="txtStfID" disabled={staffID ? 'true' : undefined}
            className="form-control" name="STF_ID" onChange={onChange}
            list="data" value={STF_ID} />
          <datalist id="data">
            {staffs.map((item, key) =>
              <option key={key} value={item.STF_ID}>{item.STF_FN + ' ' + item.STF_LN}</option>
            )}
          </datalist>
        </div>
      </div>
      {/*POSITION */}
      <div className="form-group row">
        <label htmlFor="position" className="col-sm-2 col-form-label">Position</label>
        <div className="col-sm-10">
          <input autoFocus type="text" onChange={onChange} className="form-control" autoComplete='off'
            name="STF_POS" value={STF_POS} placeholder="Position" />
        </div>
      </div>
      {/* Start Date */}
      <div className="form-group row">
        <label htmlFor="" className="col-sm-2 col-form-label">Start Date</label>
        <div className="col-sm-10">
          <input type="date" pattern="\d{4}-\d{2}-\d{2}" onChange={onChange} className="form-control" autoComplete='off'
            name="STF_ST_D" value={STF_ST_D} />
        </div>
      </div>
      {/* Last Date */}
      <div className="form-group row">
        <label htmlFor="" className="col-sm-2 col-form-label">Last Date</label>
        <div className="col-sm-10">
          <input type="date"pattern="\d{4}-\d{2}-\d{2}" onChange={onChange} className="form-control" autoComplete='off'
            name="STF_LT_D" value={STF_LT_D} />
        </div>
      </div>
      {/* REASON */}
      <div className="form-group row">
        <label htmlFor="" className="col-sm-2 col-form-label">Reason</label>
        <div className="col-sm-10">
          <input type="text
          " onChange={onChange} className="form-control" autoComplete='off'
            name="STF_REASON" value={STF_REASON} placeholder='Reason' />
        </div>
      </div>

      <div className="form-group-row d-flex justify-content-center">
        <button type="submit" id='submit' className="btn btn-primary">{type == 'add' ? 'Create' : 'Update'}</button>
      </div>
    </form>
  )
}

export default StaffExperienceModifiedModal
