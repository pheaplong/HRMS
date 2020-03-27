class StaffRelativeDomain {
   constructor(rel_id, stf_id, rel_fn, rel_ln, rel_gender,relation, status_id, usr_crea, dt_crea, usr_updt, dt_updt) {
      this.rel_id = rel_id;
      this.stf_id = stf_id;
      this.rel_fn = rel_fn;
      this.rel_ln = rel_ln;
      this.rel_gender = rel_gender;
      this.relation=relation;
      this.status_id = status_id;
      this.usr_crea = usr_crea;
      this.dt_crea = dt_crea;
      this.usr_updt = usr_updt;
      this.dt_updt = dt_updt;
   }
 
}
module.exports =StaffRelativeDomain