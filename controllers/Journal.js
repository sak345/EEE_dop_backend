const Journal = require('../models/Journal');

exports.getJournals = async (req, res, next) => {
    try {
        const journals = await Journal.find();
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
        next(err)
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
        next(err)
    }
};


exports.addJournal = async (req, res, next) => {
    try {
        // Validate that req.body is an array
        if (!Array.isArray(req.body)) {
            return res.status(400).json({
                success: false,
                error: 'Request body must be an array'
            });
        }

        const promises = req.body.map(async (journalData) => {
            try {
                return await Journal.updateOne(
                    { UniqueId: journalData.UniqueId }, // filter
                    { $set: journalData }, // update
                    { upsert: true } // options
                );
            } catch (err) {
                if (err.name === 'MongoServerError' && err.code === 11000) {
                    console.log(err)
                } else {
                    throw err;
                }
            }
        });

        await Promise.all(promises);

        res.status(201).json({
            success: true,
            message: 'Journals added/updated successfully'
        });
    } catch (err) {
        console.error('Error adding/updating journals:', err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
        next(err)
    }
};

exports.deleteJournal = async (req, res, next) => {
    const { _id } = req.params;
    try {
        const journal = await Journal.findById(_id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: "No journal found"
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to delete this journal"
            });
        }

        await Journal.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            message: "Journal deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "There was some problem deleting"
        });
    }
};