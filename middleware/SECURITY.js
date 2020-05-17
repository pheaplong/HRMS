const jwt = require('jsonwebtoken')
const config = require('config')
const PermissionLogic = require('../BussinessLogic/PermissionLogic')
const authenthicateUser = async (req, res, next) => {
  try {
    const token = req.header('auth-token')
    if (!token)
      return res.send({ isSuccessed: false, message: 'No Token! Authorization Failed' })
    try {
      console.log('i am from security ' + token);
      const verified = await jwt.verify(token, config.get('jwtSecret'))
      req.user = verified
      next()
    } catch (error) {
      return res.send({ isSuccessed: false, message: 'Invalid Token' })
    }
  } catch (error) {
    return next(error)
  }
}
const checkPermission = async (req, res, next) => {
  const permissionLogic = new PermissionLogic()
  console.log(req.header('USER_ID'));
  console.log(req.header('ACTION_ID'));
  const result = await permissionLogic.isPermissionQualify(req.header('USER_ID'), req.header('ACTION_ID'))
  // const result = await permissionLogic.isPermissionQualify(2, 2)
  if (!result.isSuccessed)
    return res.json(result)
  next();
}
module.exports = {
  authenthicateUser, checkPermission
};