const Database = require('../database/Database');
const Domain = require('../Domain/LeaveHistoryDomain');
class LeaveHistoryProccess extends Database {

   async loadData() {
      const result = await this.load('select * from leave_his', [],
         ({ TL_ID,
            STF_ID,
            LEAVE_ID,
            LEAVE_DURATION,
            REASON,
            STATUS_ID,
            USR_CREA,
            DT_CREA,
            USR_UPDT,
            DT_UPDT }) => new Domain(
               TL_ID,
               STF_ID,
               LEAVE_ID,
               LEAVE_DURATION,
               REASON,
               STATUS_ID,
               USR_CREA,
               DT_CREA,
               USR_UPDT,
               DT_UPDT
            )
      )
      return result;
      //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }
   async insertData(LeaveHistoryDomain) {
      const {
         stf_id,
         leave_id,
         leave_duration,
         reason,
         status_id,
         usr_crea,
         dt_crea,
         usr_updt,
         dt_updt
      } = LeaveHistoryDomain;
      const result = await this.insert(`insert into leave_his(
               STF_ID,
               LEAVEID,
               LEAVE_DURATION,
               REASON,
               STATUS_ID,
               USR_CREA,
               DT_CREA,
               USR_UPDT,
               DT_UPDT
      ) values(:0,:1,:2,:3,:4,:5,:6,:7,:8)`,
         [stf_id,
            leave_id,
            leave_duration,
            reason,
            status_id,
            usr_crea,
            dt_crea,
            usr_updt,
            dt_updt]);
      return result;
   }
   async updateData(LeaveHistoryDomain) {
      const { dep_desc } = LeaveHistoryDomain;
      const result = await this.execute(`update leave_his set
      
      STF_ID=:1,
      LEAVE_ID=:2,
      LEAVE_DURATION=:3,
      REASON=:4,
      STATUS_ID=:5,
      USR_CREA=:6,
      DT_CREA=:7,
      USR_UPDT=:8,
      DT_UPDT=:9
      where TL_ID=:10
      ` ,
         [ stf_id,
            leave_id,
            leave_duration,
            reason,
            status_id,
            usr_crea,
            dt_crea,
            usr_updt,
            dt_updt,
            tl_id]);
      return result;
   }
   async deleteData(LeaveHistoryDomain) {
      const { tl_id } = LeaveHistoryDomain;
      const result = await this.execute("delete from leave_his where tl_id =:0",
         [tl_id]);
      return result;
   }

}
module.exports = LeaveHistoryProccess;