const express = require('express');
const router = express.Router();
const {
  getAllSubjects,createSubject,
} = require('../controller/subject.controller');

// POST: Create a new student
router.post('/', createSubject);

// GET: Get all students
router.get('/', getAllSubjects);



// // GET: Get a particular student with all related data
// router.get('/:id', getStudentDetails);

module.exports = router;
