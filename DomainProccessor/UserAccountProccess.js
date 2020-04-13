const Database = require('../database/Database');
const oracledb = require('oracledb')
const Domain = require('../Domain/DepartmentDomain');
class UserAccountProccess extends Database {
   async Login(USER) {
      const sql = 'select * from vw_user_account where user_id=:USER_ID --AND PASSWORD=:PASSWORD'
      const result = await this.load(sql, USER);
      result.isLogin = result.result.length > 0 ? true : false
      return result;
   }
   async findUser(USER) {
      const sql = 'select * from vw_user_account where user_id=:0 '
      const result = await this.load(sql, [USER]);
      result.isExist = result.result.length > 0 ? true : false
      return result;
   }
   async Register(USER) {
      const sql = 'insert into user_account (USER_ID,PASSWORD,STATUS_ID) values(:USER_ID,:PASSWORD,:STATUS_ID)'
      const result = await this.insert(sql, USER);
      return result;
   }
   async ChangePassword(USER) {
      const sql = 'update user_account set PASSWORD=:PASSWORD WHERE USER_ID =:USER_ID'
      const result = await this.execute(sql, USER);
      return result;
   }
   async UpdateUser(USER) {
      const sql = 'update user_account set STATUS_ID=:STATUS_ID WHERE USER_ID =:USER_ID'
      const result = await this.execute(sq, USER);
      return result;
   }



}
module.exports = UserAccountProccess 
