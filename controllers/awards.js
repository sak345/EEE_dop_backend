const Award = require('../models/Awards');

exports.getAwards = async (req, res, next) => {
    try {
        const awards = await Award.find();
        res.status(200).json({ success: true, awards, count: awards.length });
    } catch (err) {
        res.status(400).json({ success: false, error: err });
        next(err);
    }
};

exports.createAward = async (req, res, next) => {
    try {
        const existingAward = await Award.findOne(req.body);

        if (existingAward) {
            return res.status(400).json({ success: false, message: 'Award already exists' });
        }

        const award = await Award.create(req.body);
        res.status(201).json({ success: true, data: award });
    } catch (err) {
        res.status(400).json({ success: false });
        next(err);
    }
};

exports.deleteAward = async (req, res, next) => {
    const { _id } = req.params;
    try {
        const award = await Award.findById(_id);

        if (!award) {
            return res.status(404).json({
                success: false,
                message: "No award found"
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to delete this award"
            });
        }

        await Award.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            message: "Award deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "There was some problem deleting"
        });
    }
}