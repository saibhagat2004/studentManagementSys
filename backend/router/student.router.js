const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentDetails,
  deleteStudent,
  updateStudent
} = require('../controller/student.controller');

// POST: Create a new student
router.post('/', createStudent);

// GET: Get all students
router.get('/', getAllStudents);

// GET: Get a particular student with all related data
router.get('/:id', getStudentDetails);

router.delete('/:id', deleteStudent);

router.put('/:id',updateStudent) ;
module.exports = router;
