const express = require('express');
const router = express.Router();
const { addJournal, getJournals, getJournal, deleteJournal } = require('../controllers/Journal');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addJournal);
router.route('/').get(protect, getJournals);
router.route('/:id').get(getJournal);
router.route('/:id').delete(deleteJournal);

module.exports = router;