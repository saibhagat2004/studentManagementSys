const express = require('express');
const router = express.Router();
const { createResult, getAllResults, updateResult ,deleteResult} = require('../controller/result.controller');

// POST: Create a result
router.post('/', createResult);

// GET: Get all results
router.get('/', getAllResults);

// PUT: Update a result
router.put('/:id', updateResult);

// DELETE: Delete a result
router.delete('/:id', deleteResult);


module.exports = router;
