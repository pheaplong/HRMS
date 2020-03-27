--STATUS
CREATE TABLE status_type (
  st_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  st_desc varchar2(20) NOT NULL,
  PRIMARY KEY (st_id)
);
--DEPARTMENT
CREATE TABLE department (
  dep_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  dep_desc varchar2(20) NOT NULL,
  PRIMARY KEY (dep_id),
);
--POSITION_TYPE
CREATE TABLE position_type (
  pos_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  pos_desc varchar2(20) NOT NULL, 
  PRIMARY KEY (pos_id)
);
--LEAVE_TYPE
CREATE TABLE leave_type (
  leave_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  leave_desc varchar2(20) NOT NULL,
  PRIMARY KEY (leave_id)
);
--STAFF
--STAFF_INFO
CREATE TABLE stf_info (
  Stf_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  Stf_fn varchar2(20) NOT NULL,
  Stf_gender varchar2(20) NOT NULL,
  stf_marital_st varchar2(20) NOT NULL,
  Stf_dob date NOT NULL,
  Stf_pob varchar2(20) NOT NULL,
  status_id number NOT NULL FOREIGN KEY REFERENCES status_type(st_id),
  PRIMARY KEY (Stf_id)
);


--STAFF_EXP
CREATE TABLE stf_experience (
  stf_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  stf_pos varchar2(20) NOT NULL,
  stf_st_d varchar2(20) NOT NULL,
  stf_lt_d varchar2(20) NOT NULL,
  stf_reason varchar2(20) NOT NULL,
  status_id number NOT NULL,
  usr_crea number not null,
  dt_crea date not null, 
  usr_updt number not null,
  dt_updt date,
  FOREIGN KEY(stf_id) REFERENCES stf_info(stf_id),
  FOREIGN KEY (status_id) REFERENCES status_type(st_id),
  FOREIGN KEY (usr_crea) REFERENCES stf_info(stf_id),
  FOREIGN KEY (usr_updt) REFERENCES stf_info(stf_id)
);
--STAFF_EXP
CREATE TABLE stf_relative (
  rel_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  Stf_id number NOT NULL ,
  rel_fn varchar2(20) NOT NULL,
  rel_ln varchar2(20) NOT NULL,
  rel_gender varchar2(20) NOT NULL,
  relation number()
  status_id number NOT NULL,
  usr_crea number not null ,
  dt_crea date not null,
  usr_updt number not null ,
  dt_updt date,
  PRIMARY KEY (rel_id),
  FOREIGN KEY(stf_id) REFERENCES stf_info(stf_id),
  FOREIGN KEY (status_id) REFERENCES status_type(st_id),
  FOREIGN KEY (usr_crea) REFERENCES stf_info(stf_id),
  FOREIGN KEY (usr_updt) REFERENCES stf_info(stf_id)
);

--STAFF_AGREEMENT
CREATE TABLE stf_agreement (
  ag_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
  stf_id number NOT NULL ,
  agree_id number NOT NULL ,
  sal number NOT NULL,
  ag_date date NOT NULL,
  ag_expr date NOT NULL,
  status_id number NOT NULL ,
  usr_crea number not null,
  dt_crea date not null,
  usr_updt number not null ,
  dt_updt date,
  PRIMARY KEY (ag_id),
  FOREIGN KEY(stf_id) REFERENCES stf_info(stf_id),
  FOREIGN KEY (agree_id) REFERENCES status_type(st_id),
  FOREIGN KEY (status_id) REFERENCES status_type(st_id),
  FOREIGN KEY (usr_crea) REFERENCES stf_info(stf_id),
  FOREIGN KEY (usr_updt) REFERENCES stf_info(stf_id)
);


--POSITION_HISTORY;
CREATE TABLE postion_his (
  stf_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
  pos_id number NOT NULL ,
  st_date DATE NOT NULL,
  status_id number NOT NULL ,
  usr_crea number not null,
  dt_crea date not null,
  usr_updt number not null ,
  dt_updt date,
  FOREIGN KEY(stf_id) REFERENCES stf_info(stf_id),
  FOREIGN KEY (pos_id) REFERENCES position_type(pos_id),
  FOREIGN KEY (status_id) REFERENCES status_type(st_id),
  FOREIGN KEY (usr_crea) REFERENCES stf_info(stf_id),
  FOREIGN KEY (usr_updt) REFERENCES stf_info(stf_id)
);

--TAKE_LEAVE
CREATE TABLE leave_his (
  tl_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
  stf_id number NOT NULL ,
  leave_id number NOT NULL ,
  leave_duration number NOT NULL ,
  reas   on varchar2(20) NOT NULL ,
  status_id number NOT NULL ,
  usr_crea number not null,
  dt_crea date not null,
  usr_updt number not null ,
  dt_updt date,
  PRIMARY KEY (tl_id),
  FOREIGN KEY(stf_id) REFERENCES stf_info(stf_id),
  FOREIGN KEY (leave_id) REFERENCES leave_type(leave_id),
  FOREIGN KEY (status_id) REFERENCES status_type(st_id),
  FOREIGN KEY (usr_crea) REFERENCES stf_info(stf_id),
  FOREIGN KEY (usr_updt) REFERENCES stf_info(stf_id)
);