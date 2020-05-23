const express = require('express');
const jwt = require('jsonwebtoken')
const UserAccountRoute = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const DomainProccess = require('../DomainProccessor/UserAccountProccess');
const PermissionLogic = require('../BussinessLogic/PermissionLogic');
const StaffInfomationProccess = require('../DomainProccessor/StaffInfomationProccess');
const authenthicateUser = require('../middleware/SECURITY').authenthicateUser
const dp = new DomainProccess()
const permissionLogic = new PermissionLogic()
const staffInfomationProccess = new StaffInfomationProccess()
UserAccountRoute.get('/:id', async (req, res) => {
  const result = await permissionLogic.LoadAllPermissionByUser(req.params.id);
  res.json(result)
})
UserAccountRoute.post('/permission', (req, res) => {
  //id.length==2 is module
  //id.length>2 is action
  const tmpOrigin = req.body.originPermission.filter(e => e.id.length > 2 && e.state.selected == true)
  const tmpNewPermission = req.body.newPermission.filter(e => e.length > 2)
  permissionLogic.setPermission(req.body.USER_ID, tmpOrigin, tmpNewPermission).then(data => {
    res.json(data)
  })
})
UserAccountRoute.post('/register', async (req, res) => {
  const USER_ID = req.body.USER_ID;
  let PASSWORD = req.body.PASSWORD.toString();
  try {
    const result = await staffInfomationProccess.loadDataByID(USER_ID);
    if (result.result.length == 0)
      return res.json({ message: 'There is no Employee with this ID' })
    //Hash Password
    PASSWORD = await bcrypt.hash(PASSWORD, 10);
  } catch (error) {
    console.log('this is from error ' + error)
  }
  //Find User
  dp.findUser(USER_ID).then(user => {
    //FIND STAFF INFO WITH THIS ID
    if (user.isExist) {
      return res.json({ isSuccessed: false, message: 'This User_ID is already exist' })
    }
    const temp = {
      USER_ID,
      PASSWORD,
      STATUS_ID: 1
    }
    //add to DB
    dp.Register(temp).then(data => {
      if (!data.isSuccessed)
        res.json(data)
      const payload = {
        user: {
          USER_ID
        }
      }
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600 * 3
      }, (err, token) => {
        if (err) throw err
        data.token = token
        res.json(data)
      })
    })
  })
})


UserAccountRoute.post('/login', (req, res) => {
  console.log('hi');
  const USER_ID = req.body.USER_ID;
  let PASSWORD = req.body.PASSWORD
  const temp = {
    USER_ID,
    // PASSWORD
  }
  console.log(temp);
  //Find User
  dp.Login(temp).then(async data => {
    if (!data.isSuccessed)
      return res.json(data)
    console.log(data);
    if (!data.isLogin)
      return res.json({ isSuccessed: false, message: 'This User_ID is Invalid' })
    const compare = await bcrypt.compare(PASSWORD, data.result[0].PASSWORD);
    if (!compare) return res.json({ message: 'Incorrect Password' })
    const payload = {
      user: {
        USER_ID: data.result[0].USER_ID,
        FULL_NAME: data.result[0].FULL_NAME
      }
    }
    console.log('this is temp', payload);

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 3600 * 3
    }, (err, token) => {
      if (err) throw err
      data.result[0].token = token
      delete data.result[0].PASSWORD
      res.json(data)
    })
  }).catch(e => res.json({ message: e.message }))

})

UserAccountRoute.post('/changePassword', [authenthicateUser], (req, res) => {

  res.send('u cant come here')
})
UserAccountRoute.put('/update', (req, res) => {
  const {
    USER_ID,
    STATUS_ID,
  } = req.body;
  const temp = {
    USER_ID, STATUS_ID
  }
  dp.UpdateUser(temp).then(data => {
    res.json(data)
  }).catch(error => {
    console.log(error);
  })
})
UserAccountRoute.get('/', async (req, res) => {
  const result = await dp.loadData();
  if (result.result.length != 0)
    result.result.forEach(r => { delete r.PASSWORD });
  res.json(result)
})
module.exports = UserAccountRoute