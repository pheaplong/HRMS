import React from 'react'
import PopUpButton from '../layout/PopUpButton'

const PositionType = (props) => {
   const { POS_ID,
      POS_DESC,
      emps,
      setCurrent,
      component,
      clearCurrent,
      current } = props;
   const setCurrentPos = () => {
      setCurrent({ POS_ID, POS_DESC })
   }
   const clearCurrentPos = () => {
      clearCurrent()
   }

   return (
      <tr className={(current && current.POS_ID==POS_ID)? 'selectedRow'  :''} onClick={setCurrentPos} >
         <td >
            <PopUpButton trigger={<p>{POS_ID}</p>}
               onDoubleClick={setCurrentPos}
               onClosingModal={clearCurrentPos}
               component={component}
            />
         </td>
         <td>{POS_DESC}</td>
         <td>{emps}</td>
      </tr>
   )
}

export default PositionType
