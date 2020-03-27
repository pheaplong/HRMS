const express = require('express');
const DomainProccessor = require('../DomainProccessor/PositionHistoryProccess');
const Domain =require('../Domain/PositionHistoryDomain')
const PositionHistoryRoute=express.Router();


const dp=new DomainProccessor();
//LOAD
PositionHistoryRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.send(JSON.stringify(data,null,2))
      
   })
})
//CREATE
PositionHistoryRoute.post('/add',(req,res)=>{
   const obj = new Domain();
   dp.insertData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//UPDATE
PositionHistoryRoute.put('/update',(req,res)=>{
   const obj = new Domain();
   dp.updateData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//DELETE
PositionHistoryRoute.delete('/delete',(req,res)=>{
   const obj = new Domain();
   dp.deleteData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
module.exports = PositionHistoryRoute;