const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/uploads", express.static("uploads"));

// Define Routes
app.use("/api/categories", require("./routes/category"));
app.use("/api/authors", require("./routes/author"));
app.use("/api/books", require("./routes/book"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));