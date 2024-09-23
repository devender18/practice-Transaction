const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl);

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