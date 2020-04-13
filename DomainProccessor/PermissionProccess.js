const Database = require('../database/Database');
const oracledb = require('oracledb')
class PermissionProccess extends Database {

   async loadDataByID(USER_ID, ACTION_ID) {
      const result = await this.load(`select * from 
      (select * from "PERMISSION" where USER_ID=:0 and action_id =:1 ORDER BY INDEX_NO desc)
       where    ROWNUM =1`
         , [USER_ID, ACTION_ID])
      return result;
   }
   async insertData(PERMISSION_LIST) {

      let sql = `insert into permission(USER_ID,ACTION_ID,STATUS_ID) values(:USER_ID,:ACTION_ID,:STATUS_ID) `
      const result = await this.insertMany(sql, PERMISSION_LIST);
      return result;
   }

}
module.exports = PermissionProccess;