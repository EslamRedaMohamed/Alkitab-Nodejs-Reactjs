const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
require("../../db.js"); // Adjusted path for database connection

// Import your routes with adjusted paths
const userRouters = require("../../routes/userRouts.js");
const searchRoutes = require("../../routes/searchRoutes.js");
const categoriesRoutes = require("../../routes/categories.js");
const authorsRoutes = require("../../routes/authors.js");
const booksRoutes = require("../../routes/books.js");
const usersRoutes = require("../../routes/usersRouts.js");

const app = express();

// Middlewares
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming request bodies as JSON
app.use(bodyParser.urlencoded({ extended: true })); // Handle URL-encoded data
app.use("/uploads", express.static("uploads")); // Serve static files from 'uploads' directory

// Routes
app.use("/users", userRouters);
app.use("/categories", categoriesRoutes);
app.use("/authors", authorsRoutes);
app.use("/books", booksRoutes);
app.use("/search", searchRoutes); // Register the search route
app.use("/user", usersRoutes); // Get books, categories, and authors for users

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Serverless!');
});

// Export the handler for Netlify
module.exports.handler = serverless(app);
