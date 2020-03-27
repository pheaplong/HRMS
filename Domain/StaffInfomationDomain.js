class StaffInfomationDomain {
   constructor( Stf_id,Stf_fn,stf_ln, Stf_gender, stf_marital_st, Stf_dob, Stf_pob, status_id) {
      this.stf_id=Stf_id;
      this.stf_fn = Stf_fn;
      this.stf_ln=stf_ln;
      this.stf_gender = Stf_gender;
      this.stf_marital_st = stf_marital_st;
      this.stf_dob = Stf_dob;
      this.stf_pob = Stf_pob;
      this.status_id = status_id;
   } 
  
}
module.exports =StaffInfomationDomain