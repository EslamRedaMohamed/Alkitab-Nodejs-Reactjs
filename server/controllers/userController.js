const User = require('./../models/User');
const cryptoJs = require("crypto-js");
const jwt = require('jsonwebtoken');

const secretKey = 'g2KAymsdGCulp2nq0kSpEqO5yZb2dbktbGyjFc9AQSfviiO7if4FtQ+9ns3EsJtK';


const createUser = async (req, res) => {
    const { firstName, lastName, email, image, username, password, role } = req.body;
    const user = new User({ firstName, lastName, email, image, username, password, role });

    try{
        const createUser = await user.save();
        res.send(createUser);
    } catch{
        res.status(400).send('Error creating user');
    }
};




const verifyUser = async (req, res) => {
    const { username, password} = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).send('user name not found');

        const decryptedPass = cryptoJs.AES.decrypt(user.password, secretKey);
        if (password === decryptedPass.toString(cryptoJs.enc.Utf8)) {
            return res.send({
                success: true,
                message: '',
                token: jwt.sign({ _id: user._id,role: user.role }, 'key')
            });
        }

        res.send('Un Authenticated');
    } catch (err) {
        console.log(err);
        res.status(400).send('Error verifying user');
    }
};

//user books favourite 

const addUserFavourite = async (req,res)=>{
    try{
        const {userId,bookId,status}=req.body;
    const user=await User.findById({ _id:userId});
    user.favourites.findOneAndUpdate({book:bookId},{$set:{status}})
    res.send(user)
    }catch(err){
        throw new Error(err);
    }
    
}


module.exports = { createUser, verifyUser,addUserFavourite };

