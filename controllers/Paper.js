const Paper = require("../models/Paper");

exports.create = async (req, res, next) => {
    const user = req.user;
    const {title,coPI, agency_type, PI, submission_date, end_date, status_p, amount, funding_agency, project_stage} = req.body;
    let owner = user._id
    try{
        const paper = await Paper.create({
            title, owner, coPI, agency_type, PI, submission_date, end_date, status_p, amount, funding_agency, project_stage
        })
        // paper.stringtodate();
        res.status(201).json({
            success: true,
            paper
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        })
    }
}

exports.deletePaper = async (req, res, next) => {
    const user = req.user;
    const {_id } = req.body;
    try{
        const message = await Paper.deleteOne({ _id: _id, owner: user._id })
        if (message.acknowledged && message.deletedCount == 1) {
            res.status(200).json({
            success: true,
            message: "paper delete"
        })
        } else {
            res.status(401).json({
            success: false,
            message: "You are not authorized to delete this paper or paper does not exists"
        })
        }
        
    } catch (err) {
        res.status(404).json({
            success: false,
            err: err
        })
    }
    
}

exports.getone = async (req, res, next) => {
    const user = req.user;
    const {_id } = req.body;

    try {
        const paper = await Paper.findOne({_id: _id, owner: user._id})
        if (!paper) {
            res.status(401).json({
                success: false,
                message: "You are not authorized or paper does not exists"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Paper found",
                paper
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            err: error
        })
    }
}

exports.getall = async (req, res, next) => {
    const user = req.user;

    try {
        const papers = await Paper.find({owner: user._id})
        if (!papers.length) {
            res.status(404).json({
                success: false,
                message: "No paper found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Papers found",
                papers
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            err: error
        })
    }
}

exports.updatepaper = async (req, res, next) => {
    const user = req.user;
    const {_id, ...other } = req.body;

    try {
        const paper = await Paper.findOneAndUpdate({_id: _id, owner: user._id}, other,  {new: true})
        if (!paper) {
            res.status(404).json({
                success: false,
                message: "You are not authorized or No paper found"
            })
        }
        res.status(200).json({
                success: true,
                message: "Paper found",
                paper
            })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Internal server error",
            err: error
        })
    }
}