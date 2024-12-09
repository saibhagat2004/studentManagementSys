const Fee = require('../models/fees.model');


// Create a single fee
const createFee = async (req, res) => {
  try {
    const { student, amount, dueDate } = req.body;

    if (!student || !amount || !dueDate) {
      return res.status(400).json({ error: "Student, amount, and due date are required" });
    }

    const newFee = new Fee({
      student,
      amount,
      dueDate,
    });

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

module.exports = {createFee, updateFeeStatus };
