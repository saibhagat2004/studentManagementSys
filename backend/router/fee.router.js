const express = require('express');
const router = express.Router();
const { createFee, updateFeeStatus,getAllFees,deleteFee } = require('../controller/fees.controller');

router.get('/',getAllFees);

// POST: Create a single fee
router.post('/', createFee);

// PUT: Update fee payment status
router.put('/:id', updateFeeStatus);


router.delete('/:id', deleteFee);

module.exports = router;
