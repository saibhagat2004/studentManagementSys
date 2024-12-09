const express = require('express');
const router = express.Router();
const { createResult, getAllResults, updateResult } = require('../controller/result.controller');

// POST: Create a result
router.post('/', createResult);

// GET: Get all results
router.get('/', getAllResults);

// PUT: Update a result
router.put('/:id', updateResult);

module.exports = router;
