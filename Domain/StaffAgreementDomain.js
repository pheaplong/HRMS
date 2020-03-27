class StaffAgreementDomain {
   constructor(ag_id, stf_id, agree_id, sal, ag_date, ag_expr, status_id, usr_crea, dt_crea, usr_updt, dt_updt) {
      this.ag_id = ag_id;
      this.stf_id = stf_id;
      this.agree_id = agree_id;
      this.sal = sal;
      this.ag_date = ag_date;
      this.ag_expr = ag_expr;
      this.status_id = status_id;
      this.usr_crea = usr_crea;
      this.dt_crea = dt_crea;
      this.usr_updt = usr_updt;
      this.dt_updt = dt_updt;
   }
  
}
module.exports =StaffAgreementDomain
