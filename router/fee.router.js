const express = require('express');
const router = express.Router();
const { createFee, updateFeeStatus,getAllFees } = require('../controller/fees.controller');

router.get('/',getAllFees);

// POST: Create a single fee
router.post('/', createFee);

// PUT: Update fee payment status
router.put('/:id', updateFeeStatus);

module.exports = router;
