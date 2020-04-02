import React, { useContext, useState, useEffect } from 'react'
import PopUpButton from '../layout/PopUpButton'
import StaffExperienceContext from '../../context/StaffExperience/StaffExperienceContext';
// import StaffExperienceModifiedModal from './StaffExperienceModifiedModal'

const StaffExperience = (props) => {
   const { current, setCurrent, clearCurrent, StaffExperiences } = useContext(StaffExperienceContext);
   
   const {
      STF_EXP_ID,
      STF_FULLNAME,
      STF_ID,
      STF_POS,
      STF_ST_D,
      STF_LT_D,
      STF_REASON,
      STATUS_ID,
      USR_CREA,
      DT_CREA,
      USR_UPDT,
      DT_UPDT
   } = props.staffExperience;
   const [rowID, setRowID] = useState('')

   // const StaffExperienceModifiedModal=<StaffExperienceModifiedModal type='edit' staffID={props.staffID}/>
   useEffect(() => {
      STATUS_ID != 1 ? setRowID('inActive') : setRowID('')
   }, [StaffExperienceContext, StaffExperiences])
 
   const setCurrentExp=()=>{
      setCurrent(props.staffExperience)
   }
   return (
      <tr id={rowID} className={(current && current.STF_EXP_ID == STF_EXP_ID) ? 'selectedRow' : ''} onClick={setCurrentExp}>
         <PopUpButton
            trigger={<td>{props.No}</td>}
            // onDoubleClick={setCurrent(staff)}
            onClosingModal={clearCurrent}
         // component={StaffExperienceModifiedModal}
         />
         <td>{STF_EXP_ID}</td>
         <td>{STF_ID}</td>
         <td>{STF_FULLNAME}</td>
         <td>{STF_POS}</td>
         <td>{STF_ST_D}</td>
         <td>{STF_LT_D}</td>
         <td>{STF_REASON}</td>
         

      </tr>
   )
}

export default StaffExperience
