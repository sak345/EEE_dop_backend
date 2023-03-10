const User = require('../models/User')

exports.login = async(req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email})
        if (!user) {
            res.status(401).json({
                success: false,
                message: "You are not authorized"
            })
        } else {
            // console.log("Authorization done by client")
            sendToken(user, 201, res)
        }
    } catch (err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const sendToken = (user, statuscode, res) => {
    const token = user.getSignedToken();
    res.status(statuscode).json({success: true, token})
}