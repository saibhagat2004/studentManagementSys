var express = require('express');
var router = express.Router();
const { getAllTeachers,createTeacher,updateTeacher } = require("../controller/teacher.controller.js"); // Adjust path as needed


// GET all To-Dos
router.get("/", getAllTeachers);

// POST a new To-Do
router.post('/',createTeacher);

// PUT a To-Do
router.put('/:id', updateTeacher);

module.exports = router;
