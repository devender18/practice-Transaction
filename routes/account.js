const express = require('express');
const authMiddleware = require('../middleware');
const { User, Account } = require('../db/db');
const router = express.Router();
const mongoose = require('mongoose');

// route to get balance
router.get('/balance', authMiddleware,async (req,res)=>{

    const account = await Account.findOne({
        userId : req.userId
    })

    return res.status(200).json({
        "balance" : account.balance
    })
})

// 2. transfer money route
router.post("/transfer", authMiddleware, async(req,res)=>{

    const session = await mongoose.startSession(); //start session
    session.startTransaction(); //start transaction

    const {to, amount} = req.body;

    const toAccount = await Account.findOne({
        userId : to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(403).json({
            "msg" : "Invalid account"
        })

        
    }

    const fromAccount = await Account.findOne({
        userId : req.userId
    }).session(session);

    if(fromAccount.balance < amount){
        await session.abortTransaction();
        return res.status(403).json({
            "msg" : "Insufficient balance"
        })
    }

    // perform transfer
    await Account.updateOne({
        userId : req.userId
    },{
        "$inc" : {
            balance : -amount
        }
    }).session(session);

    await Account.updateOne({
        userId : to
    },{
        "$inc" : {
            balance : amount
        }
    }).session(session);


    // commit transaction
    await session.commitTransaction();
    res.json({
        "msg" : "Transfer successfull"
    })


    
})


module.exports = router;