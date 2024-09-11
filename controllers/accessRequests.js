// controllers/accessRequestController.js
const AccessRequest = require('../models/AccessRequest');

// Create a new access request
const createAccessRequest = async (req, res) => {
    const { name, email } = req.body;

    try {
        const existingRequest = await AccessRequest.findOne({ email });
        if (existingRequest && existingRequest.status === 'rejected') {
            return res.status(400).json({ message: 'Access request denied by admin' });
        }
        else if (existingRequest) {
            return res.status(400).json({ message: 'Access request already exists, please wait for admin approval' });
        }

        const accessRequest = new AccessRequest({ name, email });
        await accessRequest.save();
        res.status(201).json({ success: true, message: 'Access request created' });
    } catch (error) {
        console.error('Error creating access request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all access requests
const getAccessRequests = async (req, res) => {
    try {
        const accessRequests = await AccessRequest.find();
        const pendingCount = await AccessRequest.countDocuments({ status: 'pending' });
        res.status(200).json({ accessRequests, pendingCount });
    } catch (error) {
        console.error('Error fetching access requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve or reject an access request
const updateAccessRequest = async (req, res) => {
    const { id, status, role } = req.body;

    try {
        const accessRequest = await AccessRequest.findById(id);
        if (!accessRequest) {
            return res.status(404).json({ message: 'Access request not found' });
        }

        accessRequest.status = status;
        await accessRequest.save();

        if (status === 'approved') {
            // Send a request to the addUser route to create a new user
            const myHeaders = {
                "Authorization": req.headers.authorization, // Use the token from the request headers
                "Content-Type": "application/json"
            };

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    name: accessRequest.name, // Assuming name is available in accessRequest
                    email: accessRequest.email,
                    role: role || 'member', // Default role if not provided
                }),
                redirect: "follow",
            };

            // Ensure BACKEND_URL is defined
            const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api/'; // Fallback URL


            // Send the request to the addUser route
            const response = await fetch(`${backendUrl}users`, requestOptions);


            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);;
            }

            const data = await response.json();
        }

        res.status(200).json({ message: `Access request ${status}` });
    } catch (error) {
        console.error('Error updating access request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an access request by ID
const deleteAccessRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const accessRequest = await AccessRequest.findByIdAndDelete(id);

        if (!accessRequest) {
            return res.status(404).json({ message: 'Access request not found' });
        }

        res.status(200).json({ message: 'Access request deleted' });
    } catch (error) {
        console.error('Error deleting access request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { createAccessRequest, getAccessRequests, updateAccessRequest, deleteAccessRequest };