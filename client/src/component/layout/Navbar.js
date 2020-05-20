import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import UserAccountContext from '../../context/UserAccount/UserAccountContext'
import UserAccounts from '../UserAccount/UserAccounts'


const Navbar = () => {
  const { isAuthenticated, logout, FULL_NAME } = useContext(UserAccountContext)
  const btn_logout_onClick = () => {
    logout()
  }
  // if (isAuthenticated)
  //    return <Redirect to='/' />
  return (
    <nav className="navbar navbar-expand navbar-dark   sticky-top">
      <div className="container">
        <ul className={`navbar-nav nav mr-auto  `}>
        <Link className="navbar-brand" to='/'>HRMS</Link>
        <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">DashBoard</Link>
          </li>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>


          <li className="active dropdown nav-item" >
            <a
              className=" nav-link dropdown-toggle"
              role="button"
              id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" href='#' data-toggle="dropdown" 
            >
              Employee
                </a>
            <div className='dropdown-menu' aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to="/Staff"> All Employee </Link>
              <Link className="dropdown-item" to="/StaffRelative"> Employee Relative </Link>
              <Link className="dropdown-item" to="/StaffExperience"> Employment Experience </Link>
              <a className="dropdown-item" href="#nogo"> Item 3 </a>
            </div>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/UserAccount">UserAccount</Link>
          </li>
          {/* <li className="nav-item active">
            <Link className="nav-link" to="/Staffs">Attendant </Link>
          </li> */}
          <li className="nav-item active">
            <Link className="nav-link" to="/StaffAgreement">Agreement</Link>
          </li>
          {/* <li className="nav-item active">
            <Link className="nav-link" to="/Permison">Permisson</Link>
          </li> */}
          <li className="nav-item active">
            <Link className="nav-link" to="/Staffs">Salary</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/department">Department </Link>
          </li>
          

        </ul>
        {
          isAuthenticated ? (<button id='btn_logout' className='btn btn-primary' onClick={btn_logout_onClick}>{FULL_NAME}</button>)
            : (
              <ul className='navbar-nav nav'>
                <li className="nav-item active">
                  <Link className="nav-link" to="/UserAccount/Register">Register</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/UserAccount/LogIn">Log In </Link>
                </li>
              </ul>
            )
        }
      </div>

    </nav>

  )
}

export default Navbar
