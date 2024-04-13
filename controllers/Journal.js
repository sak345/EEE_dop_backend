const Journal = require('../models/Journal');

exports.getJournals = async (req, res, next) => {
    console.log("trying to get journals")
    try {
        let query;
        // If user is an admin, return all journals
        if (req.user.role === 'admin') {
            query = Journal.find();
        } else {
            // If user is a member, only return their own journals
            query = Journal.find({ owner: req.user._id });
        }

        const journals = await query;

        res.status(200).json({
            success: true,
            count: journals.length,
            journals
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: err
        });
    }
};

exports.getJournal = async (req, res, next) => {
    try {
        let journal;

        // If user is an admin, return the journal with the given id
        if (req.user.role === 'admin') {
            journal = await Journal.findById(req.params.id);
        } else {
            // If user is a member, only return the journal if they are the owner
            journal = await Journal.findOne({ _id: req.params.id, owner: req.user._id });
        }

        if (!journal) {
            return res.status(404).json({
                success: false,
                error: 'No journal found'
            });
        }

        res.status(200).json({
            success: true,
            journals: journal
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};


exports.addJournal = async (req, res, next) => {
    try {
        const journal = await Journal.create({ ...req.body, owner: req.user._id });

        res.status(201).json({
            success: true,
            journal
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

exports.deleteJournal = async (req, res, next) => {
    const { _id } = req.params;

    try {
        const journal = await Journal.findByIdAndDelete(_id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: "No journal found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Journal deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            err: error
        });
    }
};