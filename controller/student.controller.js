const Student = require('../models/student.model');
const Fee = require('../models/fees.model');
const Result = require('../models/result.model');
const Subject = require('../models/subject.model');
const Teacher = require('../models/teacher.model');
const Department = require('../models/department.model');


// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, PID, email, department } = req.body;

    // Validate required fields
    if (!name || !PID || !email) {
      return res.status(400).json({ error: "Name, PID, and email are required" });
    }

    // Create a new student
    const newStudent = new Student({
      name,
      PID,
      email,
      department: department || null, // Set department if provided, otherwise null
    });

    const savedStudent = await newStudent.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('department', 'name') // Populate department name
      .populate({
        path: 'department',
        populate: { path: 'head', select: 'name email' }, // Populate department head
      });

    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the student and populate related fields
    const student = await Student.findById(id)
      .populate('department', 'name') // Populate department name
      .populate({
        path: 'department',
        populate: { path: 'head', select: 'name email' }, // Populate department head
      })
      .populate({
        path: 'results',
        populate: { 
          path: 'course', 
          select: 'name code' // Populate course name and code
        }
      })
      .populate('fees', 'amount paymentDate status') // Populate fees details
      .populate('assignedTeacher', 'name email'); // Populate assigned teacher details

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Fetch additional related data
    const subjects = await Subject.find({ department: student.department._id });
    const teachers = await Teacher.find({ department: student.department._id }).select('name email');

    // Respond with all data
    return res.status(200).json({
      student,
      teachers, // All teachers as an array
      subjects, // All subjects under the department
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = { createStudent, getAllStudents, getStudentDetails };
