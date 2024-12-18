var express = require('express');
var router = express.Router();
const { createDepartment,getAllDepartments,updateDepartment,deleteDepartment } = require("../controller/department.controller.js"); // Adjust path as needed



// GET all To-Dos
router.get("/", getAllDepartments);

// POST a new To-Do
router.post('/',createDepartment);

// PUT a To-Do
router.put('/:id', updateDepartment);

router.delete('/', deleteDepartment);

module.exports = router;
