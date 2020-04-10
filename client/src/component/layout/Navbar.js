import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

   return (
      <nav className="navbar navbar-expand navbar-dark   sticky-top">
         <div className="container">
            <Link className="navbar-brand" to='/'>HRMS</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>


            <ul className={`navbar-nav nav mr-auto  `}>
               <div className="dropdown">
                  <button
                     className="btn btn-primary dropdown-toggle"
                     type="button"
                     id="dropdownMenuButton"
                     data-toggle="dropdown"
                     aria-haspopup="true"
                  >
                     Employee
                </button>
                  <div className='dropdown-menu' aria-labelledby="dropdownMenuButton">
                     
                     <Link className="dropdown-item" to="/Staff"> All Employee </Link>
                     <Link className="dropdown-item" to="/StaffRelative"> Employee Relative </Link>
                     <Link className="dropdown-item" to="/StaffExperience"> Employment Experience </Link>
                     <a className="dropdown-item" href="#nogo">
                        Item 3
                     </a>
                  </div>
               </div>


               <li className="nav-item active">
                  <Link className="nav-link" to="/Staffs">Attendant </Link>
               </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/StaffAgreement">Agreement </Link>
               </li>
               <li className="nav-item active">
                  <Link className="nav-link" to="/Permison">Permison</Link>
               </li>
               <li className="nav-item active">
                  <Link className="nav-link" to="/Staffs">Salary </Link>
               </li>
               <li className="nav-item active">
                  <Link className="nav-link" to="/department">Department </Link>
               </li>

            </ul>
            
            
         </div>

      </nav>

   )
}

export default Navbar
