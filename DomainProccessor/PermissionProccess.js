const Database = require('../database/Database');
const oracledb=require('oracledb')
class PermissionProccess extends Database {

   async loadDataByID(USER_ID,ACT_ID) {
      const result= await this.load( 'select * from permission  where user_id =:0 and act_id=:1',[USER_ID,ACT_ID])
      return result;
   }
   async insertData(PERMISSION_LIST) {
      
      let sql=`insert into permission(USER_ID,ACTION_ID,STATUS_ID) values(:USER_ID,:ACTION_ID,:STATUS_ID) `
      const result=await this.insertMany(sql,PERMISSION_LIST);
      return result;
   } 

}
module.exports = PermissionProccess;