const Database = require('../database/Database');
const Domain = require('../Domain/PositionTypeDomain');

class StatusTypeProccess extends Database {
 
   async loadData() {

      const result= await this.load( 'select * from status_type')
      return result;
   //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }


async insertData(PositionTypeDomain) {
const {pos_desc}=PositionTypeDomain;
      const result=await this.execute("insert into position_type(pos_desc) values(:0)",
      [pos_desc]);
      return result;
   } 
   async updateData(PositionTypeDomain) {
      const {pos_id,pos_desc}=PositionTypeDomain;
      const result=await this.execute("update position_type set pos_desc=:0 where pos_id=:1",
      [pos_desc,pos_id]);
      return result;
   } 
   async deleteData(PositionTypeDomain) {
      const {pos_id}=PositionTypeDomain;
      const result=await this.execute("delete from position_type where pos_id =:0",
      [pos_id]);
      return result;
} 
  
}
module.exports = StatusTypeProccess;

//
