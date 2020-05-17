/* eslintdisable */
import {createContext} from 'react';
import React,{useContext,useState, useEffect} from 'react'
import Alert from '../layout/Alert'
import DepartmentContext from '../../context/department/DepartmentContext'
import Spinner from '../layout/Spinner'

const DepartmentModifyModal = () => {
   
  const {addDepartment,loading} = useContext(DepartmentContext)
   const[department,setDepartment]=useState({DEP_NAME:'',DEP_DESC:''})
  
   // const a = useContext(DepartmentContext);
   const onChange = e =>{
    setDepartment({ ...department, [e.target.name]: e.target.value });
   }
   const clearState=()=>{
      setDepartment(
         {DEP_NAME:'',DEP_DESC:''}
         )
   }
   const onSubmit=e=>{
      e.preventDefault();
      addDepartment(department)
      clearState()

   }
   return (
      <form onSubmit={onSubmit} className='p-3'>
         
         {loading ? <Spinner/> : <Alert/>}
   
        <div className="form-group row">
            <label htmlFor="dep_name" className="col-sm-2 col-form-label">Department Name</label>
            <div className="col-sm-10">
               <input type="text" className="form-control" value={department.DEP_NAME} 
               name="DEP_NAME" onChange={onChange} placeholder="Department Name" autoComplete='off'/>
            </div>
         </div>
         <div className="form-group row">
            <label htmlFor="DEP_DESC" className="col-sm-2 col-form-label">Department Description</label>
            <div className="col-sm-10">
               <input type="text" className="form-control" value={department.DEP_DESC}  
               name="DEP_DESC" onChange={onChange} placeholder="Department Description" autoComplete='off'/>
            </div>
         </div>       
         <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
   )
}

export default DepartmentModifyModal
