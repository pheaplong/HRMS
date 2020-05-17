//#region REQUIRE
import React, { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/home/Home'
import StatusTypeState from './context/statusType/StatusTypeState'
import UserAccountState from './context/UserAccount/UserAccountState'
import UserAccounts from './component/UserAccount/UserAccounts'
import PrivateRoute from './PrivateRoute'
import Login from './component/UserAccount/Login'
import Register from './component/UserAccount/Register'
//#endregion

//#region  STAFF 
import StaffState from './context/staff/StaffState';
import Staffs from './component/Staff/Staffs'
import StaffInfo from './component/Staff/StaffInfo'
//#endregion

//#region  STAFF_RELATIVE
import StaffRelativeState from './context/staffRelative/StaffRelativeState';
import StaffRelatives from './component/staffRelative/StaffRelatives'
//#endregion

//#region  DEPARTMENT
import DepartmentState from './context/department/DepartmentState';
import Departments from './component/department/Departments'
import Department from './component/department/Department'
import PositionTypeState from './context/position/PositionTypeState'
//#endregion

//#region STAFF_AGREEMENT
import StaffAgreementState from './context/staffAgreement/StaffAgreementState'
import StaffAgreements from './component/StaffAgreement/StaffAgreements'
import RptStaffAgreement from './component/StaffAgreement/RptStaffAgreement'

//#endregion
//#region STAFF_EXPERIENCE
import StaffExperienceState from './context/StaffExperience/StaffExperienceState'
import StaffExperiences from './component/StaffExperience/StaffExperiences'
// import RptStaffAgreement from './component/StaffAgreement/RptStaffAgreement'

//#endregion

import AlertState from './context/alert/AlertState'
import Alert from './component/layout/Alert'
import Dashboard from './component/Dashboard'
import GlobalLibrary from './helper/GlobalLibrary';
//import StatusTypeState from './context/statusType/StatusTypeState'
function App() {
  useEffect(() => {
    // startTime()
    return () => {
      // document.remove(script)
    }
  }, [])
  return (
    <div className="App">
      <AlertState>
        <UserAccountState>
          <DepartmentState>
            <PositionTypeState>
              <StaffAgreementState>
                <StatusTypeState>
                  <StaffState>
                    <StaffRelativeState>
                      <StaffExperienceState>

                        <Router>
                          <Navbar />
                          <div className="container pt-2">
                            <div id="time" style={{
                              fontSize: '1em',
                              color: 'white',
                              position: 'fixed',
                              bottom: '3px',
                              right: '1%',
                              zIndex: '999'
                            }}></div>

                            <Switch>
                              <Route exact path="/UserAccount" component={UserAccounts} />
                              <Route exact path="/UserAccount/:type" component={Register} />
                              <PrivateRoute exact path="/Dashboard" component={Dashboard} />
                              {/* STAFF */}
                              <Route exact path="/Staff" component={Staffs} />
                              <PrivateRoute exact path="/Staff/:id" component={StaffInfo} />
                              <PrivateRoute exact path="/StaffRelative" component={StaffRelatives} />
                              <PrivateRoute exact path="/Staffexperience" component={StaffExperiences} />

                              {/* STAFF_AGREEMENT */}
                              <PrivateRoute exact path="/StaffAgreement" component={StaffAgreements} />
                              <PrivateRoute exact path="/StaffAgreement/report" component={RptStaffAgreement} />

                              {/* DEPARTMENT */}
                              <PrivateRoute exact path="/department" component={Departments} />
                              <PrivateRoute exact path="/department/:id" component={Department} />
                              {/* <Route exact path="/department/:id" render={() => (<Department/>)} /> */}
                              {/* <Route path="/" render={() => (<Register />)} /> */}
                              <Route exact path="/" component={Home} />
                            </Switch>
                            <span id='sProccess' style={{
                              fontSize: 'rem',
                              color: 'white',
                              position: 'fixed',
                              bottom: '3px',
                              zIndex: '901'
                            }}>Human Resource Management System</span>
                          </div>
                        </Router>
                      </StaffExperienceState>
                    </StaffRelativeState>
                  </StaffState>
                </StatusTypeState>
              </StaffAgreementState>
            </PositionTypeState>
          </DepartmentState>
          <div className="footer"
            style={{ zIndex: '900' }}
          >
            {/* <span>Proccess : none</span> */}
            <Alert />
          </div>
        </UserAccountState>
      </AlertState>
    </div>
  );
}

export default App;


