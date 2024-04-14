const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    SlNo: {
        type: Number,
        unique: true
    },
    UniqueId: {
        type: String,
        sparse: true
    },
    Level: {
        type: String
    },
    Authors: {
        type: String
    },
    Article_Title: {
        type: String
    },
    WebLink: {
        type: String
    },
    Scopus: {
        type: String
    },
    Web_Of_Sc: {
        type: String
    },
    PUBMED: {
        type: String
    },
    IEEE: {
        type: String
    },
    Indian_Citation_Index: {
        type: String
    },
    Google_Scholar: {
        type: String
    },
    Year: {
        type: Number
    },
    Journal_Name: {
        type: String
    },
    Scopus_Citation: {
        type: Number
    },
    WOS_Citation: {
        type: Number
    },
    IEEE_Citation: {
        type: Number
    },
    ICI_Citation: {
        type: Number
    },
    GS_Citation: {
        type: Number
    },
    Affiliation: {
        type: String
    },
    Vol_No: {
        type: String
    },
    Issue_No: {
        type: String
    },
    B_Page: {
        type: Number
    },
    P_Page: {
        type: Number
    },
    SNIP: {
        type: Number
    },
    SJR: {
        type: Number
    },
    Impact_Factor: {
        type: Number
    },
    ISSN: {
        type: String
    },
    ISBN: {
        type: String
    },
    PublicationType: {
        type: String
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Journal', JournalSchema);