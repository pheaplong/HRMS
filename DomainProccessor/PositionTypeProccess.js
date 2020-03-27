const Database = require('../database/Database');
const Domain = require('../Domain/PositionTypeDomain');
const oracledb =require( 'oracledb')
class PositionTypeProccess extends Database {

   async loadData() {
      const result= await this.load( 'select * from VW_POSTION_TYPE where status_id=1')
      return result;
   //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }


   async insertData(PositionTypeDomain) {
      delete PositionTypeDomain.POS_ID
      PositionTypeDomain.out={type:oracledb.NUMBER,dir:oracledb.BIND_OUT}
      const result=await this.insert(`insert into position_type(pos_desc,dep_id,status_id) 
      values(:POS_DESC,:DEP_ID,1)
      returning pos_id into :out`,PositionTypeDomain)
      return result;
   } 
   async updateData(PositionTypeDomain) {
      const {pos_id,pos_desc,dep_id}=PositionTypeDomain;
      const result=await this.execute("update  position_type set pos_desc=:0, dep_id=:1,status_id=1 where pos_id=:2",
      [pos_desc,dep_id,pos_id]);
      return result;
   } 
   async deleteData(PositionTypeDomain) {
      const {POS_ID}=PositionTypeDomain;
      const result=await this.execute("update  position_type set status_id=2 where pos_id =:0",
      [POS_ID]);
      return result;
   } 
  
}
module.exports = PositionTypeProccess;

//
