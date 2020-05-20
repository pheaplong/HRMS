/* eslint-disable*/
import React, { useState, useContext, useEffect } from 'react'
import useScript from '../layout/useScript'
import Alert from '../layout/Alert'
import Spinner from '../layout/Spinner'
import StaffRelativeContext from './../../context/staffRelative/StaffRelativeContext'
import StatusTypeContext from './../../context/statusType/StatusTypeContext'
import StaffContext from './../../context/staff/StaffContext'
import { RELATION_TYPE, STATUS_TYPE, GENDER_TYPE } from '../../helper/Constant'
// import GlobalLibrary from '../../helper/GlobalLibrary'
import {
   ADD_STAFF_RELATIVE,
   ADD_STAFF_RELATIVE_BY_STAFF_ID,
   UPDATE_STAFF_RELATIVE,
   UPDATE_STAFF_RELATIVE_BY_STAFF_ID
} from '../../context/type'

const StaffRelativeModifiedModal = ({ type, staffID }) => {
   useScript({text:`
      $(document).ready(function(){
         $("#cbStaff").select2()
      })`})
   const { loadStatus, allStatus } = useContext(StatusTypeContext)
   const { loading, addStaffRelative, current, updateStaffRelative, setCurrent, StaffRelatives } = useContext(StaffRelativeContext)
   const { staffs, loadStaff } = useContext(StaffContext)
   const [StaffRelative, setStaffRelative] = useState({
      STF_ID: staffID,
      REL_FN: '',
      REL_LN: '',
      REL_GENDER: '',
      RELATION_ID: '',
      REL_DOB: '',
      STATUS_ID: ''
   })
   const cbRelation = allStatus.filter(s => s.CATEGORY === RELATION_TYPE)
   const cbStatus = allStatus.filter(c => c.CATEGORY == STATUS_TYPE)
   const cbGender = allStatus.filter(c => c.CATEGORY == GENDER_TYPE)
   useEffect(() => {
      // const gl=new GlobalLibrary()
      // let script= gl.LoadScriptByText(`
      // $(document).ready(function(){
      //    $("#cbStaff").select2()
      // })`)

      loadStatus()
      loadStaff()
      type === 'add' ? setStaffRelative({
         STF_ID: staffID,
         REL_FN: '',
         REL_LN: '',
         REL_GENDER: '',
         RELATION_ID: '',
         REL_DOB: '',
         STATUS_ID: ''
      }) : setStaffRelative(current);
   }, [StaffRelatives])

   const {
      STF_ID,
      REL_FN,
      REL_LN,
      REL_GENDER,
      RELATION_ID,
      REL_DOB,
      stf_pob,
      STATUS_ID
   } = StaffRelative


   const onChange = e => {
      setStaffRelative({ ...StaffRelative, [e.target.name]: e.target.value });
   }

   const createStaffRelative = () => {
      addStaffRelative(StaffRelative)
   }

   const onSubmite = e => {
      let a=(type !== 'add' && staffID==true)
      e.preventDefault();
      // (type === 'add' && !staffID) && addStaffRelative(StaffRelative,ADD_STAFF_RELATIVE) 
      // (type === 'add' && staffID) && addStaffRelative(StaffRelative,ADD_STAFF_RELATIVE_BY_STAFF_ID) 
      // (type !== 'add' && !staffID) && updateStaffRelative(StaffRelative,UPDATE_STAFF_RELATIVE)
      // (type !== 'add' && staffID==true) && updateStaffRelative(StaffRelative,UPDATE_STAFF_RELATIVE_BY_STAFF_ID)
      if(type === 'add' ) { staffID ? addStaffRelative(StaffRelative,ADD_STAFF_RELATIVE_BY_STAFF_ID)
                                    :addStaffRelative(StaffRelative,ADD_STAFF_RELATIVE)}
      if(type !== 'add') {staffID ? updateStaffRelative(StaffRelative,UPDATE_STAFF_RELATIVE_BY_STAFF_ID)
                                    : updateStaffRelative(StaffRelative,UPDATE_STAFF_RELATIVE)}

   }
   return (
      <form onSubmit={onSubmite}>
         {loading ? <Spinner /> : <Alert />}
         <div className='float-right' style={{ width: '150px', height: '150px', backgroundColor: 'red' }}>
            <label id="getFileLabel" for="getFile" className='m-auto text-align-center'>
               <i className="m-auto fas fa-upload" style={{ fontSize: '2em' }}></i>
            </label>

            <input type="file" id="getFile" />
         </div>

         <input type="file" id="file_upload" className="d-none" />
         {/* First Name */}
         <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
               <input autoFocus type="text" onChange={onChange} className="form-control" autoComplete='off'
                  name="REL_FN" value={REL_FN} placeholder="First Name" />
            </div>
         </div>
         {/* Last Name */}
         <div className="form-group row">
            <label htmlFor="" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
               <input type="text" onChange={onChange} className="form-control" autoComplete='off'
                  name="REL_LN" value={REL_LN} placeholder="Password" />
            </div>
         </div>
         {/* Gender */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Gender</label>
            <div className="col-sm-10">
               <select name="REL_GENDER" value={REL_GENDER} onChange={onChange} className="form-control" >
                  (<option value='0'>---Select---</option>)
                  {
                     cbGender.map(s => (<option value={s.ST_ID}>{s.ST_DESC}</option>))
                  }
               </select>
            </div>
         </div>
         {/* STF_ID */}
         <div className="form-group row">
            <label htmlFor="STF_ID" className="col-sm-2 col-form-label">Employee</label>
            <div className="col-sm-10">
               <select id="cbStaff" className="form-control" value={STF_ID}>
                  {staffs.map((item, key) =>
                     <option key={key} value={item.STF_ID}>{item.STF_ID+' - '+item.STF_FN + ' ' + item.STF_LN}</option>
                  )}
               </select>
            </div>
         </div>
         {/* Relation */}
         <div className="form-group row">
            <label htmlFor="RELATION_ID" className="col-sm-2 col-form-label">Relation</label>
            <div className="col-sm-10">
               <select type="text" onChange={onChange} className="form-control" autoComplete='off'
                  name="RELATION_ID" value={RELATION_ID}>
                  <option value='0'>---Select---</option>
                  {
                     cbRelation.map(c => (<option value={c.ST_ID}>{c.ST_DESC}</option>))
                  }

               </select>
            </div>
         </div>
         {/* Status */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-10">
               {/* <input type="text" onChange={onChange} className="form-control" autoComplete='off' 
               name="STATUS_ID" value={STATUS_ID} placeholder="Status" /> */}
               <select name="STATUS_ID" value={STATUS_ID} onChange={onChange}
                  className="form-control" >
                  (<option value='0'>---Select---</option>)
                  {
                     cbStatus.map(s => (<option value={s.ST_ID}>{s.ST_DESC}</option>))
                  }
               </select>
            </div>
         </div>
         <div className="form-group-row d-flex justify-content-center">
         <button type="submit" id='submit' className="btn btn-primary">{type == 'add' ? 'Create' : 'Update'}</button>
         </div>
      </form>
   )
}

export default StaffRelativeModifiedModal
