const express = require("express");
const multer = require("multer");
const router = express.Router();
const authorController = require("../controllers/authorController");
const usersController = require("../controllers/usersController");
const roleMiddleware = require('./../middlewares/roleMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/authors/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), roleMiddleware, authorController.createAuthor);
router.get("/", authorController.getAuthors);
router.put("/:id", upload.single("photo"), roleMiddleware, authorController.updateAuthor);
router.delete("/:id", roleMiddleware, authorController.deleteAuthor);

// Get author by id
router.get("/:id", usersController.getAuthorById);

module.exports = router;
