const express = require('express');
const oracledb=require('oracledb')
const DomainProccessor = require('../DomainProccessor/StaffExperienceProccess');
const Domain = require('../Domain/DepartmentDomain')
const StaffExperienceRoute = express.Router();


const dp = new DomainProccessor();
//LOAD
StaffExperienceRoute.get('/', (req, res) => {
   dp.loadData().then((data) => {
      res.json(data);
   })
})
StaffExperienceRoute.get('/:id', (req, res) => {
   dp.loadDataByID(req.params.id).then((data) => {
      res.json(data);
   })
})
//CREATE
StaffExperienceRoute.post('/add', (req, res) => {
   //#region ASSIGNNING
   const {
      STF_EXP_ID,
      STF_ID,
      STF_POS,
      STF_ST_D,
      STF_LT_D,
      STF_REASON,
      STATUS_ID,
      USR_CREA,
      DT_CREA,
      USR_UPDT,
      DT_UPDT
   } = req.body
   const tmp = {
      // STF_EXP_ID,
      STF_ID,
      STF_POS,
      STF_ST_D:new Date(STF_ST_D),
      STF_LT_D:new Date(STF_LT_D),
      STF_REASON,
      STATUS_ID,
      USR_CREA,
      DT_CREA,
      USR_UPDT,
      DT_UPDT
   }
   tmp.out={ type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
   //#endregion
   dp.insertData(tmp).then((data) => {
      res.json(data);
      // res.send('hi')
   })
})
//UPDATE
StaffExperienceRoute.put('/update', (req, res) => {
   //#region ASSIGNNING
   const {
      STF_EXP_ID,
      STF_ID,
      STF_POS,
      STF_ST_D,
      STF_LT_D,
      STF_REASON,
      STATUS_ID,
      USR_CREA,
      DT_CREA,
      USR_UPDT,
      DT_UPDT
   } = req.body
   const tmp = {
      STF_EXP_ID,
      STF_ID,
      STF_POS,
      STF_ST_D:new Date(STF_ST_D),
      STF_LT_D:new Date(STF_LT_D),
      STF_REASON,
      STATUS_ID,
      USR_CREA,
      DT_CREA,
      USR_UPDT,
      DT_UPDT
   }
   //#endregion
   dp.updateData(tmp).then((data) => {
      res.json(data);
   })
})
//DELETE
StaffExperienceRoute.delete('/delete', (req, res) => {
   dp.deleteData(req.body.STF_EXP_ID).then((data) => {
      res.json(data);
   })
})
module.exports = StaffExperienceRoute;