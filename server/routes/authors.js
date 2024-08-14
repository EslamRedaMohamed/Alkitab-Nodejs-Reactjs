const express = require('express');
const multer = require('multer');
const router = express.Router();
const authorController = require('../controllers/authorController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/authors/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('photo'), authorController.createAuthor);
router.get('/', authorController.getAuthors);
router.put('/:id', upload.single('photo'), authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;