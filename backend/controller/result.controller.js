const Result = require('../models/result.model.js');

// Create a new result
const createResult = async (req, res) => {
  try {
    const { student,marks, course, grade } = req.body;

    if (!student || !course || !grade || !marks) {
      return res.status(400).json({ error: "Student, course, and grade are required" });
    }

    const newResult = new Result({
      student,
      course,
      marks,
      grade,
    });

    const savedResult = await newResult.save();

    return res.status(201).json({
      message: "Result created successfully",
      result: savedResult,
    });
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'name rollNo') // Populate student name and roll number
      .populate('course', 'name code'); // Populate course name and code

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a result (e.g., grade)

const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { student, course, marks, grade } = req.body;

    const updatedResult = await Result.findByIdAndUpdate(
      id,
      { student, course, marks, grade },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedResult) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.status(200).json(updatedResult);
  } catch (error) {
    console.error("Error updating result:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createResult, getAllResults, updateResult,deleteResult};
