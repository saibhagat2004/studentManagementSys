
const mongoose = require('mongoose'); //allow to simplay mongodb query and connection 

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employeeId: { type: String, unique: true, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
  });
  
  module.exports = mongoose.model('Teacher', teacherSchema);
  