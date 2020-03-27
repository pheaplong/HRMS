const Database = require('../database/Database');
const Domain = require('../Domain/LeaveTypeDomain');
class LeaveTypeProccess extends Database {

   async loadData() {
      const result= await this.load( 'select * from leave_type',[],({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
      return result;
   //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }
   async insertData(LeaveTypeDomain) {
      const {leave_id,leave_desc}=LeaveTypeDomain;
      const result=await this.execute("insert into LEAVE_TYPE(leave_desc) values(:1)",
      [leave_desc]);
      return result;
   }

   async insertData(LeaveTypeDomain) {
      const {leave_desc}=LeaveTypeDomain;
      const result=await this.execute("insert into LEAVE_TYPE(leave_desc) values(:1)",
      [leave_desc]);
      return result;
   } 
   async updateData(LeaveTypeDomain) {
      const {leave_desc,leave_id}=LeaveTypeDomain;
      const result=await this.execute("update LEAVE_TYPE set leave_desc=:0 where leave_id =:1",
      [leave_desc,leave_id]);
      return result;
   } 
   async deleteData(LeaveTypeDomain) {
      const {leave_id}=LeaveTypeDomain;
      const result=await this.execute("delete from LEAVE_TYPE where leave_id =:0",
      [leave_id]);
      return result;
   } 
  
}
module.exports = LeaveTypeProccess;

//
