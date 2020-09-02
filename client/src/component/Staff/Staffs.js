/* eslint-disable*/
import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import Staff from './Staff'
import StaffContext from '../../context/staff/StaffContext';
import Table from '../layout/Table'
import PopUpButton from '../layout/PopUpButton'
import StaffModifiedModal from './StaffModifiedModal'
import Spinner from '../layout/Spinner'
import Modal from '../layout/Modal'
import $ from 'jquery'


const Staffs = () => {
   const { staffs, loadStaff, deleteStaff, current,setCurrent, loading } = useContext(StaffContext);
   useEffect(() => {
      loadStaff()
   }, [])

   const columns = ['No', 'Staff ID',
      'First Name', 'Last Name',
      'FirstName KH', 'LastName KH',
      'Position', 'Department'];
   let body = [];
   const [staffModifiedModal, setStaffModifiedModal] = useState(<StaffModifiedModal type='add'/>)
   const rowdblClick=(staff)=>{
      setCurrent(staff)
      setStaffModifiedModal(<StaffModifiedModal type='edit'/>)
      $('#btnStaffModi').click()
   }
   const rowClick=staff=>{
      setTimeout(() => {
      setCurrent(staff)
      }, 200);
   }
   const btnClickEvent=()=>{
      if (!current) {
         window.alert('Please Select Employee');
         return;
      }
      var isDelete = window.confirm('Do you really want to delete this Employee?');
      if (isDelete) {
         deleteStaff(current)
      }
   }
   return (
      <div >
         {
            loading && <Spinner/>
         }
         <Modal modelId='staffModal' body={staffModifiedModal}/>
         <div className='pageSector'>
            <div className='left-side'>
               <button class="btn btn-danger" id='btnStaffModi'  data-toggle="modal" data-target="#staffModal">Addnew</button>
            <button className="btn btn-danger" onClick={() => { btnClickEvent() }} >Delete</button>
                  <Link className="btn btn-info"
                        onClick={(e) => {
                           if (!current) {
                              window.alert('Please Select Employee');
                              e.preventDefault()
                           }
                        }}
                  to={`/Staff/${current && current.STF_ID}`}>Information
                  </Link>
            </div>
            <div className='right-side'></div>
         </div>
         {
            staffs.map(
               (staff, i) => {
                  body.push(<Staff key={i} No={i + 1} staff={staff} rowClick={()=>{rowClick(staff)}} rowdblClick={()=>{rowdblClick(staff)}} />)
               }
            )
         }
         <Table key={1} columns={columns} body={body} />
      </div>
   )
}


export default Staffs
