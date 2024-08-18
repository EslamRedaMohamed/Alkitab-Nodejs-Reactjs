const express = require('express');
const { createUser, verifyUser, addUserFavourite, getUserFavourite, deleteUserFavourite, updateFavouriteStatus, resetUserFavourite } = require('./../controllers/userController');
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

// test add user favourite
router.post('/addtofavourite',addUserFavourite)

// test get user favourite
router.get('/userfavourite',getUserFavourite)

// test delete user favourite
router.delete('/userfavourite',deleteUserFavourite)

// test update user favourite status
router.put('/userfavourite',updateFavouriteStatus)

// test reset user favourites
router.put('/userfavouritereset',resetUserFavourite)


module.exports = router;