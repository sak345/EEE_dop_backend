const express = require('express');
const router = express.Router();
const guestLectureController = require('../controllers/guestLecture');

// Create a new guest lecture
router.post('/', guestLectureController.createGuestLecture);

// Get all guest lectures
router.get('/', guestLectureController.getAllGuestLectures);

// Get a single guest lecture by ID
router.get('/:id', guestLectureController.getGuestLectureById);

// Update a guest lecture by ID
router.put('/:id', guestLectureController.updateGuestLectureById);

// Delete a guest lecture by ID
router.delete('/:id', guestLectureController.deleteGuestLectureById);

module.exports = router;