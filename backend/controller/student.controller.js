const Student = require('../models/student.model');
const Fee = require('../models/fees.model');
const Result = require('../models/result.model');
const Subject = require('../models/subject.model');
const Teacher = require('../models/teacher.model');
const Department = require('../models/department.model');
const mongoose = require('mongoose'); // Import mongoose

// Create a new student
// const createStudent = async (req, res) => {
//   try {
//     const { name, PID,  department } = req.body;

//     // Validate required fields
//     if (!name || !PID ) {
//       return res.status(400).json({ error: "Name and PID are required" });
//     }

//     // Create a new student
//     const newStudent = new Student({
//       name,
//       PID,
//       department: department || null, // Set department if provided, otherwise null
//     });

//     const savedStudent = await newStudent.save();

//     return res.status(201).json({
//       message: "Student created successfully",
//       student: savedStudent,
//     });
//   } catch (error) {
//     console.error("Error creating student:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


const createStudent = async (req, res) => {
  try {
    const { name, department } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Generate a unique PID
    const generateUniquePID = async () => {
      let pid;
      let isUnique = false;

      while (!isUnique) {
        pid = `EU${Math.floor(1000 + Math.random() * 9000)}`; // Generate a 4-digit random number
        const existingStudent = await Student.findOne({ PID: pid });
        if (!existingStudent) {
          isUnique = true;
        }
      }

      return pid;
    };

    const PID = await generateUniquePID();

    // Create a new student
    const newStudent = new Student({
      name,
      PID,
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
// const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find()
//       .populate('department', 'name') // Populate department name
//       .populate({
//         path: 'department',
//         populate: { path: 'head', select: 'name email' }, // Populate department head
//       })
//       .populate({
//         path: 'results',
//         populate: { 
//           path: 'course', 
//           select: 'name code' // Populate course name and code
//         }
//       })
//       .populate('fees', 'amount paymentDate status') // Populate fees details
//       .populate('assignedTeacher', 'name email'); // Populate assigned teacher details


//     return res.status(200).json(students);
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


const getAllStudents = async (req, res) => {
  try {
    // Fetch all students with basic details
    const students = await Student.find()
      .populate('department', 'name')
      .populate('assignedTeacher', 'name email');

    if (!students || students.length === 0) {
      return res.status(404).json({ error: "No students found" });
    }

    // Iterate over each student and fetch their related data
    const studentData = await Promise.all(    //execute multiple asynchronous operations
      students.map(async (student) => {
        // Fetch results and fees for the current student
        const results = await Result.find({ student: student._id })
          .populate('course', 'name code')
          .select('marks grade course');
        const fees = await Fee.find({ student: student._id }).select('amount paymentDate status');

        // Return student data with embedded results and fees
        return {
          //The plain object created by toObject() ensures no unnecessary Mongoose metadata is included in the response.
          ...student.toObject(),  //is used to copy all key-value pairs from the object returned by student.toObject() into the new object.
          results,
          fees,
        };
      })
    );

    return res.status(200).json(studentData);
  } catch (error) {
    console.error("Error fetching student data:", error);
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



// Update student data controller
const updateStudent = async (req, res) => {
  const { id } = req.params; // Extracting student ID from the request parameters
  const updateData = req.body; // Extracting data to be updated from the request body

  try {
    // Find the student by ID and update the fields
    const updatedStudent = await Student.findByIdAndUpdate(
      id, // ID of the student to update
      updateData, // Data to update
      { new: true, runValidators: true } // Options: return the updated document and validate the input
    );

    // If no student is found with the given ID
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Send the updated student data as a response
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'An error occurred while updating the student data' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from URL parameter

    // Check if the ID is valid (mongoose ObjectId validation)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid student ID.' });
    }

    // Find and delete the student by ID
    const student = await Student.findByIdAndDelete(id);

    // If no student is found, return a 404 error
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Respond with success message
    return res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createStudent, getAllStudents, getStudentDetails ,deleteStudent,updateStudent};
