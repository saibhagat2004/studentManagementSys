const Teacher = require('../models/teacher.model.js');

// Controller to create a new teacher
const createTeacher = async (req, res) => {
  try {
    const { name, employeeId, department } = req.body;

    // Validate required fields
    if (!name || !employeeId) {
      return res.status(400).json({ error: "Name and Employee ID are required" });
    }

    // Create a new teacher object
    const newTeacher = new Teacher({
      name,
      employeeId,
      department: department || null, // Set department to null if not provided
    });

    // Save the teacher to the database
    const savedTeacher = await newTeacher.save();

    return res.status(201).json({
      message: "Teacher created successfully",
      teacher: savedTeacher,
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const updateTeacher = async (req, res) => {
    try {
      const { id } = req.params; // Teacher ID from URL params
      const { name, employeeId, department } = req.body;
  
      // Find and update the teacher
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        id,
        {
          ...(name && { name }),
          ...(employeeId && { employeeId }),
          ...(department && { department }),
        },
        { new: true, runValidators: true } // Return updated document and run schema validations
      );
  
      if (!updatedTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
  
      return res.status(200).json({
        message: "Teacher updated successfully",
        teacher: updatedTeacher,
      });
    } catch (error) {
      console.error("Error updating teacher:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  
  const getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find()
        .populate('department', 'name'); // Populate department name if referenced
  
      return res.status(200).json(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  
  module.exports = {
    createTeacher,
    updateTeacher,
    getAllTeachers,
};

