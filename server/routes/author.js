const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor,
} = require("../controllers/authorController");

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

router.post("/", upload.single("photo"), createAuthor);
router.get("/", getAuthors);
router.put("/:id", upload.single("photo"), updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;