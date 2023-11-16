const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

router.post('/login', async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send({
            statusCode: 404,
            message: "User not found"
        })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({
            statusCode: 400,
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        name: user.name,
        surname: user.surname,
        email: user.email,
    },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.header('Authorization', token).status(200).send({
        statusCode: 200,
        token
    })
})

module.exports = router