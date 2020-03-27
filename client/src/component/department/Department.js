import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PositionTypes from '../position-type/PositionTypes'
import PopUpButton from '../../component/layout/PopUpButton'
import DepartmentContext from '../../context/department/DepartmentContext';
import PositionTypeContext from '../../context/position/PositionTypeContext';
import Spinner from '../layout/Spinner'
import Axios from 'axios'
const Department = ({ match }) => {
   const { department, loading, loadDepartment, loadDepartmentByID, error } = useContext(DepartmentContext)
   const { clearCurrent } = useContext(PositionTypeContext)

   useEffect(() => {
      loadDepartmentByID(match.params.id);

   }, [])
   if (loading) return (<Spinner />)
   return (
      <div className="">
         <div onClick={clearCurrent} >
            <div className="jumbotron">
               <h1>{department.DEP_NAME}</h1>
               <p className="lead">{department.DEP_DESC}</p>
            </div>
         </div>
         <PositionTypes dep_id={match.params.id} />
         <ul style={{ listStyleType: 'none' }}>

            <li><Link to='/department' className=' btn btn-success'>Back</Link></li>
         </ul>

      </div>
   )

}

export default Department
