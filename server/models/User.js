const mongoose = require('mongoose');
var cryptoJs = require("crypto-js");
const { type } = require('os');


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
    },
    // adding favourite list for each user
    favourites: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            },
            status: {
                type: String,
                enum: ['Want to read', 'Reading', 'Read'],
                default: 'Want to read'
            },
            rate: {
                type: Number,
                default: 3
            }
        
        }
    ]
});

// ODM MiddelWares
schema.pre('save', function (next) {
    const currentUser = this;
    currentUser.password = cryptoJs.AES.encrypt(this.password, secretKey).toString();
    next();
});

schema.methods.addFavourite = function(bookId){
    let favouriteList=this.favourites
    let addedBefore=favouriteList.find((item)=> item.book.toString()=== bookId)
    if(!addedBefore){
        favouriteList.push({book:bookId})
        console.log(this);
        this.save();
        return this
    }else{
        return 'added before'
    }
}
schema.methods.deleteFavourite= function(bookId){
    this.favourites=this.favourites.filter((item)=>item.book.toString()!==bookId)
    this.save();
}
schema.methods.editStatus = function(bookId,newStatus){
    this.favourites=this.favourites.map((item)=>{
        if(item.book.toString()===bookId){
            console.log("found");
            
            item.status=newStatus
        }
        return item
    })
    this.save()
}

schema.methods.editRate = function(bookId,newRate){
    this.favourites=this.favourites.map((item)=>{
        if(item.book.toString()===bookId){
            console.log("found");
            
            item.rate=newRate
        }
        return item
    })
    this.save()
}

const User = mongoose.model('User', schema);
module.exports = User;