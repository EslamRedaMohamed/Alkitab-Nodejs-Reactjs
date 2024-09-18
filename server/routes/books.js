const express = require("express");
const multer = require("multer");
const router = express.Router();
const bookController = require("../controllers/bookController");
const roleMiddleware = require('./../middlewares/roleMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/books/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), roleMiddleware, bookController.createBook);
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBooksById);
router.put("/:id", upload.single("photo"), roleMiddleware, bookController.updateBook);
router.delete("/:id", roleMiddleware, bookController.deleteBook);
router.get("/:id/average-rating", bookController.bookAvgRate);

module.exports = router;
