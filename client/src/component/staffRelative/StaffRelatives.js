/* eslint-disable*/
//#region Staff from './Staff'
import React, { useContext, useEffect, useState } from 'react'
import StaffRelativeContext from '../../context/staffRelative/StaffRelativeContext';
import StaffRelative from './StaffRelative'
import Table from '../layout/Table'
import PopUpButton from '../layout/PopUpButton'
import StaffRelativeModifiedModal from './StaffRelativeModifiedModal'
import Spinner from '../layout/Spinner'
import StatusContext from '.././../context/statusType/StatusTypeContext'
import {RELATION_TYPE} from '../../helper/Constant'
import {
   DELETE_STAFF_RELATIVE,
   DELETE_STAFF_RELATIVE_BY_STAFF_ID
} from '../../context/type'
//#endregion
const StaffRelatives = ({ staffID }) => {
   const { staffRelatives,
      staffRelativesByStfID,
      filterStaffRelative,
      filter,
      loadStaffRelative,
      deleteStaffRelative,
      current,
      clearCurrent,
      loadStaffRelativeByStaffID,
      loading } = useContext(StaffRelativeContext);
   const { allStatus, loadStatus } = useContext(StatusContext)
   const  cbRelType=allStatus.filter(s=>s.CATEGORY==RELATION_TYPE)
   const [searchValue, setSearchValue] = useState('')
   const [RELATION_ID, setRELATION_ID] = useState(0)
   useEffect(() => {
      !staffID && loadStaffRelative()
      loadStatus()
      console.log(`the staffID is ${staffID}`);

   }, [])

   const columns = ['No', 'Relation ID',
      'First Name', 'Last Name',
      'Gender', 'Relation',
      'Staff', 'Department'];
   let body = [];
   const staffRelativeModifiedModal = <StaffRelativeModifiedModal type='add' staffID={staffID} />
   const onCbChange = e => {
      setRELATION_ID(e.target.value)
      const tmp = {
         searchValue:searchValue,
         RELATION_ID:e.target.value
        
      }
      console.log(tmp);

      filter(tmp)
   }
   const onChange = e => {
      setSearchValue(e.target.value)
      const tmp = {
         searchValue: e.target.value,
         RELATION_ID: RELATION_ID
      }
      filter(tmp)
   }
   const btnclear_onClick = () => {
      setRELATION_ID(0);
      setSearchValue('')
      // clearFilter()
   }
   const initialTable = (list, body, staffID) => {
       list.map((staffRelative, i) => {
         body.push(<StaffRelative staffID={staffID} key={i} No={i + 1} staffRelative={staffRelative} />);
      });

   }
   const btnDelete_onClick=() => {
      if (!current) {
         window.alert('Please Select Person');
         return;
      }
      var isDelete = window.confirm('Do you really want to delete this Person?');
      if (isDelete) {
         staffID ? deleteStaffRelative(current, DELETE_STAFF_RELATIVE_BY_STAFF_ID)
            : deleteStaffRelative(current, DELETE_STAFF_RELATIVE)

      }
   }
   const crossIcon=(<i class="fas fa-times icon"></i>)
   const plusIcon=(<i class="fas fa-plus icon"></i>)
   return (
      <div >
         {
            loading && <Spinner />
         }
         {
            staffID ? (<div><PopUpButton text={plusIcon} className={'btn  btn-sm btn-primary floating-btn'} component={staffRelativeModifiedModal}
                         onClosingModal={clearCurrent}/>
                        <button className="btn  btn-sm btn-danger floating-btn btn-2" id='btnDelete'
                         onClick={btnDelete_onClick}>{crossIcon}</button></div>)
                     : (
                        <div className='pageSector' style={{ overflow: 'hidden' }}>
                           <div className='left-side'>
                           
                                 
                              <ul>
                                 <li><PopUpButton text='Add' className={'btn  btn-sm btn-primary'} component={staffRelativeModifiedModal}
                                    onClosingModal={clearCurrent}
                                 /></li>
                                 <li>
                                    <button className="btn  btn-sm btn-danger"
                                       onClick={btnDelete_onClick}>Delete</button>
                                 </li>
               
                              </ul>
                           </div>
                           <div className="right-side">
               
                              <input type="text" name="" id="" onChange={onChange}
                                 style={{ width: '200px', height: '25px' }} value={searchValue} />
                              {/* <button className="btn btn-sm btn-success btn-sm">Search</button><br /> */}
                              <select name="" id="" onChange={onCbChange}
                                 style={{ width: '200px', height: '25px' }} value={RELATION_ID}>
                                 <option onChange={onCbChange} value={0}>---Select---</option>
                                 {
                                    cbRelType.map(s => (<option onChange={onCbChange} value={s.ST_ID}>{s.ST_DESC}</option>))
                                 }
                              </select>
                              <button onClick={btnclear_onClick} id="btnClear"
                                 style={{ width: '200px', height: '25px' }} className="btn btn-sm btn-info btn-sm"> Clear</button>
                           </div>
                        </div>
               )
         }



         {

            //IF HAVE staffID USE staffRelativesByStfID else filterStaffRelative
            // staffID ?
            // initialTable(staffRelativesByStfID, body, staffID)
            // :
            // staffRelatives.map(
            //    (staffRelative, i) => {
            //       body.push(<StaffRelative key={i} No={i + 1} staffRelative={staffRelative} />)
            //    }
            // )
            staffID ? initialTable(staffRelativesByStfID, body, staffID)
               : initialTable(filterStaffRelative, body, staffID)



         }

         <Table columns={columns} body={body} />


      </div>
   )
}

export default StaffRelatives


