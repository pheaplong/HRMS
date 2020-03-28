//#region IMPORT
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import StaffAgreement from './StaffAgreement'
import StaffAgreementContext from '../../context/staffAgreement/StaffAgreementContext';
import StatusTypeContext from '../../context/statusType/StatusTypeContext';
import Table from '../layout/Table'
import PopUpButton from '../layout/PopUpButton'
import StaffAgreementModifiedModal from './StaffAgreementModifiedModal'
import Spinner from '../layout/Spinner'
import { AGREEMENT_TYPE } from '../../helper/Constant'
import Alert from '../layout/Alert'

//#endregion

const StaffAgreements = (props) => {
   const { loadStaffAgreement,
      addStaffAgreement,
      filterStaffAgreement,
      current,
      loading,
      filter,
      clearFilter } = useContext(StaffAgreementContext);
   const { loadStatus, allStatus } = useContext(StatusTypeContext);
   const [STF_FULLNAME, setSTF_FULLNAME] = useState('')
   const [AGREE_ID, setAGREE_ID] = useState(0)
   const cbAgType = allStatus.filter(s => s.CATEGORY === AGREEMENT_TYPE)
   const staffModifiedModal = <StaffAgreementModifiedModal staffID={props.staffID} cbAgType={cbAgType} />
   const columns = ['No','ID', 'EMPID', 'Emp Name',
   'Department',
      'Position',
      'Agreement Type',
      'Salary',
      'From Date',
      'Exp Date'
   ];
   let body = [];
   useEffect(() => {
      loadStatus()
      !props.staffID && loadStaffAgreement()
   }, [])
   const onCbChange = e => {
      setAGREE_ID(e.target.value)
      const tmp = {
         STF_FULLNAME: STF_FULLNAME,
         AGREE_ID: e.target.value
      }
      console.log(tmp);

      filter(tmp)
   }
   const onChange = e => {
      setSTF_FULLNAME(e.target.value)
      const tmp = {
         STF_FULLNAME: e.target.value,
         AGREE_ID: AGREE_ID
      }
      filter(tmp)
   }
   const btnclear_onClick = () => {
      setSTF_FULLNAME('')
      setAGREE_ID(0)
      clearFilter()
   }

   return (
      <div className='main-component'>
         {
            loading && (<Spinner />) }
              
                  {/* <Alert /> */}
                        <PopUpButton text='+' className={'btn btn-sm btn-primary floating-btn'} component={staffModifiedModal} />
                  <div className='pageSector'>
                     <div className='left-side' >
                        {/* <ul>
                           <li><PopUpButton text='Add' className={'btn btn-sm btn-primary'} component={staffModifiedModal} /></li>


                        </ul> */}
                     </div>
                     <div className='right-side' >

                        <input type="text" name="" id="" onChange={onChange}
                        style={{width:'200px',height:'35px'}} value={STF_FULLNAME} />
                        {/* <button className="btn btn-sm btn-success btn-sm">Search</button><br /> */}
                        <select name="" id="" onChange={onCbChange}
                        style={{width:'200px',height:'35px'}} value={AGREE_ID}>
                           <option onChange={onCbChange} value={0}>---Select---</option>
                           {
                              cbAgType.map(s => (<option onChange={onCbChange} value={s.ST_ID}>{s.ST_DESC}</option>))
                           }
                        </select>
                        <button onClick={btnclear_onClick} id="btnClear" 
                        style={{width:'200px',height:'35px'}} className="btn btn-sm btn-info btn-sm"> Clear</button>
                     </div>
                  </div>
                  {
                     filterStaffAgreement.map(
                        (staffAgreement, i) => {
                           body.push(<StaffAgreement key={i} No={i + 1} staffAgreement={staffAgreement} />)
                        }
                     )
                  }

                  <Table key={1} columns={columns} body={body} />
              
          
      </div>
   )
}


export default StaffAgreements
  