const mongoose = require('mongoose');
const { number } = require('zod');
require('dotenv').config();
const bcrypt = require('bcrypt');

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

// Method to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPassword) {

    // Hashing user's salt and password with 10 iterations,
    const saltRounds = 10;
  
    // First method to generate a salt and then create hash
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  
    // Second mehtod - Or we can create salt and hash in a single method also
    // return await bcrypt.hash(plainTextPassword, saltRounds);
  };
  
  // Validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        required : true
    },

    balance : {
        type : Number,
        required : true
    }
    
   
})

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
}