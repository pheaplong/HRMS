import alertContext from './alert/alertContext'
import React, { useContext } from 'react'

class ParentSate{
   constructor(){
      let alertContext=useContext(alertContext)
      this.setAlert=alertContext.setAlert();
   }
   
}
export default ParentSate