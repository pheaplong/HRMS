import React, { useContext, useEffect } from 'react'
import Table from '../layout/Table'
import PositionType from './PositionType'
import PopUpButton from '../../component/layout/PopUpButton'
import PositionTypeContext from '../../context/position/PositionTypeContext'
import PositionTypeModifyModal from './PositionTypeModifyModal'
import Alert from '../layout/Alert'
const PositionTypes = (props) => {
   const columns = ['Position ID', 'Position Name', 'Emps'];
   const { PositionTypes,
      loadPositionTypeByFilter,
      loadPositionType,
      deletePositionType,
      setCurrent,
      current,
      clearCurrent } = useContext(PositionTypeContext)
   let body = [];
   useEffect(() => {
      loadPositionTypeByFilter(props.dep_id);
   }, [])
   let positionTypeModifyModal = <PositionTypeModifyModal
      DEP_ID={props.dep_id}
   />
   const abc=()=>{

      clearCurrent()
   }
   const removePositionType=PositionType=>{
      deletePositionType(PositionType);
      abc();
   }
   return (
      <div>
         <ul>
            {/* <li><PopUpButton  text='Add' component={positionTypeModifyModal} */}
            <li><PopUpButton text='Add' component={positionTypeModifyModal}
               onClosingModal={clearCurrent}
               className='btn btn-primary' /></li>
            <li><button className="btn btn-danger"
               onClick={() => {
                  if (!current) {
                     window.alert('Please Select Position');
                     return;
                  }
                  var isDelete = window.confirm('Do you really want to delete this Position?'+current.pos_id);
                  if(isDelete) {
                     removePositionType(current)
                 
                  }
               }}
            >Delete</button></li>
         </ul>
         <Alert/>
         {
            PositionTypes.forEach(pos => {
               body.push(
                  <PositionType
                     component={positionTypeModifyModal}
                     setCurrent={setCurrent}
                     clearCurrent={clearCurrent}
                     current={current}
                     POS_ID={pos.POS_ID}
                     POS_DESC={pos.POS_DESC}
                     emps={2}
                     type='E' />)
            })
         }
         <Table columns={columns} body={body} />
      </div>
   )
}

export default PositionTypes
