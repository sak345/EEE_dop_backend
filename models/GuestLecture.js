const mongoose = require('mongoose');

const guestLectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    speaker: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    contactInformation: {
        type: String,
    },
    registrationLink: {
        type: String,
    },
    duration: {
        type: String,
    },
    attachments: {
        type: [String], // Array of strings to store file paths or URLs
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const GuestLecture = mongoose.model('GuestLecture', guestLectureSchema);

module.exports = GuestLecture;