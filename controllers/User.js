const User = require('../models/User');
exports.addUser = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create a new user
        user = new User({ name, email, role });

        // Save the user to the database
        await user.save();

        res.json({ success: true, message: 'User added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}