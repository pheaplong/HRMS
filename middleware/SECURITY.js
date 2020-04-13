const jwt = require('jsonwebtoken')
const config = require('config')
const PermissionProccess = require('../DomainProccessor/PermissionProccess')
const authenthicateUser = async (req, res, next) => {
   try {
      const token = req.header('auth-token')
      // console.log(token);

      if (!token)
         return res.send({ isSuccess: false, message: 'No Token! Authorization Failed' })
      try {
         console.log('i am from security ' + token);
         const verified = await jwt.verify(token, config.get('jwtSecret'))
         req.user = verified
         next()
      } catch (error) {
         return res.send({ isSuccess: false, message: 'Invalid Token' })
      }
   } catch (error) {
      return next(error)
   }
}
const checkPermission = async (req, res, next) => {
   const permissionProccess = new PermissionProccess()
   const result = await permissionProccess.loadDataByID(req.header('USER_ID'), req.header('ACTION_ID'))
   if (!result.isSuccessed)
      return res.json(res)
   if (res.result.length == 0)
      return res.json({ message: 'Permission Denied' })
   return res.json(res)
}
module.exports.authenthicateUser = authenthicateUser;