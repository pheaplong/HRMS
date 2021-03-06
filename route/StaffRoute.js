const express = require('express');
const DomainProccessor = require('../DomainProccessor/StaffInfomationProccess');
const StaffRoute = express.Router();
const fs = require('fs')


const dp = new DomainProccessor();


//LOAD
StaffRoute.get('/', async (req, res) => {

  // dp.loadData().then((data) => {
  //   res.send(JSON.stringify(data, null, 2))

  // })
  const result = await dp.loadData()
  res.json(result)
})
StaffRoute.get('/:id', (req, res) => {
  dp.loadDataByID(req.params.id).then((data) => {
    res.send(JSON.stringify(data, null, 2))
  })
})
//CREATE
StaffRoute.post('/add', (req, res) => {
  dp.insertData(req.body).then((data) => {
    res.send(JSON.stringify(data, null, 2))

  })
})
//UPDATE
StaffRoute.put('/update', (req, res) => {
  const { STF_FN,
    STF_LN, STF_GENDER,
    STF_MARITAL_ST,
    STF_DOB,
    STF_POB,
    STATUS_ID,
    STF_ID } = req.body
  const tmp = {
    STF_FN,
    STF_LN, STF_GENDER,
    STF_MARITAL_ST,
    STF_DOB: new Date(STF_DOB),
    STF_POB,
    STATUS_ID,
    STF_ID
  }
  dp.updateData(tmp).then((data) => {
    res.send(JSON.stringify(data, null, 2))
  })
})
//DELETE
StaffRoute.delete('/delete', (req, res) => {
  dp.deleteData(req.body).then((data) => {
    res.send(JSON.stringify(data, null, 2))
  })
})
StaffRoute.get('/salary', (req, res) => {
  dp.loadSalary().then((data) => {
    res.send(JSON.stringify(data, null, 2))
  })
})
module.exports = StaffRoute;