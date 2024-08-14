const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post("/", upload.single("photo"), createBook);
router.get("/", getBooks);
router.put("/:id", upload.single("photo"), updateBook);
router.delete("/:id", deleteBook);

module.exports = router;