const express = require('express');
const app = express();
const { userModel } = require('../models/user.model');

const tokenLogin = async (req, res) => {
    const { token } = req.body;
    const user = await userModel.findOne({ uid: token });
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).send('User not found');
    }
}

module.exports = tokenLogin;