const express = require('express');
const router = express.Router();
const { createFee, updateFeeStatus } = require('../controller/fees.controller');

// POST: Create fees for multiple students
// router.post('/create-all', createAllFees);

// POST: Create a single fee
router.post('/', createFee);

// PUT: Update fee payment status
router.put('/:id', updateFeeStatus);

module.exports = router;
