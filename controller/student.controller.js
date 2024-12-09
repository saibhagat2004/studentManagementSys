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

// Get a particular student with detailed data
const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate('department', 'name') // Populate department name
      .populate({
        path: 'department',
        populate: { path: 'head', select: 'name email' }, // Populate department head
      });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Fetch additional related data
    const results = await Result.find({ student: id }).populate('course', 'name code');
    const fees = await Fee.find({ student: id });
    const subjects = await Subject.find({ department: student.department._id });
    const teacher = await Teacher.findOne({ department: student.department._id });

    return res.status(200).json({
      student,
      teacher: teacher ? { name: teacher.name, email: teacher.email } : null,
      subjects,
      results,
      fees,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createStudent, getAllStudents, getStudentDetails };
