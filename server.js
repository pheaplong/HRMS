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
const DomainProccessor=require('./DomainProccessor/PositionTypeProccess')
const bodyParser=require('body-parser');
const cors=require('cors');
const App=express();
App.use(bodyParser.json());
App.use(cors());

App.use('/api/staff',StaffRoute);
App.use('/api/Department',DepartmentRoute);
App.use('/api/LeaveHistory',LeaveHistoryRoute);
App.use('/api/LeaveType',LeaveTypeRoute);
App.use('/api/PositionType',PositionTypeRoute);
App.use('/api/PositionHistory',PositionHistoryRoute);
App.use('/api/StaffAgreement',StaffAgreementRoute);
App.use('/api/StaffRelative',StaffRelativeRoute);
App.use('/api/StaffExperience',StaffExperienceRoute);
App.use('/api/StatusType',StatusTypeRoute);
App.use('/',(req,res)=>{
   res.send('go back')
});

App.listen(5000,()=>{
    console.log(`Server Up at Localhost port 5000`);
    
 })