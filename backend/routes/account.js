const express = require('express');
const authMiddleware = require('../middlewares/middlewares');
const { Account } = require('../database/db');
const { string } = require('zod');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;

    const details = await Account.findOne({
        userId: userId
    })

    res.json({
        balance: details.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();//create a session

    session.startTransaction();//start the transaction

    const to = req.body.to;//userId of the reciever
    const amount = req.body.amount;//input is number

    const userId = req.userId;//userId of the sender, which i am getting from auth middleware

    const senderAccount = await Account.findOne({
        userId: userId
    }).session(session)

    if(senderAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const validReciever = await Account.findOne({
        userId: to
    }).session(session)

    if(!validReciever){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    //deducting amount from the sender
    await Account.updateOne({
        userId: userId
    },{
        $inc: {
            balance: -amount
        }
    }).session(session)

    //credit amount to the reciever

    await Account.updateOne({
        userId: to
    },{
        $inc: {
            balance: amount
        }
    }).session(session)

    //commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json({
        message: "Transfer successfully"
    })

})

module.exports = router;