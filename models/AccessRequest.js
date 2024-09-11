// models/AccessRequest.js
const mongoose = require('mongoose');

const accessRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    date: { type: Date, default: Date.now },
});

// Post-save hook to delete the document if the status is 'approved'
accessRequestSchema.post('save', async function (doc, next) {
    if (doc.status === 'approved') {
        try {
            await doc.remove();
            console.log(`Access request for ${doc.email} approved and deleted.`);
        } catch (error) {
            console.error('Error deleting approved access request:', error);
        }
    }
    next();
});

module.exports = mongoose.model('AccessRequest', accessRequestSchema);