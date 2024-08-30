const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        const uri = process.env.DB_URI; // Use environment variable for connection string
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

main();
