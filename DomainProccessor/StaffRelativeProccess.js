const Database = require('../database/Database');
const oracledb=require('oracledb')
const Domain = require('../Domain/StaffRelativeDomain');
class StaffRelativeProccess extends Database {

   async loadData( ) {
      const sql='select * from vw_stf_relative where status_id =1 '
      const result= await this.load(sql )
      return result;
   }
   async loadDataByStaffId(STF_ID ) {
      const sql='select * from vw_stf_relative where status_id =1 AND stf_id=:0 '
      const result= await this.load(sql,[STF_ID])
      return result;
   }
   async insertData(StaffRelativeDomain) {
     StaffRelativeDomain.out= { type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
         const sql=`insert into  stf_relative(
            STF_ID,
            REL_FN,
            REL_LN,
            REL_GENDER,
            STATUS_ID,
            RELATION_ID
            ) 
          values(
            :STF_ID,
            :REL_FN,
            :REL_LN,
            :REL_GENDER,
            :STATUS_ID,
            :RELATION_ID
          )
          returning rel_id into :out`

         //  usr_crea,
         //  date_crea,
         //  usr_updt,
         //  date_updt, 
         //  :usr_crea,
         //  :date_crea,
         //   :usr_updt,
         //   :date_updt,
      const result=await this.insert(sql,StaffRelativeDomain);
      return result;
   } 
   async updateData(StaffRelativeDomain) {
     console.log('============'+JSON.stringify(StaffRelativeDomain,null,2));
     
      const sql=`update STF_RELATIVE set
         STF_ID=:STF_ID,
         REL_FN=:REL_FN,
         REL_LN=:REL_LN,
         REL_GENDER=:REL_GENDER,
         STATUS_ID=:STATUS_ID,
         RELATION_ID=:RELATION_ID
         WHERE REL_ID=:REL_ID
      `
      
      const result=await this.execute(sql,StaffRelativeDomain);
      return result;
   } 
   async deleteData(StaffRelativeDomain) {
      
      const result=await this.execute("update stf_relative  set status_id=2 where REL_ID =:0",
      [StaffRelativeDomain.REL_ID]);
      return result;
   } 
  
}
module.exports = StaffRelativeProccess;

//
