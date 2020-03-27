const express = require('express');
const DomainProccessor = require('../DomainProccessor/LeaveTypeProccess');
const Domain =require('../Domain/LeaveTypeDomain')
const LeaveTypeRoute=express.Router();


const dp=new DomainProccessor();
//LOAD
LeaveTypeRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.send(JSON.stringify(data,null,2))
      
   })
})
//CREATE
LeaveTypeRoute.post('/add',(req,res)=>{
   const obj = new Domain();
   dp.insertData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//UPDATE
LeaveTypeRoute.put('/update',(req,res)=>{
   const obj = new Domain();
   dp.updateData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
//DELETE
LeaveTypeRoute.delete('/delete',(req,res)=>{
   const obj = new Domain();
   dp.deleteData(obj).then((data)=>{
      res.send(JSON.stringify(data,null,2))
   })
})
module.exports = LeaveTypeRoute;