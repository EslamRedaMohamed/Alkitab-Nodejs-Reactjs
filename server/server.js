const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoriesRoutes = require('./routes/categories');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/books', booksRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/goodreads')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});