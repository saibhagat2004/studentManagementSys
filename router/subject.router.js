const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentDetails,
} = require('../controller/student.controller');

// POST: Create a new student
router.post('/', createStudent);

// GET: Get all students
router.get('/', getAllStudents);

// GET: Get a particular student with all related data
router.get('/:id', getStudentDetails);

module.exports = router;
