import React,{useContext,useState,useEffect} from 'react'
import PopUpButton from '../layout/PopUpButton'
import StaffContext from '../../context/staff/StaffContext';
import StaffModifiedModal from './StaffModifiedModal'

const Staff = (props) => {
   const {current, setCurrent,clearCurrent,staffs } = useContext(StaffContext);
   const {
      STF_ID,
      STF_FN,
      STF_LN,
      stf_fn_kh,
      stf_ln_kh,
      POS_DESC,
      DEP_DESC,
      STATUS_ID}=props.staff;
   const [rowID,setRowID]=useState('')
   const staffModifiedModal=<StaffModifiedModal type='edit'/>
   useEffect(() => {
      STATUS_ID!=1 ? setRowID('inActive') : setRowID('')
   }, [StaffContext,staffs])
   const setCurrentStaff=()=>{
      setCurrent(props.staff)
   }
   const clearCurrentStaff=()=>{
      clearCurrent()
   }

   return (
      <tr id={rowID} className={ (current && current.STF_ID==STF_ID)? 'selectedRow'  :''} onClick={setCurrentStaff}>
         <PopUpButton
         trigger={<td>{props.No}</td>}
        // onDoubleClick={setCurrent(staff)}
        onClosingModal={clearCurrentStaff}
         component={staffModifiedModal}
         />
         <td>{STF_ID}</td>
         <td>{STF_FN}</td>
         <td>{STF_LN}</td> 
         <td>Coming Soon</td>
         <td>Coming Soon</td>
         <td>{POS_DESC}</td>
         <td>{DEP_DESC}</td>
      </tr>
   )
}

export default Staff
