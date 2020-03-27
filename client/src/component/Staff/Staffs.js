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


const Staffs = () => {
   const { staffs, loadStaff, deleteStaff, current, loading } = useContext(StaffContext);
   useEffect(() => {
      loadStaff()
   }, [])

   const columns = ['No', 'Staff ID',
      'First Name', 'Last Name',
      'FirstName KH', 'LastName KH',
      'Position', 'Department'];
   let body = [];
   const staffModifiedModal = <StaffModifiedModal type='add'/>

   return (
      <div >
         {
            loading && <Spinner/>
         }
         <div className='pageSector'>
            <div className='d-flex align-content-end flex-wrap' style={{ width: '50%', height: '100%', backgroundColor: 'RED', float: "left" }}>
               <ul>
                  <li><PopUpButton text='Add' className={'btn btn-primary'} component={staffModifiedModal} /></li>
                  <li><button className="btn btn-danger"
                     onClick={() => {
                        if (!current) {
                           window.alert('Please Select Employee');
                           return;
                        }
                        var isDelete = window.confirm('Do you really want to delete this Employee?');
                        if (isDelete) {
                           deleteStaff(current)
                        }
                     }}
                  >Delete</button></li>
                  <li>
                     <Link className="btn btn-info"
                        onClick={(e) => {
                           if (!current) {
                              window.alert('Please Select Employee');
                              e.preventDefault()
                           }

                        }}
                        to={`/Staff/${current &&current.STF_ID }`}>Information</Link>
                  </li>
               </ul>
            </div>
            <div style={{ width: '50%', backgroundColor: 'purple', float: 'left' }}>
               {/* <input type="text" name="" id="" />
               <button className="btn btn-danger">Search</button><br />
               <input type="text" name="" id="" />
               <button className="btn btn-info">Clear</button> */}
            </div>
         </div>
         {
            staffs.map(
               (staff, i) => {
                  body.push(<Staff key={i} No={i + 1} staff={staff} />)
               }
            )
         }
         {/* {
            loading ? :/>
         } */}
          <Alert/>
         <Table key={1} columns={columns} body={body} />
      </div>
   )
}


export default Staffs
