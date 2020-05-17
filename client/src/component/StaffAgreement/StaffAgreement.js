/* eslint-disable*/
import React,{useContext,useState,useEffect} from 'react'
import PopUpButton from '../layout/PopUpButton'
import StaffAgreementContext from '../../context/staffAgreement/StaffAgreementContext'
import StaffAgreementModifiedModal from './StaffAgreementModifiedModal'
import {Redirect} from 'react-router-dom'
const StaffAgreement = (props) => {
   const {current, setCurrent,clearCurrent } = useContext(StaffAgreementContext);
   const [rowID,setRowID]=useState('')
   const [redirect, setRedirect] = useState('')
   const staffAgreementModifiedModal=<StaffAgreementModifiedModal type='edit'/>
   const {DT_UPDT,
      USR_UPDT,
      DT_CREA,
      USR_CREA,
      STATUS_ID,
      AG_EXPR,
      AG_DATE,
      SAL,
      POS_DESC,
      DEP_DESC,
      AGREE_ID,
      AGREE_TYPE,
      STF_ID,
      STF_FULLNAME,
      AG_ID}=props.staffAgreement
   const setCurrentStaffAgreement=()=>{
      return
      setCurrent(props.StaffAgreement)
   }
   const clearCurrentStaffAgreement=()=>{
      clearCurrent()
   }
   const row_onClick =e=>{
      setCurrent(props.staffAgreement)
   
   }
   const row_onDoubleClick =e=>{
      setCurrent(props.staffAgreement)
      setRedirect(`/staffagreement/report`)
   }
   if(redirect)
    return <Redirect to={redirect} />

   return (
      
      <tr id={rowID} className={ (current && current.AG_ID==AG_ID)? 'selectedRow'  :''} 
      onDoubleClick={row_onDoubleClick}
      onClick={row_onClick}>
         <PopUpButton
         trigger={<td>{props.No}</td>}
        // onDoubleClick={setCurrent(StaffAgreement)}
        onClosingModal={clearCurrentStaffAgreement}
         component={StaffAgreementModifiedModal}
         />
         <td>{AG_ID}</td>
         <td>{STF_ID}</td>
         <td>{STF_FULLNAME}</td>
         <td>{DEP_DESC}</td>
         <td>{POS_DESC}</td>
         <td>{AGREE_TYPE}</td>
         {/* <td>{STF_FULLNAME}</td> */}
         <td>{SAL}</td>
         <td>{AG_DATE}</td>
         <td>{AG_EXPR}</td>
        
      </tr>
   )
}

export default StaffAgreement
