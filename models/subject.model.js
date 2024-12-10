const mongoose = require('mongoose'); //allow to simplay mongodb query and connection 

const subjectSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    code: { 
      type: String, 
      unique: true, 
      required: true 
    },
    department: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Department' 
      },
    teacher: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Teacher' 
    }
  });

  
  module.exports = mongoose.model('Subject', subjectSchema);
  