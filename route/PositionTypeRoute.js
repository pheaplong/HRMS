const express = require('express');
const DomainProccessor = require('../DomainProccessor/PositionTypeProccess');
const Domain =require('../Domain/PositionTypeDomain')
const PositionTypeRoute=express.Router();


const dp=new DomainProccessor();
//LOAD
PositionTypeRoute.get('/',(req,res)=>{
   dp.loadData().then((data)=>{
      res.json(data)
      
   })
})
//CREATE
PositionTypeRoute.post('/add',(req,res)=>{
   dp.insertData(req.body).then((data)=>{
      res.json(data)
   })
})
//UPDATE
PositionTypeRoute.put('/update',(req,res)=>{
   
   dp.updateData(req.body).then((data)=>{
      res.json(data)
   })
})
//DELETE
PositionTypeRoute.delete('/delete',(req,res)=>{
   
   
   dp.deleteData(req.body).then((data)=>{
      res.json(data)
   })
})
module.exports = PositionTypeRoute;