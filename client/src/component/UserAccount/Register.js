import React, { useEffect, useState, useContext } from 'react'
import UserAccountContext from '../../context/UserAccount/UserAccountContext'
import Spinner from '../layout/Spinner'
import { Redirect, Link } from 'react-router-dom'
import GlobalLibrary from '../../helper/GlobalLibrary'

const Register = ({ match }) => {
   const type = match.params.type.toLowerCase()
   const { register, isAuthenticated, isRegisterSuccess, loading, login } = useContext(UserAccountContext)
   const [userAccount, setUserAccount] = useState({
      USER_ID: '',
      PASSWORD: '',
      C_PASSWORD: '',
   })
   const {
      USER_ID, PASSWORD, C_PASSWORD
   } = userAccount
   useEffect(() => {
      setUserAccount({
         USER_ID: '',
         PASSWORD: '',
         C_PASSWORD: '',
      })

   }, [type, isAuthenticated, isRegisterSuccess])
   const onChange = e => {
      setUserAccount({ ...userAccount, [e.target.name]: e.target.value });
   }
   const onSubmit = e => {
      e.preventDefault();
      const globalLibrary = new GlobalLibrary
      const isNull = globalLibrary.checkIfNull(USER_ID, PASSWORD)
      if (isNull)
         return alert('Please Fill all the fieldj')
      if (type !== 'register') {
         login(userAccount)
      } else {
         if (globalLibrary.checkIfNull(C_PASSWORD))
            return alert('Please Fill all the fieldj')
         register(userAccount)
      }

   }
   if (isRegisterSuccess)
      return <Redirect to='/useraccount/login' />
   if (isAuthenticated) {
      return <Redirect to='/dashboard' />
   }
   return (

      <form onSubmit={onSubmit} className='register-form'>
         {
            loading && (<Spinner />)
         }
         {/* USERNAME */}
         <div className="form-group row">
            <label htmlFor="" className="col-sm-2 col-form-label">UserName</label>
            <div className="col-sm-10">
               <input autoFocus type="USER_ID" autoFocus onChange={onChange} className="form-control" autoComplete='off'
                  name="USER_ID" value={USER_ID} placeholder="User Name" />
            </div>
         </div>
         {/* PASSWORD */}
         <div className="form-group row">
            <label htmlFor="PASSWORD" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
               <input type="password" onChange={onChange} className="form-control" autoComplete='off'
                  name="PASSWORD" value={PASSWORD} placeholder="Password" />
            </div>
         </div>
         {/* COMFIRM_PASSWORD */}
         {
            match.params.type == 'Register' && (
               < div className="form-group row">
                  <label htmlFor="C_PASSWORD" className="col-sm-2 col-form-label">Confirm Password</label>
                  <div className="col-sm-10">
                     <input type="password" onChange={onChange} className="form-control" autoComplete='off'
                        name="C_PASSWORD" value={C_PASSWORD} placeholder="Confirm Password" />
                  </div>
               </div>
            )
         }
         <div className="form-group row">
            <button type="submit" id='submit' className="btn btn-primary">{type === 'register' ? 'Register' : 'Log In'}</button>
            <Link className='btn btn-success' to={type === 'register' ? '/useraccount/Login' : '/useraccount/Register'}>{type === 'register' ? 'Log In' : 'Register'}</Link>
         </div>
      </form >
   )
}

export default Register
