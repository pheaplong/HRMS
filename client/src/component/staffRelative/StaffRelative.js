/* eslint-disable*/
import React,{useContext,useState,useEffect} from 'react'
import PopUpButton from '../layout/PopUpButton'
import StaffRelativeContext from '../../context/staffRelative/StaffRelativeContext';
import StaffRelativeModifiedModal from './StaffRelativeModifiedModal'

const StaffRelative = (props) => {
   const {current, setCurrent,clearCurrent,staffRelatives } = useContext(StaffRelativeContext);
   //NEED CHANGE
   const {REL_ID,
      STF_ID,
      REL_FN,
      REL_LN,
      REL_GENDER,
      STATUS_ID,
      USR_CREA,
      DATE_CREA,
      USR_UPDT,
      DATE_UPDT,
      RELATION_ID,
      RELATION,
      STAFF}=props.staffRelative;
   const [rowID,setRowID]=useState('')

   const staffRelativeModifiedModal=<StaffRelativeModifiedModal type='edit' staffID={props.staffID}/>
   useEffect(() => {
      STATUS_ID!=1 ? setRowID('inActive') : setRowID('')
   }, [StaffRelativeContext,staffRelatives])
   const setCurrentStaff=()=>{
      setCurrent(props.staffRelative)
   }
   const clearCurrentStaff=()=>{
      clearCurrent()
   }

   return (
      <tr id={rowID} className={ (current && current.REL_ID==REL_ID)? 'selectedRow'  :''} onClick={setCurrentStaff}>
         <PopUpButton
         trigger={<td>{props.No}</td>}
        // onDoubleClick={setCurrent(staff)}
        onClosingModal={clearCurrentStaff}
         component={staffRelativeModifiedModal}
         />
         <td>{REL_ID}</td>
         <td>{REL_FN}</td>
         <td>{REL_LN}</td>
         <td>{REL_GENDER}</td>
         <td>{RELATION}</td>
         <td>{STAFF}</td>
         <td>Department</td>
       
      </tr>
   )
}

export default StaffRelative
