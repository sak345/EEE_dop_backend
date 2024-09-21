var { Parser } = require('json2csv');

const Paper = require("../models/Paper");
const User = require("../models/User");

exports.getall = async (req, res, next) => {

    try {
        const papers = await Paper.find()
        if (!papers.length) {
            res.status(404).json({
                success: false,
                message: "No paper Found"
            })
        } else {
            res.status(200).json({
                success: true,
                papers
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
}

exports.getone = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const paper = await Paper.findOne({ _id: _id })
        if (!paper) {
            res.status(404).json({
                success: false,
                message: "No paper Found"
            })
        } else {
            res.status(200).json({
                success: true,
                paper
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
}

exports.create = async (req, res, next) => {
    const { name, email, role } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            role
        })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "You are not authorized"
            })
        } else {
            res.status(201).json({
                success: true,
                user
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
}

exports.updateuser = async (req, res, next) => {
    const { _id, ...other } = req.body;
    if (req.user._id == _id && other.email) {
        res.status(404).json({
            success: false,
            message: "Invalid request"
        })
    } else if (req.user._id == _id && other.role && other.role == "member") {
        res.status(404).json({
            success: false,
            message: "Invalid request"
        })

    } else {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: _id }, other, { new: true }
            )
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "user not found"
                })
            } else {
                res.status(200).json({
                    success: true,
                    user
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                err: error
            })
        }
    }
}

exports.getalluser = async (req, res, next) => {
    try {
        const users = await User.find()
        if (!users.length) {
            res.status(404).json({
                success: false,
                message: "No paper found"
            })
        } else {
            res.status(200).json({
                success: true,
                users
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
}

exports.getoneuser = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const user = await User.findOne({ _id: _id })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "No user Found"
            })
        } else {
            res.status(200).json({
                success: true,
                user
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            err: error
        })
    }
}

exports.deleteuser = async (req, res, next) => {
    const { _id } = req.body;
    if (_id != req.user._id) {
        try {
            const message = await User.findByIdAndDelete(_id)
            if (message.acknowledged && message.deletedCount == 1) {
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully"
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                err: error
            })
        }
    } else {
        res.status(404).json({
            success: false,
            message: "Invalid request"
        })
    }

}

const helper = (obj, key) => {
    if (obj[key]) {
        return obj[key]
    }
    else {
        return ""
    }
}

const dateHelper = (obj, key) => {
    if (obj[key]) {
        const date = new Date(obj[key]);
        const yyyy = date.getFullYear();
        let mm = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
        let dd = String(date.getDate()).padStart(2, '0'); // Ensure two digits
        return `${yyyy}/${mm}/${dd}`;
    } else {
        return "";
    }
}

exports.downloadPapers = async (req, res, next) => {
    if (!req.body["start_date"] || !req.body["end_date"] || !req.body["status"]) {
        return res.status(422).json({
            success: false,
            message: "No start_date or end_date or status found"
        })
    }
    const start = new Date(req.body["start_date"]);
    const end = new Date(req.body["end_date"]);

    try {
        let papers = [];
        const status = req.body["status"];

        const query = {
            'submission_date': {
                '$gte': start,
                '$lt': end
            }
        };

        if (status !== "all") {
            query['status_p'] = status;
        }

        papers = await Paper.find(query);

        if (!papers.length) {
            return res.json({
                success: false,
                message: "No paper Found"
            });
        }

        const results = papers.map(paper => ({
            "title": helper(paper, "title"),
            "funding_agency": helper(paper, "funding_agency"),
            "agency_type": helper(paper, "agency_type"),
            "PI": helper(paper, "PI"),
            "coPI": helper(paper, "coPI"),
            "amount": helper(paper, "amount"),
            "submission_date": dateHelper(paper, "submission_date"),
            "end_date": dateHelper(paper, "end_date"),
            "status_p": helper(paper, "status_p"),
            "start_date": dateHelper(paper, "start_date"),
            "completed_date": dateHelper(paper, "completed_date")
        }));

        const fields = [
            "title",
            "funding_agency",
            "agency_type",
            "PI",
            "coPI",
            "amount",
            "submission_date",
            "end_date",
            "status_p",
            "start_date",
            "completed_date"
        ];

        const csvParser = new Parser({ fields });
        const csvData = csvParser.parse(results);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=papers.csv");
        return res.status(200).end(csvData);
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error.message
        });
    }

}
