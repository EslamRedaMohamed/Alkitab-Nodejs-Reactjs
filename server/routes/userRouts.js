const express = require('express');
const { createUser, verifyUser } = require('./../controllers/userController');
const authMiddleware = require('./../middlewares/authMiddleware');
const roleMiddleware = require('./../middlewares/roleMiddleware');
const { Console } = require('console');

const router = express.Router();

router.post('/register', createUser);
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