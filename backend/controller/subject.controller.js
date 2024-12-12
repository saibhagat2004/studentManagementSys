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




module.exports = { getAllSubjects,createSubject  };


