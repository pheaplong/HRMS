const Database = require('../database/Database');
const Domain = require('../Domain/PositionHistoryDomain');
class PositionHistoryProccess extends Database {

   async loadData() {
      const result = await this.load('select * from position_his', [],
         ({POS_HIS_ID,
            STF_ID,
            POS_ID,
            ST_DATE,
            STATUS_ID,
            USR_CREA,
            DT_CREA,
            USR_UPDT,
            DT_UPDT
         }) => new Domain(POS_HIS_ID,STF_ID,
            POS_ID,
            ST_DATE,
            STATUS_ID,
            USR_CREA,
            DT_CREA,
            USR_UPDT,
            DT_UPDT)
      )
      return result;
      //   return await this.execute('select * from leave_type WHERE LEAVE_ID=8',({LEAVE_ID,LEAVE_DESC})=>new  Domain(LEAVE_ID,LEAVE_DESC))
   }
   async insertData(PositionHistoryDomain) {
      const {
         stf_id,
         pos_id,
         st_date,
         status_id,
         usr_crea,
         dt_crea,
         usr_updt,
         dt_updt
      } = PositionHistoryDomain;
      const result = await this.execute(`insert into position_his(
         STF_ID=:,
         POS_ID=:,
         ST_DATE=:,
         STATUS_ID=:,
         USR_CREA=:,
         DT_CREA=:,
         USR_UPDT=:,
         DT_UPDT=:
      ) values(:1,:2,:3,:4,:5,:6,:7,:8)`,
         [stf_id,
            pos_id,
            st_date,
            status_id,
            usr_crea,
            dt_crea,
            usr_updt,
            dt_updt]);
      return result;
   }
   async updateData(PositionHistoryDomain) {
      const {
         pos_his_id,
         stf_id,
         pos_id,
         st_date,
         status_id,
         usr_crea,
         dt_crea,
         usr_updt,
         dt_updt } = PositionHistoryDomain;
      const result = await this.execute(`update position_his set
      STF_ID=:0,
      POS_ID=:1,
      ST_DATE=:2,
      STATUS_ID=:3,
      USR_CREA=:4,
      DT_CREA=:5,
      USR_UPDT=:6,
      DT_UPDT=:7
     where pos_his_id =8 `,
         [
            stf_id,
            pos_id,
            st_date,
            status_id,
            usr_crea,
            dt_crea,
            usr_updt,
            dt_updt,pos_his_id]);
      return result;
   }
   async deleteData(PositionHistoryDomain) {
      const { pos_his_id } = PositionHistoryDomain;
      const result = await this.execute("delete from position_his where pos_his_id =:0",
         [pos_his_id]);
      return result;
   }

}
module.exports = PositionHistoryProccess;