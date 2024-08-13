const mongoose = require('mongoose');
var cryptoJs = require("crypto-js");

const secretKey = 'g2KAymsdGCulp2nq0kSpEqO5yZb2dbktbGyjFc9AQSfviiO7if4FtQ+9ns3EsJtK';


const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, // You can store the URL or path to the image here
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // Default value for the 'role' field if not specified during document creation
    }
});

// ODM MiddelWares
schema.pre('save', function (next){
    const currentUser = this;
    currentUser.password = cryptoJs.AES.encrypt(this.password, secretKey).toString();
    next();
});

const User = mongoose.model('User', schema);
module.exports = User;