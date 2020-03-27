class PositionHistoryDomain {
   constructor(pos_his_id,stf_id, pos_id, st_date, status_id, usr_crea, dt_crea, usr_updt, dt_updt) {
      this.pos_his_id=pos_his_id;
      this.stf_id = stf_id;
      this.pos_id = pos_id;
      this.st_date = st_date;
      this.status_id = status_id;
      this.usr_crea = usr_crea;
      this.dt_crea = dt_crea;
      this.usr_updt = usr_updt;
      this.dt_updt = dt_updt;
   }

 
}
module.exports =PositionHistoryDomain