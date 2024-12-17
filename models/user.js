const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true,
    },
    avatar : {
        type: String,
        default: "https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg",
    },
    role: {
        type:String,
        default: "user",
        enum: ["user","admin"],
    },
    email: { 
        type: String, 
        required: true 
    },
    favourites: [
        {
            type:mongoose.Types.ObjectId,
            ref: "books",
        }
    ],
    cart: [
        {
            type:mongoose.Types.ObjectId,
            ref: "books",
        }
    ],
    orders: [
        {
            type:mongoose.Types.ObjectId,
            ref: "order",
        }
    ],
},
{
    timestamps:true
}
);

module.exports = mongoose.model("user",user);