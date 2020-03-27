const express = require('express');
const DomainProccessor = require('../DomainProccessor/DepartmentProccess');
const Domain =require('../Domain/DepartmentDomain')
const DepartmentRoute=express.Router();


const dp=new DomainProccessor();
//LOAD
DepartmentRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.json(data);
   })
})
DepartmentRoute.get('/:id',(req,res)=>{
   dp.loadDataByID(req.params.id).then((data)=>{
      res.json(data);
   })
})
//CREATE
DepartmentRoute.post('/add',(req,res)=>{
   dp.insertData(req.body).then((data)=>{
      res.json(data);
   })
})
//UPDATE
DepartmentRoute.put('/update',(req,res)=>{
   dp.updateData(req.body).then((data)=>{
      res.json(data);
   })
})
//DELETE
DepartmentRoute.delete('/delete',(req,res)=>{
   dp.updateData(req.body).then((data)=>{
      res.json(data);
   })
})
module.exports = DepartmentRoute;