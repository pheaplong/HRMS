const Domain = require('./Domain/PositionTypeDomain');
const express = require('express');
const formidable=require('formidable')
const StaffRoute = require('./route/StaffRoute')
const DepartmentRoute = require('./route/DepartmentRoute')
const LeaveHistoryRoute = require('./route/LeaveHistoryRoute')
const LeaveTypeRoute = require('./route/LeaveTypeRoute')
const PositionHistoryRoute = require('./route/PositionHistoryRoute')
const PositionTypeRoute = require('./route/PositionTypeRoute')
const StaffAgreementRoute = require('./route/StaffAgreementRoute')
const StaffRelativeRoute = require('./route/StaffRelativeRoute')
const StaffExperienceRoute = require('./route/StaffExperienceRoute')
const StatusTypeRoute = require('./route/StatusTypeRoute')
const UserAccountRoute = require('./route/UserAccountRoute')
const bodyParser = require('body-parser');
const passport = require('passport');
const authenthicateUser = require('./middleware/SECURITY').authenthicateUser
const checkPermission = require('./middleware/SECURITY').checkPermission
// const InitializePassport=require('./middleware/InitializePassport.js');
// InitializePassport(passport,)

const cors = require('cors');
const App = express();
App.use(bodyParser.json());
// App.use(formidable)
App.use(cors());

App.use('/api/UserAccount', UserAccountRoute);
// App.use('/api/staff', StaffRoute);
// App.use('/api/staff', [authenthicateUser, checkPermission], StaffRoute);
App.use('/api/staff', [authenthicateUser,checkPermission], StaffRoute);
App.use('/api/Department', [authenthicateUser, checkPermission], DepartmentRoute);
App.use('/api/LeaveHistory', [authenthicateUser, checkPermission], LeaveHistoryRoute);
App.use('/api/LeaveType', [authenthicateUser, checkPermission], LeaveTypeRoute);
App.use('/api/PositionType', [authenthicateUser, checkPermission], PositionTypeRoute);
App.use('/api/PositionHistory', [authenthicateUser, checkPermission], PositionHistoryRoute);
App.use('/api/StaffAgreement', [authenthicateUser, checkPermission], StaffAgreementRoute);
App.use('/api/StaffRelative', [authenthicateUser, checkPermission], StaffRelativeRoute);
App.use('/api/StaffExperience', [authenthicateUser, checkPermission], StaffExperienceRoute);
App.use('/api/StatusType', [authenthicateUser], StatusTypeRoute);
App.post('/upload', (req, res) => {
   console.log(req.body);
  res.json({msg:''})
});
App.get('/', (req, res) => {
  res.json({msg:''})
});

App.listen(5000, () => {
  console.log(`Server Up at Localhost port 5000`);

})