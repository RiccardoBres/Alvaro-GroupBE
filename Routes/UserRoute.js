const express = require('express');
const mongoose = require("mongoose");
const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const router = express.Router();


////// GET /////////
router.get('/user', async(req, res)=>{
    try {
        const user = await UserModel.find();
        res.status(200).send({
            statusCode : 200,
            message: "User found successfully",
            user: user,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error
        });
    }
})
///// POST /////////
router.post('/user/create', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const users = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            message: "User successfully register",
            user: users
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error
        });
    }
});


module.exports = router;