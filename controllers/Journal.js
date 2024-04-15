const Journal = require('../models/Journal');

exports.getJournals = async (req, res, next) => {
    try {
        let query;
        // If user is an admin, return all journals
        if (req.user.role === 'admin') {
            query = Journal.find();
        } else {
            // If user is a member, only return their own journals
            query = Journal.find({ owner: req.user.name });
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
        const promises = req.body.map((journalData) => {
            return Journal.updateOne(
                { UniqueId: journalData.UniqueId }, // filter
                { $set: journalData }, // update
                { upsert: true } // options
            ).catch((err) => {
                if (err.name === 'MongoServerError' && err.code === 11000) {
                    console.log(`Journal with UniqueId ${journalData.UniqueId} already exists`);
                } else {
                    throw err;
                }
            });
        });

        await Promise.all(promises);

        res.status(201).json({
            success: true,
            message: 'Journals added/updated successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
        next(err)
    }
};

exports.deleteJournal = async (req, res, next) => {
    const { _id } = req.params;
    console.log(_id)
    try {
        const journal = await Journal.findById(_id);

        if (!journal) {
            return res.status(404).json({
                success: false,
                message: "No journal found"
            });
        }

        if (req.user.name !== journal.owner && req.user.role !== 'admin') {
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