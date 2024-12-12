
const mongoose = require('mongoose'); //allow to simplay mongodb query and connection 

const resultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student',required: true},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' ,required: true},
    marks: { type: Number, required: true },
    grade: { type: String }
  });
  
  module.exports = mongoose.model('Result', resultSchema);
  