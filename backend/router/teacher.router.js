var express = require('express');
var router = express.Router();
const { getAllTeachers,createTeacher,updateTeacher,deleteTeacher } = require("../controller/teacher.controller.js"); // Adjust path as needed


// GET all To-Dos
router.get("/", getAllTeachers);

// POST a new To-Do
router.post('/',createTeacher);

// PUT a To-Do
router.put('/:id', updateTeacher);

router.get('/:id', deleteTeacher);

module.exports = router;
