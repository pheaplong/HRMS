const Database = require('../database/Database');
const oracledb = require('oracledb')
class PermissionProccess extends Database {
  async loadData() {
    const result = await this.load(`select * from 
         (select * from "PERMISSION" where USER_ID=:0 and action_id =:1 ORDER BY INDEX_NO desc)
         where    ROWNUM =1` )
    return result;
  }
  async loadDataByID(USER_ID, ACTION_ID) {
    const result = await this.load(`select * from 
         (select * from "PERMISSION" where USER_ID=:0 and action_id =:1 ORDER BY INDEX_NO desc)
         where    ROWNUM =1` , [USER_ID, ACTION_ID])
    return result;
  }
  async loadAllDataByID(USER_ID) {
    const result = await this.load(`
      select a.ACT_ID "id",a.ACTION_NAME "text" ,a.MOD_ID AS "parent", CASE WHEN b.ACT_ID IS NULL then null else 'true' end as "selected"  from (
      select * from vw_user_permission b
      where user_id=:USER_ID) b
      RIGHT JOIN ACTION a on a.ACT_ID = b.ACT_ID
    `, [USER_ID])
    return result;
  }
  async loadModule() {
    const result = await this.load('select * from module')
    return result;
  }
  async loadAction() {
    const result = await this.load('select * from action')
    return result;
  }
  async insertDataMany(PERMISSION_LIST) {
    let sql = `insert into permission(USER_ID,ACTION_ID,STATUS_ID) values(:USER_ID,:ACTION_ID,:STATUS_ID) `
    const result = await this.insertMany(sql, PERMISSION_LIST);
    return result;
  }

}
module.exports = PermissionProccess;