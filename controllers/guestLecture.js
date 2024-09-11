const GuestLecture = require('../models/GuestLecture');

// Create a new guest lecture
exports.createGuestLecture = async (req, res) => {
    try {
        const guestLecture = new GuestLecture(req.body);
        await guestLecture.save();
        res.status(201).json(guestLecture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all guest lectures
exports.getAllGuestLectures = async (req, res) => {
    try {
        const guestLectures = await GuestLecture.find();
        res.status(200).json(guestLectures);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single guest lecture by ID
exports.getGuestLectureById = async (req, res) => {
    try {
        const guestLecture = await GuestLecture.findById(req.params.id);
        if (!guestLecture) {
            return res.status(404).json({ error: 'Guest lecture not found' });
        }
        res.status(200).json(guestLecture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a guest lecture by ID
exports.updateGuestLectureById = async (req, res) => {
    try {
        const guestLecture = await GuestLecture.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!guestLecture) {
            return res.status(404).json({ error: 'Guest lecture not found' });
        }
        res.status(200).json(guestLecture);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a guest lecture by ID
exports.deleteGuestLectureById = async (req, res) => {
    try {
        const guestLecture = await GuestLecture.findByIdAndDelete(req.params.id);
        if (!guestLecture) {
            return res.status(404).json({ error: 'Guest lecture not found' });
        }
        res.status(200).json({ message: 'Guest lecture deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};