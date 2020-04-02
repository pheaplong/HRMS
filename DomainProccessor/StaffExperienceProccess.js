const Database = require('../database/Database');
const oracledb = require('oracledb')
const Domain = require('../Domain/DepartmentDomain');
const lib =require('../lib/GlobalLibrary')
class DepartmentProccess extends Database {

   async loadData() {
      const result = await this.load('select * from VW_STF_EXPERIENCE where STATUS_ID =1 ',[],s=>{
         s.STF_ST_D=lib.formatDate(s.STF_ST_D)
         s.STF_LT_D=lib.formatDate(s.STF_LT_D) 
      })
      return result;
   }
   async loadDataByID(stfID) {
      const result = await this.load('select * from VW_STF_EXPERIENCE where STATUS_ID =1 and stf_id=:0 ',[stfID],s=>{
         s.STF_ST_D=lib.formatDate(s.STF_ST_D)
         s.STF_LT_D=lib.formatDate(s.STF_LT_D) 
      })
      return result;
   }
   async insertData(StaffExperienceDomain) {

      let sql = `insert into STF_EXPERIENCE(
         STF_ID,
         STF_POS, 
         STF_ST_D,
         STF_LT_D, 
         STF_REASON,
         STATUS_ID, 
         USR_CREA,
         DT_CREA, 
         USR_UPDT,
         DT_UPDT
         ) values(
         :STF_ID,
         :STF_POS, 
         :STF_ST_D,
         :STF_LT_D, 
         :STF_REASON,
         :STATUS_ID, 
         :USR_CREA,
         :DT_CREA, 
         :USR_UPDT,
         :DT_UPDT
         ) 
         returning STF_EXP_ID into :out`
      const result = await this.insert(sql, StaffExperienceDomain);
      return result;
   }
   async updateData(StaffExperienceDomain) {
      const sql=`update STF_EXPERIENCE set 
      
      STF_ID=:STF_ID,
      STF_POS=:STF_POS,
      STF_ST_D=:STF_ST_D,
      STF_LT_D=:STF_LT_D,
      STF_REASON=:STF_REASON,
      STATUS_ID=:STATUS_ID,
      USR_CREA=:USR_CREA,
      DT_CREA=:DT_CREA,
      USR_UPDT=:USR_UPDT,
      DT_UPDT=:DT_UPDT
      where STF_EXP_ID=:STF_EXP_ID
      `
      const result = await this.execute(sql,StaffExperienceDomain);
      return result;
   }
   async deleteData(stfExpID) { 
      const result = await this.execute("update STF_EXPERIENCE set status_id =2 where STF_EXP_ID=:0",[stfExpID]);
      return result;
   }

}
module.exports = DepartmentProccess;