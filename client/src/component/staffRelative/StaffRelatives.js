//#region Staff from './Staff'
import React, { useContext, useEffect, useState } from 'react'
import StaffRelativeContext from '../../context/staffRelative/StaffRelativeContext';
import StaffRelative from './StaffRelative'
import Table from '../layout/Table'
import PopUpButton from '../layout/PopUpButton'
import StaffRelativeModifiedModal from './StaffRelativeModifiedModal'
import Spinner from '../layout/Spinner'
import Alert from '../layout/Alert'
import StatusContext from '.././../context/statusType/StatusTypeContext'
import {
   DELETE_STAFF_RELATIVE,
   DELETE_STAFF_RELATIVE_BY_STAFF_ID
} from '../../context/type'
//#endregion
const StaffRelatives = ({ staffID }) => {
   const { staffRelatives,
      staffRelativesByStfID,
      loadStaffRelative,
      deleteStaffRelative,
      current,
      clearCurrent,
      loadStaffRelativeByStaffID,
      loading } = useContext(StaffRelativeContext);
   const { allStatus, loadStatus } = useContext(StatusContext)
   useEffect(() => {
      !staffID && loadStaffRelative()
      console.log(`the staffID is ${staffID}`);
      
   }, [])

   const columns = ['No', 'Relation ID',
      'First Name', 'Last Name',
      'Gender', 'Relation',
      'Staff', 'Department'];
   let body = [];
   const staffRelativeModifiedModal = <StaffRelativeModifiedModal type='add' staffID={staffID}/>
   const initialTable=(list, body, staffID)=> {
      return list.map((staffRelative, i) => {
         body.push(<StaffRelative staffID={staffID} key={i} No={i + 1} staffRelative={staffRelative} />);
      });
   
   }

 
   return (
      <div >
         {
            loading && <Spinner/>
         }
         <div className='pageSector' style={{ overflow: 'hidden' }}>
            <div className='d-flex align-content-end flex-wrap' style={{ width: '50%', float: "left" }}>
               <ul>
                  <li><PopUpButton text='Add'  className={'btn  btn-sm btn-primary'} component={staffRelativeModifiedModal}
                     onClosingModal={clearCurrent}
                  /></li>
                  <li>
                     <button className="btn  btn-sm btn-danger"
                        onClick={() => {
                           if (!current) {
                              window.alert('Please Select Person');
                              return;
                           }
                           var isDelete = window.confirm('Do you really want to delete this Person?');
                           if (isDelete) {
                              staffID ? deleteStaffRelative(current,DELETE_STAFF_RELATIVE_BY_STAFF_ID)
                                       : deleteStaffRelative(current,DELETE_STAFF_RELATIVE)
                              
                           }
                        }}
                     >Delete</button>
                  </li>

               </ul>
            </div>
            <div style={{ width: '50%', float: 'left' }}>
               
            </div>
         </div>
         
          
         
         {
            
            //IF HAVE staffID USE staffRelativesByStfID else staffRelatives
            // staffID ?
            // initialTable(staffRelativesByStfID, body, staffID)
            // :
            // staffRelatives.map(
            //    (staffRelative, i) => {
            //       body.push(<StaffRelative key={i} No={i + 1} staffRelative={staffRelative} />)
            //    }
            // )
            staffID ? initialTable(staffRelativesByStfID, body, staffID)
                     : initialTable(staffRelatives, body, staffID)
           
           

         }
         <Alert /> 
         <Table columns={columns} body={body} />


      </div>
   )
}

export default StaffRelatives


