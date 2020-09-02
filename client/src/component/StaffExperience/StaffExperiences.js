/* eslint-disable*/
//#region Staff from './Staff'
import React, { useContext, useEffect, useState } from 'react'
import StaffExperienceContext from '../../context/StaffExperience/StaffExperienceContext';
import StaffExperienceModifiedModal from './StaffExperienceModifiedModal'
import StaffExperience from './StaffExperience'
import Table from '../layout/Table'
import PopUpButton from '../layout/PopUpButton'
import Spinner from '../layout/Spinner'
import Modal from '../layout/Modal'
// import StatusContext from '.././../context/statusType/StatusTypeContext'
// import { RELATION_TYPE } from '../../helper/Constant'

//#endregion
const StaffExperiences = ({ staffID }) => {
  //#region Initial
  const {

    // staffExperiencesByStfID,
    filterStaffExperience,
    filter,
    clearFilter,
    loadStaffExperience,
    deleteStaffExperience,
    current,
    clearCurrent,
    // loadStaffExperienceByStaffID,
    loading } = useContext(StaffExperienceContext);
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    !staffID && loadStaffExperience()

  }, [])

  const columns = [
    'No',
    'ID',
    'Emp ID',
    'Emp FullName',
    'Position',
    'Start Date',
    'Last Date',
    'Reason',
  ];
  let body = [];
  const [staffExperienceModifiedModal, setStaffExperienceModifiedModal] = useState(<StaffExperienceModifiedModal type='add' staffID={staffID} />)
  const onChange = e => {
    setSearchValue(e.target.value)
    const tmp = {
      searchValue: e.target.value,
    }
    filter(tmp)
  }
  const btnclear_onClick = () => {
    setSearchValue('')
    clearFilter()
  }
  const initialTable = (list, body, staffID) => {
    list.map((staffExperience, i) => { body.push(<StaffExperience staffID={staffID} key={i} No={i + 1} staffExperience={staffExperience} />); });

  }
  const btnDelete_onClick = () => {
    if (!current) {
      window.alert('Please Select Specific row');
      return;
    }
    var isDelete = window.confirm('Do you really want to delete this row?');
    isDelete && deleteStaffExperience(current)

  }
  const crossIcon = (<i class="fas fa-times icon"></i>)
  const plusIcon = (<i class="fas fa-plus icon"></i>)
  //#endregion
  return (
    <div >

      <div className='pageSector' style={{ overflow: 'hidden' }}>
        <div className='left-side'>
          {/* <PopUpButton text='Add' className={'btn  btn-sm btn-primary'}
            component={staffExperienceModifiedModal}
            onClosingModal={clearCurrent}
          /> */}
          <button class="btn btn-primary btn-sm" id="btnStfExperienceModi" data-toggle="modal" data-target="#StfExperienceModal">Add</button>
          <button className="btn  btn-sm btn-danger"
            onClick={btnDelete_onClick}>Delete</button>
        </div>
        <div className="right-side">
          <input type="text" name="" id="" onChange={onChange}
            style={{ width: '200px', height: '25px' }} value={searchValue} />
          <button onClick={btnclear_onClick} id="btnClear"
            style={{ width: '200px', height: '25px' }} className="btn btn-sm btn-info btn-sm"> Clear</button>
        </div>
      </div>
      <Modal modelId='StfExperienceModal' body={staffExperienceModifiedModal}/>
      {
        initialTable(filterStaffExperience, body, staffID)
      }
      {
        loading && <Spinner />
      }
      <Table columns={columns} body={body} />


    </div>
  )
}

export default StaffExperiences


