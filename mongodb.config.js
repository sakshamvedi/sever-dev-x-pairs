const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri + "saathiauthdb");

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);

    }
}
module.exports = connectToMongoDB;
