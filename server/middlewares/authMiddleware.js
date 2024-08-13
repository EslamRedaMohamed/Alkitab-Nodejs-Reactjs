const jwt = require('jsonwebtoken');
const User = require('./../models/User');

const authMiddleware = async (req, res, next) => {
    try{
        const { _id } = jwt.verify(req.headers['authorization'], 'key');
        const user = await User.findOne({ _id });
        if (user) {
            console.log('auth middleware', user);
            req.user = user;
            next();
        } else{
            res.status(401).send('Not authorized');
        }
    }catch(err){
        res.status(401).send('Invalid token auth');
    }
};

module.exports = authMiddleware;