import React,{useContext} from 'react'
import alertContext from '../../context/alert/alertContext'
const Alert = () => {
   const {message,isSuccess,visibility}=useContext(alertContext);
   return (
      <div className={`alert ${visibility} ${isSuccess ? 'alert-success' :'alert-warning'}`} 
       role="alert">
        <p>{message}</p> 
      </div>
   )
}

export default Alert
