const express = require('express');
const { Signup, Signin, Update } = require('../type');
const { User, Account } = require('../db/db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_Secret } = require('../config');
const authMiddleware = require('../middleware');
const { isValid } = require('zod');


// 1. Signup route
router.post("/signup",async(req,res)=>{

    const response = Signup.safeParse(req.body)

    if (!response.success){
        return res.status(403).json({
            "msg" : "Invalid inputs"
        })
    }

    const isExist = await User.findOne({
        username : req.body.username
    })

    if(isExist){
        return res.status(411).json({
            "msg" : "Email already taken"
        })
    }

    // const user = await User.create({
    //     username : req.body.username,
    //     password : req.body.password,
    //     firstName : req.body.firstName,
    //     lastName : req.body.lastName
    // })
    
    const user = new User({
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })

    let hashedPassword = await user.createHash(req.body.password);
    user.password = hashedPassword;

    await user.save();

    try{

        let userId = user._id;
        userId = userId.toString();

        const token = jwt.sign({
            userId
        }, JWT_Secret)

        await Account.create({
            userId,
            balance : 1 + Math.round(Math.random() * 1000,2)
        })

        res.status(200).json({
            "msg" : "User created successfully",
            "token" : token
        })
    }catch(err){

        await User.deleteOne({
            _id : user._id
        })
        res.status(411).json({
            "msg" : "Error while creating token"
        })
    }
})

// 2. Signin route
router.post('/signin', async(req,res)=>{

    const response = Signin.safeParse({
        username : req.body.username,
        password : req.body.password
    })

    if(!response.success){
        return res.status(403).json({
            "msg" : "Invalid inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username
    })

    if (!user){
        return res.status(404).json({
            "msg" : "User not registered"
        })
    }

    const isValidPassword = await user.validatePassword(req.body.password); 
    if (!isValidPassword){
        return res.status(400).json({
            "msg" : "Incorrect password"
        })
    }

    try{
        let userId = user._id
        userId = userId.toString();

        const token = jwt.sign({
            userId 
        }, JWT_Secret)

        return res.status(200).json({
            "msg" : "logged in successfully",
            "token" : token
        })
    }catch(err){
        return res.status(403).json({
            "msg" : "Error while logging in"
        })
    }
})

// 3. update route
router.put("/", authMiddleware, async(req,res)=>{
    const response = Update.safeParse(req.body);

    if(!response.success){
        return res.status(411).json({
            "msg" : "Inputs invalid"
        })
    }

    try {
        await User.updateOne({
           _id : req.userId
        },req.body)

        return res.status(200).json({
            "msg" : "Updated successfully"
        })
    }catch(err){
        return res.status(411).json({
            "msg" : "Something wrong while updating the details"
        })
    }
})

// 4. bulk route
router.get("/bulk",authMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";

    let allUser = []

    allUser = await User.find({
        $or : [
            {
                firstName : {
                "$regex" : filter,
                "$options" : 'i'
                }
            },
            {
                lastName : {
                    "$regex" : filter,
                    "$options" : 'i'
                }
            }
        ]
    })

    res.status(200).json({
        "users" : allUser.map((user)=>({
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })


})

module.exports = router;