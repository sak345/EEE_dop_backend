exports.getPrivateData = (req, res, next) => {
    const user = req.user;
    console.log(user);
    res.status(200).json({
       sucess: true,
       data: "You got access to the data",
       user
    })
}