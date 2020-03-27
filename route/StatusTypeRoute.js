const express = require('express');
const DomainProccessor = require('../DomainProccessor/StatusTypeProccess');
const Domain =require('../Domain/StatusTypeDomain')
const StatusTypeRoute=express.Router();

const dp=new DomainProccessor()

//LOAD
StatusTypeRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.json(data)
      
   })
})
//CREATE
StatusTypeRoute.post('/add',(req,res)=>{
   const obj = new Domain();
   dp.insertData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//UPDATE
StatusTypeRoute.put('/add',(req,res)=>{
   const obj = new Domain();
   dp.updateData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//DELETE
StatusTypeRoute.delete('/add',(req,res)=>{
   const obj = new Domain();
   dp.deleteData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
module.exports = StatusTypeRoute;