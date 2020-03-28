//#region REQUIRE
import React,{useContext} from 'react';
import './App.css';
import Navbar from './component/layout/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/home/Home'
import StatusTypeState from './context/statusType/StatusTypeState'
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
import AlertState from './context/alert/AlertState'
import Alert from './component/layout/Alert'
//import StatusTypeState from './context/statusType/StatusTypeState'
function App() {
   return (
      <div className="App">
         <AlertState>
            <DepartmentState>
               <PositionTypeState>
                  <StaffAgreementState>
                     <StatusTypeState>
                        <StaffState>
                           <StaffRelativeState>
                              <Router>
                                 <Navbar />
                                 <div className="container mt-2">
                                    <Switch>
                                       <Route exact path="/" render={() => (<Home />)} />
                                       {/* STAFF */}
                                       <Route exact path="/Staff" component={Staffs} />
                                       <Route exact path="/Staff/:id" component={StaffInfo} />
                                       <Route exact path="/StaffRelatives" component={StaffRelatives} />

                                       {/* STAFF_AGREEMENT */}
                                       <Route exact path="/StaffAgreement" component={StaffAgreements} />
                                       <Route exact path="/StaffAgreement/report" component={RptStaffAgreement} />

                                       {/* DEPARTMENT */}
                                       <Route exact path="/department" component={Departments} />
                                       <Route exact path="/department/:id" component={Department} />
                                       {/* <Route exact path="/department/:id" render={() => (<Department/>)} /> */}
                                    </Switch>
                                    <span id='sProccess' style={{
                                          fontWeight:'bold',
                                          color: 'black',
                                          position: 'fixed',
                                          bottom: '0',
                                          zIndex: '2'
                                       }}>Human Resource Management System</span>
                                    
                                    
                                 </div>
                              </Router>
                           </StaffRelativeState>
                        </StaffState>
                     </StatusTypeState>
                  </StaffAgreementState>
               </PositionTypeState>
            </DepartmentState>
            <div className="footer">
               {/* <span>Proccess : none</span> */}
               <Alert />
            </div>
         </AlertState>
      </div>
   );
}

export default App;
