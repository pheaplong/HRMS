const express = require('express');
const DomainProccessor = require('../DomainProccessor/LeaveHistoryProccess');
const Domain =require('../Domain/LeaveHistoryDomain')
const LeaveHistoryRoute=express.Router();


const dp=new DomainProccessor();
//LOAD
LeaveHistoryRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.send(JSON.stringify(data,null,2))
      
   })
})
//CREATE
LeaveHistoryRoute.post('/add',(req,res)=>{
   const obj = new Domain();
   dp.insertData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//UPDATE
LeaveHistoryRoute.put('/update',(req,res)=>{
   const obj = new Domain();
   dp.updateData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//DELETE
LeaveHistoryRoute.delete('/delete',(req,res)=>{
   const obj = new Domain();
   dp.deleteData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
module.exports = LeaveHistoryRoute;