
const { request } = require('express');
const mongoose = require('mongoose'); //allow to simplay mongodb query and connection 


const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
  });
  
  module.exports = mongoose.model('Department', departmentSchema);
  