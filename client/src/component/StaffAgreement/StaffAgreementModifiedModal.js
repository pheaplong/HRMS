/* eslint-disable*/
import React, { useState, useContext, useEffect } from 'react'
import Alert from '../layout/Alert'
import Spinner from '../layout/Spinner'
import StaffContext from '../../context/staff/StaffContext'
import DepartmentContext from '../../context/department/DepartmentContext'
import PositionTypeContext from '../../context/position/PositionTypeContext'
import StaffAgreementContext from '../../context/staffAgreement/StaffAgreementContext'
import StatusTypeContext from '../../context/statusType/StatusTypeContext'
import { AGREEMENT_TYPE } from '../../helper/Constant'
import { json } from 'body-parser'
import { NavLink } from 'react-router-dom'
const GlobalLibrary=require('../../helper/GlobalLibrary')

const StaffAgreementModifiedModal = (props) => {
   const { staffs, loadStaff } = useContext(StaffContext)
   const { loadDepartment,departments } = useContext(DepartmentContext)
   const { loadPositionType,PositionTypes } = useContext(PositionTypeContext)
   const { addStaffAgreement,loading } = useContext(StaffAgreementContext)
   const { loadStatus,allStatus } = useContext(StatusTypeContext)
   const [staffAgreement, setStaffAgreement] = useState({
      AG_ID: "",
      STF_ID: props.staffID,
      AGREE_ID: "",
      POS_ID:'',
      SAL: "",
      AG_DATE: "",
      AG_EXPR: "",
      STATUS_ID:1,
      USR_CREA: "",
      DT_CREA: "",
      USR_UPDT: "",
      DT_UPDT: ""
   })
   const [Dep, setDep] = useState(0)
   const [cbPos, setcbPos] = useState(PositionTypes.filter(p=>p.DEP_ID==Dep.DEP_ID))
   const {AG_ID,
      STF_ID,
      POS_ID,
      AGREE_ID,
      SAL,
      AG_DATE,
      AG_EXPR}=staffAgreement

   const [file, setFile] = useState(null)
   const cbAgType = allStatus.filter(s => s.CATEGORY === AGREEMENT_TYPE)
   useEffect(() => {
      loadStaff()
      loadDepartment()
      loadPositionType()
   }, []
   )
   const onChange = e => {
      setStaffAgreement({ ...staffAgreement, [e.target.name]: e.target.value });
   }
   const cbDep_OnChange = e => {
      setDep({ ...Dep, [e.target.name]: e.target.value });
      setcbPos(PositionTypes.filter(p=>p.DEP_ID==e.target.value))
   }

 const onSubmit=(e)=>{
    e.preventDefault()
    const globalLibrary=new GlobalLibrary()
   //  window.alert(JSON.stringify(staffAgreement,null,2))
    const result =globalLibrary.checkIfNull(
      STF_ID,
      AGREE_ID,
      SAL,
      AG_DATE,
      AG_EXPR)
      // window.alert(result);
      
   if(result)
   {
      window.alert('please compelte all the fiel');
      return
   }else{

      addStaffAgreement(staffAgreement)
   }
 }
   return (
      <form className="" onSubmit={onSubmit}>
         {loading && <Spinner /> }
         <Alert/>
         {/* STF_ID */}
         <div className="form-group row"  >
            <label htmlFor="STF_ID" className="col-sm-2 col-form-label">Employee</label>
            <div className="col-sm-10">
               <input type="text" id="txtStfID" className="form-control" 
               disabled={props.staffID ? 'true' : undefined}
               name="STF_ID" onChange={onChange}
               list="data" value={STF_ID} />
               <datalist id="data">
                  {staffs.map((item, key) =>
                     <option key={key} value={item.STF_ID}>{item.STF_FN+' '+ item.STF_LN}</option>
                  )}
               </datalist>
            </div>
         </div>
         {/* DEPARTMENT */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Department</label>
            <div className="col-sm-10">
               <select name="DEP_ID" className="form-control" onChange={cbDep_OnChange} value={Dep.DEP_ID} >
               <option onChange={cbDep_OnChange} value={0}>---Select---</option>
                   {
                  //   cbDep.map(s=>(<option value={s.DEP_ID}>{s.DEP_NAME}</option>))
                    departments.map(s=>(<option value={s.DEP_ID}>{s.DEP_NAME}</option>))
                  } 
                 
               </select>
            </div>
         </div>
         {/* POSITION */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Position</label>
            <div className="col-sm-10">
               <select name="POS_ID" className="form-control" onChange={onChange} value={POS_ID} >
               <option onChange={onChange}   value={0}>---Select---</option>
                   {
                    cbPos.map(s=>(<option value={s.POS_ID}>{s.POS_DESC}</option>))
                  } 
                 
               </select>
            </div>
         </div>
         {/* AGREE_ID */}
         <div className="form-group row">
            <label htmlFor="AGREE_ID" className="form-control" className="col-sm-2 col-form-label">Agreement Type</label>
            <div className="col-sm-10">
            <select name="AGREE_ID" className="form-control" onChange={onChange} value={AGREE_ID}>
                  <option  value={0}>---Select---</option>

                  {
                      cbAgType.map(s=>(<option value={s.ST_ID}>{s.ST_DESC}</option>))
                  }
               </select>
            </div>
         </div>
            {/* SAL */}
         <div className="form-group row">
            <label htmlFor="AGREE_ID" className="col-sm-2 col-form-label">Salary</label>
            <div className="col-sm-10">
            <input type="text" name="SAL" className="form-control" onChange={onChange} value={SAL}/>
            </div>
         </div>
            {/* AG_DATE */}
         <div className="form-group row">
            <label htmlFor="AG_DATE" className="col-sm-2 col-form-label">From Date</label>
            <div className="col-sm-10">
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" name="AG_DATE" className="form-control" onChange={onChange} value={AG_DATE}/>
            </div>
         </div>
            {/* SAL */}
         <div className="form-group row">
            <label htmlFor="AG_EXPR" className="col-sm-2 col-form-label">Salary</label>
            <div className="col-sm-10">
            <input type="date" name="AG_EXPR" className="form-control" onChange={onChange} value={AG_EXPR}/>
            </div>
         </div>
         <button type="submit"  id='submit'className="btn btn-primary">CREATE</button>
      </form>
   )
}

export default StaffAgreementModifiedModal


