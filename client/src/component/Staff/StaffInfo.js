import React, { useContext, useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner'
//#region FORM_CONTENT
import StaffRelativeModifiedModal from '../staffRelative/StaffRelativeModifiedModal';
import StaffModifiedModal from './StaffModifiedModal'
//#endregion

//#region  CONTEXT

import StaffAgreementContext from '../../context/staffAgreement/StaffAgreementContext'
import StaffRelativeContext from '../../context/staffRelative/StaffRelativeContext'
import StaffContext from '../../context/staff/StaffContext'
// import StaffContext from '../../context/staffAgreement/'
//#endregion
import StaffAgreements from '../StaffAgreement/StaffAgreements';
import StaffRelatives from '../staffRelative/StaffRelatives'
const StaffInfo = ({ match }) => {
   
   const { loadStaffByID } = useContext(StaffContext)

   const tabStyle={
      display:'none'
   }
  const {  loadStaffAgreementByID } = useContext(StaffAgreementContext)
   const {  loadStaffRelativeByStaffID } = useContext(StaffRelativeContext)
   // const {
   //    STF_FN,
   //    STF_LN,
   //    STF_GENDER,
   //    STF_MARITAL_ST,
   //    STF_DOB,
   //    STF_POB,
   //    STATUS_ID
   // } = current
   const [tabContent, setTabContent] = useState('stf-info')
   useEffect(() => {
      loadStaffByID(match.params.id) 
      loadStaffAgreementByID(match.params.id)
      loadStaffRelativeByStaffID(match.params.id)
    
   }, [])

const testfunc=(id)=>{
   const stfinfo=document.getElementsByClassName('tab-content')
   for (let i = 0; i < stfinfo.length; i++) {
      stfinfo[i].style.display = "none";
    }
    document.getElementById(id).style.display="block"
}
   return (
   <div>
      <Link className="btn btn-sm btn-primary" to='/Staff'>Back</Link>
   
      <div className="wrapper">
         <div className="sidebar">
            <button className="tab-links" onClick={()=>testfunc('stf-info')}>Infomation</button>
            <button className="tab-links" onClick={()=>testfunc('stf-ag')}>Agreement</button>
            <button className="tab-links" onClick={()=>testfunc('stf-rel')}>Relative</button>
            <button className="tab-links" onClick={()=>testfunc('stf-exp')}>Employment History</button>
            <button className="tab-links" onClick={()=>0}>Leave History</button>
            <button className="tab-links" onClick={()=>0}>Leave History</button>
         </div>
         <script>
            
         </script>
         <div className="content">
            <div className="tab-content" id="stf-info">
            <StaffModifiedModal staffID={match.params.id} type='view'/>
            
            </div>
            <div className="tab-content" id="stf-ag"  style={{display:'none'}}>
            <StaffAgreements staffID={match.params.id}/>
            </div>
            <div className="tab-content" id="stf-rel"  style={{display:'none'}}>
            <StaffRelatives staffID={match.params.id}/>
            </div>
         </div>
        
      </div>
      </div>
   )
}


export default StaffInfo
