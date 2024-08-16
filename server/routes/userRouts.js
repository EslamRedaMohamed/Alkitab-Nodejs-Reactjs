const express = require('express');
const { createUser, verifyUser } = require('./../controllers/userController');
const authMiddleware = require('./../middlewares/authMiddleware');
const roleMiddleware = require('./../middlewares/roleMiddleware');
const multer = require('multer');
const { Console } = require('console');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/register',upload.single('image'),createUser);

router.post('/login',verifyUser);

// test authMiddleware
router.get('/books',authMiddleware, (req,res) =>{
    res.send("welcom to your books");
});

// test roleMiddleware
router.get('/admin',roleMiddleware, (req,res) => {
    res.send("welcom to admin side");
});

module.exports = router;