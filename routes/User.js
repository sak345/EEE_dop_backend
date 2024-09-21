const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/User');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addUser);

module.exports = router;