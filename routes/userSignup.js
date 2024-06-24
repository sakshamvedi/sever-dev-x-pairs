// Import required modules and create Express app
const express = require('express');
const app = express();
const { userModel } = require('../models/user.model'); // Assuming userModel is defined in a separate file

// Define route handler for POST /signup
const userSignup = async (req, res) => {
    const { email, displayName, photoURL, uid } = req.body;
    console.log(displayName);
    const user = new userModel({
        email,
        displayName,
        photoURL,
        uid,
    });

    console.log(user);


    const checkIsExists = await userModel.findOne({ uid: uid });

    if (checkIsExists) {
        return res.status(400).send("User already exists");
    }

    // Save the new user to the database
    await user.save()
        .then(savedUser => {
            // Log the saved user object
            console.log(savedUser.toObject()); // or savedUser.toJSON()
            return res.status(200).send('User saved successfully');
        })
        .catch(error => {
            console.error('Error saving user:', error);
            return res.status(500).send('Error saving user');
        });
};

// Export the route handler
module.exports = userSignup;
