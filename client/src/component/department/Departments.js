import React, { useContext, useEffect } from 'react'
import Card from '../layout/Card'
import { Link } from 'react-router-dom'
import DepartmentContext from '../../context/department/DepartmentContext'
import PopUpButton from '../layout/PopUpButton'
import DepartmentModifyModal from './DepartmentModifyModal'
import Spinner from '../layout/Spinner'
import Alert from '../layout/Alert'

const Departments = () => {
   // const { departments } = useContext(DepartmentContext);
   const { loadDepartment, loadDepartmentByID, loading, departments, error } = useContext(DepartmentContext);

   const departmentModifyModal = <DepartmentModifyModal />
   useEffect(() => {


      loadDepartment();

      // eslint-disable-next-line
   }, [])
   // if(loading)
   //    return(<Spinner/>)
   return (

      <div>
         <ul style={{ listStyleType: 'none' }}>
            <li><Link to='/department' className=' btn btn-success'>Back</Link></li>
            <li><PopUpButton component={departmentModifyModal} text='Add Department'
               className='btn btn-primary' /></li>
         </ul>
         <Alert />
         {
            (loading) ? (<Spinner />) : (
               <div className="row">
                  {departments.map((department, i) => (
                     <div key={department.id} className="col-md-4 mb-2" >
                        <Card header='Department' tittle={department.DEP_NAME} id={department.DEP_ID} content={department.DEP_DESC} />
                     </div>
                  ))}
               </div>
            )
         }

      </div>

   )

}

export default Departments
