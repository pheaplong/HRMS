/* eslint-disable*/
import React, { useContext, useState, useEffect } from 'react'
import Alert from '../layout/Alert'
import DepartmentContext from '../../context/department/DepartmentContext'
import PositionTypeContext from '../../context/position/PositionTypeContext'
import Spinner from '../layout/Spinner'

const PositionTypeModifyModal = ({ DEP_ID, text, type = 'A' }) => {

   const {
      addPositionType,
      updatePositionType,
       loading,
      current,
      setCurrent,
      clear_current } = useContext(PositionTypeContext);

   const [positionType, setpositionType] = useState({
      POS_DESC: current ? current.POS_DESC :'' ,
      DEP_ID:DEP_ID,
      POS_ID:current ? current.POS_ID : null

   })


   // const a = useContext(DepartmentContext);
   const onChange = e => {
      setpositionType({ ...positionType, [e.target.name]: e.target.value });
   }
   const clearState = () => {
      setpositionType({ ...positionType, POS_DESC: '' });
   }
   const createpositionType = () => {
      addPositionType(positionType);
      clearState();
      // window.alert('Add')
   }
   const updatePos = () => {
      updatePositionType(positionType);
      clearState();
   }
   const onSubmit = e => {
      e.preventDefault();
      current ? updatePos()  : createpositionType()

   }
   return (
      <form onSubmit={onSubmit} className='p-3'>

         {loading ? <Spinner /> : <Alert />}

         <div className="form-group row">
            <label htmlFor="POS_DESC" className="col-sm-2 col-form-label">Position Name</label>
            <div className="col-sm-10">
               <input type="text" className="form-control"
                autoFocus  autoComplete='off' value={positionType.POS_DESC} 
                name="POS_DESC" onChange={onChange} placeholder="Position Name" />
            </div>
         </div>

         <button type="submit" className="btn btn-primary" >{current ? 'Update' : 'Create'}</button>
      </form>
   )
}

export default PositionTypeModifyModal
