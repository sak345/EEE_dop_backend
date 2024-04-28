const express = require('express');
const router = express.Router();
const { getAwards, createAward, deleteAward } = require('../controllers/awards');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAwards).post(protect, createAward);
router.route('/:_id').delete(protect, deleteAward);

module.exports = router;