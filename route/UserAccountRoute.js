const express = require('express');
const jwt = require('jsonwebtoken')
const UserAccountRoute = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const DomainProccessor = require('../DomainProccessor/UserAccountProccess');
const authenthicateUser = require('../middleware/SECURITY').authenthicateUser
const dp = new DomainProccessor()
UserAccountRoute.post('/register', async (req, res) => {

   const USER_ID = req.body.USER_ID; let PASSWORD = req.body.PASSWORD.toString();

   try {
      //Hash Password
      PASSWORD = await bcrypt.hash(PASSWORD, 10);
   } catch (error) {
      console.log('this is from error ' + error)
   }
   const temp = {
      USER_ID,
      PASSWORD,
      STATUS_ID: 1
   }
   //Find User
   dp.findUser(temp.USER_ID).then(user => {
      if (user.isExist) {
         return res.json({ isSuccessed: false, message: 'This User_ID is already exist' })
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
   const {
      USER_ID,
   } = req.body;
   let PASSWORD = req.body.PASSWORD.toString()
   //Find User
   dp.findUser(USER_ID).then(async user => {
      if (!user.isExist) {
         return res.json({ isSuccessed: false, message: 'This User_ID is Invalid' })
      }
      const compare = await bcrypt.compare(PASSWORD, user.result[0].PASSWORD);
      const payload = {
         user: {
            USER_ID
         }
      }
      if (!compare) return res.json({ message: 'Incorrect Password' })
      jwt.sign(payload, config.get('jwtSecret'), {
         expiresIn: 3600 * 3
      }, (err, token) => {
         if (err) throw err
         res.json({ isSuccessed: true })
      })
   })

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
module.exports = UserAccountRoute