const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const secretKey = process.env.SECRETKEY;

const authMiddleware = async (req, res, next) => {
    try{
        console.log(secretKey);
        const { _id } = jwt.verify(req.headers['authorization'], secretKey);
        console.log(_id);
        const user = await User.findOne({ _id });
        if (user) {
            console.log('auth middleware', user);
            req.user = user;
            next();
        } else{
            res.status(401).send('Not authorized');
        }
    }catch(err){
        res.status(401).send('Access denied');
    }
};

module.exports = authMiddleware;