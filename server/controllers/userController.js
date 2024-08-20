const User = require('./../models/User');
const cryptoJs = require("crypto-js");
const jwt = require('jsonwebtoken');

const secretKey = 'g2KAymsdGCulp2nq0kSpEqO5yZb2dbktbGyjFc9AQSfviiO7if4FtQ+9ns3EsJtK';


const createUser = async (req, res) => {
    const { firstName, lastName, email, username, password, role } = req.body;
    const image = req.file ? req.file.path : req.body.image;
    const user = new User({ firstName, lastName, email, image, username, password, role });

    try {
        const createUser = await user.save();
        res.send(createUser);
    } catch {
        res.status(400).send('Error creating user');
    }
};




const verifyUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).send('user name not found');

        const decryptedPass = cryptoJs.AES.decrypt(user.password, secretKey);
        if (password === decryptedPass.toString(cryptoJs.enc.Utf8)) {
            return res.send({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image,
                username: user.username,
                role: user.role,
                token: jwt.sign({ _id: user._id, role: user.role }, 'key')
            });
        }

        res.status(401).send('Un Authenticated');
    } catch (err) {
        console.log(err);
        res.status(400).send('Error verifying user');
    }
};

//user books favourite 

//add book to fav list ... body{userId , bookId}

const addUserFavourite = async (req, res) => {
    const { userId, bookId} = req.body;
    const user= await User.findById(userId)
    if(!user){
        res.status(404).send('user not found')

    }
    res.send(user.addFavourite(bookId))
}
//retrieve fav list for user ... body{userId}
const getUserFavourite = async(req,res)=>{
    const {userId}=req.body;
    // const user= await User.findById(userId)
    const user = await User.findById(userId).populate('favourites.book')
    if(!user){
        res.status(404).send("User Not Found")
    }else{
        if(!user.favourites){
            res.send('this user favourite list is empty')
        }
        
        res.send(user.favourites)
    }
}
//edit status of shelve... body{userId , bookId , status}
const updateFavouriteStatus = async(req,res)=>{
    const {userId,bookId,newStatus} = req.body
    const user= await User.findById(userId)
    user.editStatus(bookId,newStatus)
    res.send(user)
}
//edit rate
const updateFavouriteRate = async(req,res)=>{
    const {userId,bookId,newRate} = req.body
    const user= await User.findById(userId)
    user.editRate(bookId,newRate)
    res.send(user)
}

//delete book from favlist ... body{userId , bookId}
const deleteUserFavourite = async(req,res)=>{
    const {userId,bookId} = req.body;
    const user = await User.findById(userId)
    user.deleteFavourite(bookId)
    res.send(user)
}

//reset user favourites
const resetUserFavourite = async(req,res)=>{
    const {userId} = req.body;
    const user = await User.findById(userId)
    user.favourites=[]
    user.save()
    res.send(user)
}


module.exports = { createUser, verifyUser, addUserFavourite , getUserFavourite ,deleteUserFavourite,updateFavouriteStatus,resetUserFavourite,updateFavouriteRate};

