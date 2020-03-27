const lib=require('../lib/GlobalLibrary')
const oracledb = require('oracledb')
const Database = require('../database/Database');
class StaffAgreementProccess extends Database {

   async loadData() {
      const result = await this.load('select * from VW_STF_AGREEMENT',[],(d)=>{
         d.AG_DATE=lib.formatDate(d.AG_DATE)
         d.AG_EXPR=lib.formatDate(d.AG_EXPR)
         //lib.formatDate(d.AG_DATE)
      })      
      return result;
   }


   async insertData(STF_AGREEMENT) { 
     
      const sql = `insert into  STF_AGREEMENT(STF_ID,AGREE_ID,POS_ID,SAL,AG_DATE,AG_EXPR,STATUS_ID,USR_CREA,DT_CREA,USR_UPDT,DT_UPDT)
      values(
         :STF_ID,:AGREE_ID,:POS_ID,:SAL,:AG_DATE,:AG_EXPR,:STATUS_ID,:USR_CREA,:DT_CREA,:USR_UPDT,:DT_UPDT
      )
      returning AG_ID into :out`
      const result = await this.insert(sql,STF_AGREEMENT);
      console.log(JSON.stringify(result,null,2));
      
      return result;
   }
   async updateData(PositionTypeDomain) {
      const { pos_id, pos_desc } = PositionTypeDomain;
      const result = await this.execute("update position_type set pos_desc=:0 where pos_id=:1",
         [pos_desc, pos_id]);
      return result;
   }
   async deleteData(PositionTypeDomain) {
      const { pos_id } = PositionTypeDomain;
      const result = await this.execute("delete from position_type where pos_id =:0",
         [pos_id]);
      return result;
   }

}
module.exports = StaffAgreementProccess;

//
