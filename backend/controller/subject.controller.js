const Subject = require('../models/subject.model');
const Department = require('../models/department.model');
const Teacher = require('../models/teacher.model');


const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate('department', 'name') // Populate department name
      .populate('teacher', 'name employeeId'); // Populate teacher name and employee ID
      
    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const { name, code, department, teacher } = req.body;

    // Validate required fields
    if (!name || !code) {
      return res.status(400).json({ error: "Subject name and code are required" });
    }

    // Optional: Validate if department exists
    if (department) {
      const deptExists = await Department.findById(department);
      if (!deptExists) {
        return res.status(404).json({ error: "Department not found" });
      }
    }

    // Optional: Validate if teacher exists
    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);
      if (!teacherExists) {
        return res.status(404).json({ error: "Teacher not found" });
      }
    }

    // Create new subject
    const newSubject = new Subject({
      name,
      code,
      department: department || null, // Set department if provided, otherwise null
      teacher: teacher || null, // Set teacher if provided, otherwise null
    });

    // Save subject to database
    const savedSubject = await newSubject.save();

    return res.status(201).json({
      message: "Subject created successfully",
      subject: savedSubject,
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a subject by ID
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params; // Get the subject ID from the route parameters
    const { name, code, teacher, credits } = req.body; // Extract updated fields from the request body

    // Find the subject by ID and update it
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { name, code, teacher, credits },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject updated successfully', subject: updatedSubject });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ message: 'Failed to update subject', error: error.message });
  }
};


// Delete a subject by ID
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params; // Get the subject ID from the route parameters

    // Find and delete the subject by ID
    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully', subject: deletedSubject });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ message: 'Failed to delete subject', error: error.message });
  }
};




module.exports = { getAllSubjects,createSubject ,updateSubject ,deleteSubject};


