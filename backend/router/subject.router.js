const express = require('express');
const router = express.Router();
const {
  getAllSubjects,createSubject, updateSubject,deleteSubject
} = require('../controller/subject.controller');

// POST: Create a new student
router.post('/', createSubject);

// GET: Get all students
router.get('/', getAllSubjects);

router.put('/:id', updateSubject);

router.delete('/:id',deleteSubject );


// // GET: Get a particular student with all related data
// router.get('/:id', getStudentDetails);

module.exports = router;
