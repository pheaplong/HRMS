const Domain = require('./Domain/PositionTypeDomain');
const express = require('express');
const StaffRoute=require('./route/StaffRoute')
const DepartmentRoute=require('./route/DepartmentRoute')
const LeaveHistoryRoute=require('./route/LeaveHistoryRoute')
const LeaveTypeRoute=require('./route/LeaveTypeRoute')
const PositionHistoryRoute=require('./route/PositionHistoryRoute')
const PositionTypeRoute=require('./route/PositionTypeRoute')
const StaffAgreementRoute=require('./route/StaffAgreementRoute')
const StaffRelativeRoute=require('./route/StaffRelativeRoute')
const StaffExperienceRoute=require('./route/StaffExperienceRoute')
const StatusTypeRoute=require('./route/StatusTypeRoute')
const UserAccountRoute=require('./route/UserAccountRoute')
const bodyParser=require('body-parser');
const passport=require('passport');
const authenthicateUser = require('./middleware/SECURITY').authenthicateUser
// const InitializePassport=require('./middleware/InitializePassport.js');
// InitializePassport(passport,)

const cors=require('cors');
const App=express();
App.use(bodyParser.json());
App.use(cors());

App.use('/api/staff',StaffRoute);
App.use('/api/Department',[authenthicateUser],DepartmentRoute);
App.use('/api/LeaveHistory',[authenthicateUser],LeaveHistoryRoute);
App.use('/api/LeaveType',[authenthicateUser],LeaveTypeRoute);
App.use('/api/PositionType',[authenthicateUser],PositionTypeRoute);
App.use('/api/PositionHistory',[authenthicateUser],PositionHistoryRoute);
App.use('/api/StaffAgreement',[authenthicateUser],StaffAgreementRoute);
App.use('/api/UserAccount',UserAccountRoute);
App.use('/api/StaffRelative',[authenthicateUser],StaffRelativeRoute);
App.use('/api/StaffExperience',[authenthicateUser],StaffExperienceRoute);
App.use('/api/StatusType',[authenthicateUser],StatusTypeRoute);
App.get('/',(req,res)=>{
   res.send('go back')
});

App.listen(5000,()=>{
    console.log(`Server Up at Localhost port 5000`);
    
 })