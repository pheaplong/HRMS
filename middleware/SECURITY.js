const jwt = require('jsonwebtoken')
const config = require('config')
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
module.exports.authenthicateUser = authenthicateUser;
// const checkPermission