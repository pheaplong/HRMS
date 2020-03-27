class LeaveHistoryDomain {
   constructor(tl_id, stf_id, leave_id, leave_duration, reason, status_id, usr_crea, dt_crea, usr_updt, dt_updt) {
      this.tl_id = tl_id;
      this.stf_id = stf_id;
      this.leave_id = leave_id;
      this.leave_duration = leave_duration;
      this.reason = reason;
      this.status_id = status_id;
      this.usr_crea = usr_crea;
      this.dt_crea = dt_crea;
      this.usr_updt = usr_updt;
      this.dt_updt = dt_updt;
   }
   
}
module.exports =LeaveHistoryDomain
