const express = require('express');
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config')
const { signupInputValidation, signinInputValidation, updateInputValidation } = require('../zodValidation/zod');
const { User, Account } = require('../database/db');
const authMiddleware = require('../middlewares/middlewares');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const parsedCredentials = signupInputValidation.safeParse({
        username, password, firstName, lastName
    })

    if(!parsedCredentials.success){
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }

    const userExist = await User.findOne({
        username: username
    })

    if(userExist){
        return res.status(411).json({
            message: "Email already taken"
        })
    }
 

    const newUser = await User.create({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    })


    const userId = newUser._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.floor(Math.random() * 10000)
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
    
})



router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const parsedCredentials = signinInputValidation.safeParse({
        username, password
    })

    if(!parsedCredentials.success){
        return res.status(401).json({
            message: "incorrect inputs"
        })
    }

    const validUser = await User.findOne({
        username: username
    })
    if(!validUser){
        return res.status(411).json({
            message: "you are not an existing user, please signup first"
        })
    }else{
        const userId = validUser._id;
        const token = jwt.sign({userId}, JWT_SECRET);
        return res.status(200).json({
            token: token
        })
    }
    
})


router.put('/', authMiddleware, async (req, res) => {
    const element = updateInputValidation.safeParse(req.body);
    const userId = req.userId;

    if(!element.success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }


    const updateUser = await User.updateMany(
        {_id : userId},
        {
            password: element.data.password,
            firstName: element.data.firstName,
            lastName: element.data.lastName
        }
    )

    res.json({
        message: "updated successfully"
    })
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({//or is used to search in firstname or lastname
        $or: [{
            firstName:{
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
