const express = require('express');
const oracledb=require('oracledb')
const DomainProccessor = require('../DomainProccessor/StaffAgreementProccess');
const StaffAgreementRoute=express.Router();


const dp=new DomainProccessor();
//LOAD
StaffAgreementRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.json(data,null,2)
      console.log(data);
      
   })
})
StaffAgreementRoute.get('/:id',(req,res)=>{
  
   
   dp.loadDataByID(req.params.id).then((data)=>{
      res.json(data)
      console.log('=====stf_ag_if==========');
      console.log(data);
      console.log('=====stf_ag_if==========');
   })
})
//CREATE
StaffAgreementRoute.post('/add',(req,res)=>{
   delete req.body.AG_ID
   req.body.AG_DATE = new Date(req.body.AG_DATE);
   req.body.AG_EXPR = new Date(req.body.AG_EXPR);
   req.body.out={type:oracledb.NUMBER, dir:oracledb.BIND_OUT}
   dp.insertData(req.body).then((data)=>{
      res.json(data)
   })
})
//UPDATE
StaffAgreementRoute.put('/update',(req,res)=>{
   const obj = new Domain();
   dp.updateData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//DELETE
StaffAgreementRoute.delete('/delete',(req,res)=>{
   const obj = new Domain();
   dp.deleteData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
module.exports = StaffAgreementRoute;