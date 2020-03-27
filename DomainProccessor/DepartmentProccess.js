const Database = require('../database/Database');
const oracledb=require('oracledb')
const Domain = require('../Domain/DepartmentDomain');
class DepartmentProccess extends Database {

   async loadData() {
      const result= await this.load( 'select * from department',[]
      ,({DEP_ID,DEP_NAME,DEP_DESC})=>new  Domain(DEP_ID,DEP_NAME,DEP_DESC))
      return result;
   //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }
   async loadDataByID(dep_id) {
      const result= await this.load( 'select * from department where dep_ID =:0',[dep_id]
      ,({DEP_ID,DEP_NAME,DEP_DESC})=>new  Domain(DEP_ID,DEP_NAME,DEP_DESC))
      return result;
   //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }
   async insertData(DepartmentDomain) {
      DepartmentDomain.out={ type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
      console.log(JSON.stringify(DepartmentDomain,null,2));
      
      let sql=`insert into department(dep_name,dep_desc) values(:DEP_NAME,:DEP_DESC) 
               returning DEP_ID into :out`
    
      const result=await this.insert(sql,DepartmentDomain);
     
      
      return result;
   } 
   async updateData(DepartmentDomain) {
      const {dep_id,dep_name,dep_desc}=DepartmentDomain;
      const result=await this.execute("update department set dep_name=:0, dep_desc=:1 where dep_id =:2",
      [dep_name,dep_desc,dep_id]);
     
      
      return result;
   } 
   async deleteData(DepartmentDomain) {
      const {dep_id}=DepartmentDomain;
      const result=await this.execute("delete from department where dep_id =:0",
      [dep_id]);
      return result;
   } 
  
}
module.exports = DepartmentProccess;