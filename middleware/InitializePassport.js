const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const config = require('config')
module.exports = (passport) => {
   const authenthicateUser = async (token,next) => {
      try {
        if(!token)
            return res.send({isSuccess:false,message:'Cannot Access'})
          try {
            const verified=await jwt.verify(token,config.get('jwtSecret'))
            req.user=verified
         } catch (error) {
           return res.send({isSuccess:false,message:'Invalid Token'}) 
         }
      } catch (error) {
         return next(error)
      }
   }
   passport.use(new LocalStrategy({ usernameField: 'USER_ID' }, authenthicateUser)
   passport.serializeUser()
}