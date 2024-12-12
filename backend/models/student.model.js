const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
          type: String, 
          required: true 
        },
  PID: { 
          type: String, 
          unique: true, 
          required: true, 
          validate: {
            validator: function (value) {
              // Ensure PID starts with 'EU'
              return /^EU/.test(value);
            },
            message: (props) => `${props.value} is not a valid PID. PID must start with 'EU'.`
          }
        },
  department: { 
                type: mongoose.Schema.Types.ObjectId,
                 ref: 'Department' 
                },
  // courses: [{ 
  //               type: mongoose.Schema.Types.ObjectId,
  //               ref: 'Subject' 
  //             }],
  fees: [{ 
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Fee' }],
  results: [{ type: mongoose.Schema.Types.ObjectId,
               ref: 'Result' }],
  assignedTeacher: { type: mongoose.Schema.Types.ObjectId, 
                     ref: 'Teacher' 
                  }
});

module.exports = mongoose.model('Student', studentSchema);
