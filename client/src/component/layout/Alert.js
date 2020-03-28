import React,{useContext} from 'react'
import alertContext from '../../context/alert/alertContext'
const Alert = () => {
   const {tittle,message,isSuccess,visibility}=useContext(alertContext);
   return (
      <div id='alert' className={`alert ${visibility} ${isSuccess ? 'alert-success' :'alert-warning'}`} 
       role="alert">
        <p><strong className='mr-4'>{tittle}</strong>{message}</p> 
      </div>
   )
}

export default Alert
