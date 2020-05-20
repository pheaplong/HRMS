/* eslint-disable*/
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Staff from './Staff'
import StaffContext from '../../context/staff/StaffContext';
import Table from '../layout/Table'
import PopUpButton from '../layout/PopUpButton'
import StaffModifiedModal from './StaffModifiedModal'
import Spinner from '../layout/Spinner'
import Alert from '../layout/Alert';


const Salary = () => {
   const {loadSalary,salary,loading} = useContext(StaffContext);
   const columns=['No','EMP_ID','EMP_FULLNAME','SALARY']
   const body=[]
   useEffect(() => {
      loadSalary()
   }, [])
   return (
      <div >
         {
            loading && <Spinner/>
         }
         <div className='pageSector'>
            <div className='left-side'></div>
            <div className='right-side'>
            </div>
         </div>
         {
            // salary.map((s,i)=>{
            //    body.push(<tr>
            //       <td>{i+1}</td>
            //       <td>{s.STF_ID}</td>
            //       <td>{s.FULL_NAME}</td>
            //       <td>{s.SAL}</td>
            //    </tr>)
            // })
         }
         <Table body={columns} columns={body}/>
      </div>
   )
}


export default Salary
