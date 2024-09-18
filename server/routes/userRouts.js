const express = require('express');
const { createUser, verifyUser, addUserFavourite, getUserFavourite, deleteUserFavourite, updateFavouriteStatus, resetUserFavourite, updateFavouriteRate } = require('./../controllers/userController');
const authMiddleware = require('./../middlewares/authMiddleware');
const multer = require('multer');


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

// test add user favourite
router.post('/addtofavourite', authMiddleware, addUserFavourite)

// test get user favourite
router.get('/getuserfavourite/:userId', authMiddleware, getUserFavourite)

// test delete user favourite (PS:not implemented yet client-side)
router.delete('/userfavourite', authMiddleware, deleteUserFavourite)

// test update user favourite status
router.put('/userfavourite', authMiddleware, updateFavouriteStatus)

// test update user favourite rate
router.put('/userfavourite/updateRate', authMiddleware, updateFavouriteRate)

// test reset user favourite (PS:not implemented yet client-side)
router.put('/userfavouritereset', authMiddleware, resetUserFavourite)


module.exports = router;