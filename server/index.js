require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
require("./db.js");
const userRouters = require("./routes/userRouts.js");
const searchRoutes = require("./routes/searchRoutes.js");

const cors = require("cors");
const bodyParser = require("body-parser");
const categoriesRoutes = require("./routes/categories");
const authorsRoutes = require("./routes/authors");
const booksRoutes = require("./routes/books");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev")); // Log incoming requests
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

// Run server: npm run dev
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
