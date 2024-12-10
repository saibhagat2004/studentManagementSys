const Fee = require('../models/fees.model');


// Create a single fee
const createFee = async (req, res) => {
  try {
    const { student, amount, paymentDate, status } = req.body;

    // Validate required fields
    if (!student || !amount || !paymentDate) {
      return res.status(400).json({ error: "Student, amount, and paymentDate are required." });
    }

    // Validate status if provided
    if (status && !['Paid', 'Pending'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Use 'Paid' or 'Pending'." });
    }

    // Create the Fee document
    const newFee = new Fee({
      student,
      amount,
      paymentDate,
      status: status || 'Pending', // Default to 'Pending' if not provided
    });

    // Save the Fee to the database
    const savedFee = await newFee.save();

    return res.status(201).json({
      message: "Fee created successfully",
      fee: savedFee,
    });
  } catch (error) {
    console.error("Error creating fee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Update fee payment status
const updateFeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Paid', 'Unpaid'].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Use 'Paid' or 'Unpaid'." });
    }

    const updatedFee = await Fee.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedFee) {
      return res.status(404).json({ error: "Fee not found" });
    }

    return res.status(200).json({
      message: "Fee status updated successfully",
      fee: updatedFee,
    });
  } catch (error) {
    console.error("Error updating fee status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get all fees
const getAllFees = async (req, res) => {
  try {
    // Fetch all fees and populate the student details
    const fees = await Fee.find().populate('student', 'name PID');

    if (!fees || fees.length === 0) {
      return res.status(404).json({ message: "No fees found" });
    }

    // Send the response
    return res.status(200).json(fees);
  } catch (error) {
    console.error("Error fetching fees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {createFee, updateFeeStatus,getAllFees };
