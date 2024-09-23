const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://devendersingh2k:aEHk3Ju4lr3K7J3j@cluster0.9gy2k2z.mongodb.net/Jodhpur-23Sept');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },

    password: {
        type : String,
        required : true
    },

    firstName: {
        type : String,
        required : true
    },

    lastName: {
        type : String,
        required : true
    }

})

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}