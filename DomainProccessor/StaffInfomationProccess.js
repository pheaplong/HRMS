const Database = require('../database/Database');
const Domain = require('../Domain/StaffInfomationDomain');
const oracledb = require('oracledb')
const lib=require('../lib/GlobalLibrary')
class StaffInfomationProccess extends Database {

   async loadData() {
      const result = await this.load('select * from VW_STF_INFO  where PRESENT <>4',[],s=>{
         s.STF_DOB=new Date(s.STF_DOB)
      })
      return result;
   }
   async loadDataByID(ID) {
      const result = await this.load('select * from VW_STF_INFO where stf_id=:0',[ID],s=>{
         s.STF_DOB=new Date(s.STF_DOB)
      })
      return result;
   }
   


   async insertData(StaffInfomationDomain) {
      delete StaffInfomationDomain.STF_ID
      delete StaffInfomationDomain.image
      StaffInfomationDomain.STF_DOB = new Date(StaffInfomationDomain.STF_DOB)
      StaffInfomationDomain.out = {
         type: oracledb.NUMBER,
         dir: oracledb.BIND_OUT
      }
      // console.log('========'+JSON.stringify(StaffInfomationDomain,null,2));
      
      const sql = `insert into STF_INFO(
         Stf_fn,
         stf_ln,
         Stf_gender,
         stf_marital_st,
         Stf_dob,
         Stf_pob,
         status_id,
         present
      ) values(
         :STF_FN,
         :STF_LN,
         :STF_GENDER,
         :STF_MARITAL_ST,
         :STF_DOB,
         :STF_POB,
         :STATUS_ID,
         3)
         returning STF_ID into :out`;
      const result = await this.insert(sql, StaffInfomationDomain);
      return result;
   }

   async updateData(StaffInfomationDomain) {
      console.log(JSON.stringify(StaffInfomationDomain,null,2));  
      const result = await this.execute(`update STF_INFO set 
      STF_FN=:STF_FN,
      STF_LN=:STF_LN,
      STF_GENDER=:STF_GENDER,
      STF_MARITAL_ST=:STF_MARITAL_ST,
      STF_DOB=:STF_DOB,
      STF_POB=:STF_POB,
      STATUS_ID=:STATUS_ID
      WHERE STF_ID=:STF_ID
      `, StaffInfomationDomain);
      return result;
   }
   async deleteData(StaffInfomationDomain) {
      const { STF_ID } = StaffInfomationDomain;
      const result = await this.execute("update stf_info set present=4 where STF_ID =:STF_ID",
         { STF_ID });
      return result;
   }

}
module.exports = StaffInfomationProccess;

//
