const mongoose = require('mongoose');

const PaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide the title"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a owner"]
    },
    funding_agency: {
        type: String,
    },
    agency_type: {
        type: String,
        required: [true, "Please provide valid agency_type"],
        enum: ["Government", "Private", "International"]
    },
    PI: {
        type: String,
        required: [true, "Please provide valid PI"]
    },
    coPI: {
        type: String
    },
    amount: {
        type: Number
    },
    submission_date: {
        type: Date, 
        required: [true, "Please provide a date of submission"]
    },
    end_date: {
        type: Date, 
        required: [true, "Please provide a end date"]
    },
    status_p: {
        type: String,
        required: [true, "Please provide a status"],
    },
    start_date: {
        type: Date
    },
    completed_date: {
        type: Date
    }

})

PaperSchema.methods.stringtodate = function() {
    const sub = this.submission_date
    this.submission_date = new ISODate(sub)
    const end = this.end_date
    this.submission_date = new ISODate(end)
}


const Paper = mongoose.model("Paper", PaperSchema);

module.exports = Paper;