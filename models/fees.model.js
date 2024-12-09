
const mongoose = require('mongoose'); 


const feeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student',required: true},
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    status: { type: String, enum: ['Paid', 'Pending'], required: true }
  });
  
module.exports = mongoose.model('Fee', feeSchema);
  