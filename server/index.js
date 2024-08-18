require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
require("./db.js");
const userRouters = require("./routes/userRouts.js");
const searchRoutes = require("./routes/searchRoutes.js"); // Add this line

// const cors = require('cors');
const bodyParser = require('body-parser');
const categoriesRoutes = require('./routes/categories');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');

const app = express();
const port = process.env.PORT || 3000;

//MiddleWares
app.use(express.json()); //  ==> parse any encoming request body to json
app.use(express.urlencoded()); //  ==> parse any encoming form body to json (front end)
app.use(morgan("dev")); // ==> Request logger

const cors = require("cors");

app.use(cors()); // Enable CORS for all routes

app.use("/users", userRouters);
// http://localhost:8080/users/search?searchTerm=Basmala
app.use("/api", searchRoutes); // Register the search route here

//run server: npm run dev
app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});
