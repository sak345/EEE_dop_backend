const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
    facultyName: {
        type: String,
    },
    award: {
        type: String,
    },
    awardingAgency: {
        type: String,
    },
    date: {
        type: String,
    },
    document: {
        type: String,
    },
    sheetName: {
        type: String
    }
});

module.exports = mongoose.model('Award', AwardSchema);