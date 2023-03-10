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
    const {_id} = req.body;
    try {
        const paper = await Paper.findOne({_id: _id})
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
    const {name, email, role} = req.body;

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
    const {_id, ...other} = req.body;
    if (req.user._id == _id && other.email ) {
        res.status(404).json({
            success: false,
            message: "Invalid request"
        })
    } else if (req.user._id == _id && other.role && other.role == "member") {
        res.status(404).json({
            success: false,
            message: "Invalid request"
        })

    }else {
        try {
            const user = await User.findByIdAndUpdate(
                {_id: _id}, other, {new: true}
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
    const {_id} = req.body;
    try {
        const user = await User.findOne({_id: _id})
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
    const {_id} = req.body;
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
            success:false,
            message: "Invalid request"
        })
    }
    
}