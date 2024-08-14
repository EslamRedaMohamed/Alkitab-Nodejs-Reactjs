const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); // Ensure you have a mongoURI key in your config file

const connectDB = async() => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;