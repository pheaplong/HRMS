const express = require('express');
const DomainProccessor = require('../DomainProccessor/StaffRelativeProccess');
const Domain =require('../Domain/StaffRelativeDomain')
const StaffRelativeRoute=express.Router();


const dp=new DomainProccessor();


//LOAD
StaffRelativeRoute.get('/',(req,res)=>{
   
   dp.loadData().then((data)=>{
      res.header("Content-Type",'application/json');
       res.send(JSON.stringify(data,null,2))
      
   })
})
StaffRelativeRoute.get('/staff/:id',(req,res)=>{
   
   dp.loadDataByStaffId(req.params.id).then((data)=>{
      console.log('relative by stf_id '+req.params.id);
      
      res.json(data)
      console.log('from relative');
      console.log(JSON.stringify(data,null,2));
   })
})
//CREATE
StaffRelativeRoute.post('/add',(req,res)=>{
   const {STF_ID,
      REL_FN,
      REL_LN,
      REL_GENDER,
      STATUS_ID,
      RELATION_ID}=req.body
      const tmp={
         STF_ID,
         REL_FN,
         REL_LN,
         REL_GENDER,
         STATUS_ID,
         RELATION_ID}
    
      
   dp.insertData(tmp).then((data)=>{
      res.json(data)
   })
})
//UPDATE
StaffRelativeRoute.put('/update',(req,res)=>{
   console.log(req.body);
   
   const {STF_ID,
      REL_FN,
      REL_LN,
      REL_GENDER,
      STATUS_ID,
      RELATION_ID,REL_ID}=req.body
      const tmp={
         STF_ID,
         REL_FN,
         REL_LN,
         REL_GENDER,
         STATUS_ID,
         RELATION_ID,
         REL_ID}
   console.log(tmp);
   
   dp.updateData(tmp).then((data)=>{
      res.json(data)
   })
})
//DELETE
StaffRelativeRoute.delete('/delete',(req,res)=>{
   dp.deleteData(req.body).then((data)=>{
      res.json(data)
   })
})
module.exports = StaffRelativeRoute;